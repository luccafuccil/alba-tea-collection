"use client";

import React, { useState } from "react";
import { FormField } from "@/lib/types";

export const useForm = <T extends Record<string, unknown>>(
  initialData: Partial<T> = {},
  fields: FormField[]
) => {
  const [formData, setFormData] =
    useState<Record<string, unknown>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name: string, value: unknown) => {
    const field = fields.find((f) => f.name === name);
    if (!field) return;

    if (
      field.required &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return `${field.label} is required`;
    }

    if (field.validate) {
      return field.validate(value);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (onSubmit: (data: T) => Promise<void> | void) => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      await onSubmit(formData as T);
      return true;
    } catch (error) {
      console.error("Form submission failed:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = (newData: Partial<T> = {}) => {
    setFormData(newData);
    setErrors({});
    setIsSubmitting(false);
  };

  const getFieldProps = (name: string) => ({
    value: (formData[name] as string) || "",
    error: errors[name],
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setValue(name, e.target.value);
    },
    onBlur: () => {
      const error = validateField(name, formData[name]);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
  });

  return {
    formData,
    errors,
    isSubmitting,
    setValue,
    validateForm,
    submit,
    reset,
    getFieldProps,
  };
};
