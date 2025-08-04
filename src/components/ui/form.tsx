import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { FormField } from "@/lib/types";
import { Button } from "./button";
import { generateShortId } from "@/lib/id-generator";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error,
  label,
  required,
  className,
  id,
  ...props
}) => {
  const inputId = id || generateShortId("input");

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm text-(--primary-brown) font-body"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 rounded-xl border transition-all duration-200",
          "font-body text-(--primary-brown) placeholder:text-(--primary-brown)/50",
          "focus:outline-none focus:ring-2 focus:ring-(--primary-green) focus:border-transparent",
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-200 bg-white hover:border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600 font-body">{error}</p>}
    </div>
  );
};

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  error,
  label,
  required,
  className,
  id,
  ...props
}) => {
  const textareaId = id || generateShortId("textarea");

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm text-(--primary-brown) font-body"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-3 rounded-xl border transition-all duration-200",
          "font-body text-(--primary-brown) placeholder:text-(--primary-brown)/50",
          "focus:outline-none focus:ring-2 focus:ring-(--primary-green) focus:border-transparent",
          "resize-none min-h-[120px]",
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-200 bg-white hover:border-gray-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600 font-body">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  error,
  label,
  required,
  options,
  className,
  id,
  ...props
}) => {
  const selectId = id || generateShortId("select");

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm text-(--primary-brown) font-body"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full px-4 py-3 rounded-xl border transition-all duration-200",
          "font-body text-(--primary-brown) bg-white",
          "focus:outline-none focus:ring-2 focus:ring-(--primary-green) focus:border-transparent",
          "appearance-none cursor-pointer",
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-200 hover:border-gray-300",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 font-body">{error}</p>}
    </div>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const checkboxId = id || generateShortId("checkbox");

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <input
          id={checkboxId}
          type="checkbox"
          className={cn(
            "w-5 h-5 rounded border-2 border-gray-300",
            "text-(--primary-green) focus:ring-(--primary-green) focus:ring-2",
            "transition-colors duration-200",
            className
          )}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm text-(--primary-brown) font-body cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-sm text-red-600 font-body">{error}</p>}
    </div>
  );
};

interface FormProps<T extends Record<string, any>> {
  fields: FormField[];
  onSubmit: (data: T) => void;
  onCancel?: () => void;
  initialData?: Partial<T>;
  title?: string;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  className?: string;
}

export const Form = <T extends Record<string, any>>({
  fields,
  onSubmit,
  onCancel,
  initialData = {},
  title,
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
  className,
}: FormProps<T>) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      const field = fields.find((f) => f.name === name);
      if (field?.validate) {
        const error = field.validate(formData[name]);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      }
    },
    [fields, formData]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (
        field.required &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.validate && value) {
        const error = field.validate(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    return newErrors;
  }, [fields, formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors = validateForm();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTouched(
          fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {})
        );
        return;
      }

      onSubmit(formData as T);
    },
    [formData, validateForm, onSubmit, fields]
  );

  const renderField = useCallback(
    (field: FormField) => {
      if (field.conditional) {
        const conditionValue = formData[field.conditional.field];
        if (conditionValue !== field.conditional.value) {
          return null;
        }
      }

      const commonProps = {
        id: field.name,
        name: field.name,
        label: field.label,
        required: field.required,
        error: touched[field.name] ? errors[field.name] : undefined,
        onBlur: () => handleBlur(field.name),
      };

      switch (field.type) {
        case "text":
        case "number":
          return (
            <Input
              key={field.name}
              {...commonProps}
              type={field.type}
              value={formData[field.name] || ""}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          );

        case "textarea":
          return (
            <Textarea
              key={field.name}
              {...commonProps}
              value={formData[field.name] || ""}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          );

        case "select":
          return (
            <Select
              key={field.name}
              {...commonProps}
              options={field.options || []}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          );

        case "checkbox":
          return (
            <Checkbox
              key={field.name}
              {...commonProps}
              checked={formData[field.name] || false}
              onChange={(e) => handleChange(field.name, e.target.checked)}
            />
          );

        case "checkbox-group":
          return (
            <div key={field.name} className="space-y-3">
              <label className="block text-sm text-(--primary-brown) font-body">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {field.options?.map((option) => (
                  <Checkbox
                    key={`${field.name}-${option.value}`}
                    id={`${field.name}-${option.value}`}
                    label={option.label}
                    checked={(formData[field.name] || []).includes(
                      option.value
                    )}
                    onChange={(e) => {
                      const currentValues = formData[field.name] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(
                            (v: string) => v !== option.value
                          );
                      handleChange(field.name, newValues);
                    }}
                  />
                ))}
              </div>
              {touched[field.name] && errors[field.name] && (
                <p className="text-sm text-red-600 font-body">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );

        default:
          return null;
      }
    },
    [formData, errors, touched, handleChange, handleBlur]
  );

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-title text-(--primary-brown)">
            {title}
          </h2>
        </div>
      )}

      <div className="space-y-6">{fields.map(renderField)}</div>

      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-6 border-t border-gray-100">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="sm:order-1"
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="sm:order-2"
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};
