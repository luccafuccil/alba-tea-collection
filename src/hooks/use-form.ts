"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { FormField } from "@/lib/types";

export const useFormState = <T extends Record<string, any>>(
  initialData: Partial<T> = {},
  fields: FormField[]
) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const setError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const setTouched = useCallback((name: string, isTouched = true) => {
    setTouchedState((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  const reset = useCallback((newData: Partial<T> = {}) => {
    setFormData(newData);
    setErrors({});
    setTouchedState({});
    setIsSubmitting(false);
  }, []);

  const validateField = useCallback(
    (name: string, value: any) => {
      const field = fields.find((f) => f.name === name);
      if (!field) return undefined;

      if (
        field.required &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        return `${field.label} is required`;
      }

      if (field.validate) {
        return field.validate(value);
      }

      return undefined;
    },
    [fields]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field.name, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData, validateField]);

  const getFieldProps = useCallback(
    (name: string) => ({
      value: formData[name] || "",
      error: touched[name] ? errors[name] : undefined,
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const value = e.target.value;
        setValue(name, value);
      },
      onBlur: () => {
        setTouched(name, true);
        const error = validateField(name, formData[name]);
        if (error) {
          setError(name, error);
        }
      },
    }),
    [formData, errors, touched, setValue, setTouched, validateField, setError]
  );

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError,
    clearError,
    setTouched,
    setIsSubmitting,
    reset,
    validateField,
    validateForm,
    getFieldProps,
  };
};

export const useFormSubmit = <T extends Record<string, any>>(
  onSubmit: (data: T) => Promise<void> | void,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    resetOnSuccess?: boolean;
  } = {}
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: T, resetForm?: () => void) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await onSubmit(data);
        options.onSuccess?.(data);

        if (options.resetOnSuccess && resetForm) {
          resetForm();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setSubmitError(errorMessage);
        options.onError?.(
          error instanceof Error ? error : new Error(errorMessage)
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, options]
  );

  return {
    submit,
    isSubmitting,
    submitError,
    clearSubmitError: () => setSubmitError(null),
  };
};

export const useModalForm = <T extends Record<string, any>>(
  fields: FormField[],
  onSubmit: (data: T) => Promise<void> | void,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    resetOnSuccess?: boolean;
    closeOnSuccess?: boolean;
  } = {}
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<T>>({});

  const formState = useFormState<T>(initialData, fields);
  const submission = useFormSubmit(onSubmit, {
    ...options,
    onSuccess: (data) => {
      options.onSuccess?.(data);
      if (options.closeOnSuccess !== false) {
        close();
      }
    },
  });

  const open = useCallback(
    (data: Partial<T> = {}) => {
      setInitialData(data);
      formState.reset(data);
      setIsOpen(true);
    },
    [formState]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    formState.reset();
    submission.clearSubmitError();
  }, [formState, submission]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formState.validateForm()) {
        fields.forEach((field) => {
          formState.setTouched(field.name, true);
        });
        return;
      }

      await submission.submit(formState.formData as T, () => formState.reset());
    },
    [formState, submission, fields]
  );

  return {
    isOpen,
    open,
    close,
    handleSubmit,
    formState,
    isSubmitting: submission.isSubmitting,
    submitError: submission.submitError,
  };
};

export const useAutoSave = <T extends Record<string, any>>(
  data: T,
  onSave: (data: T) => Promise<void> | void,
  delay = 2000
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(data);
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      save();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, save]);

  return {
    isSaving,
    lastSaved,
    forceSave: save,
  };
};
