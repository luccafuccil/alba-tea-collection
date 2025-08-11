"use client";

import React, { useState } from "react";
import { Tea, TeaType } from "@/lib/types";
import { TEA_FORM_FIELDS } from "@/lib/constants";
import { Input, Textarea, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTeaStore } from "@/store/tea-store";
import { useRouter } from "next/navigation";

interface TeaFormProps {
  initialData?: Partial<Tea>;
  mode?: "create" | "edit";
}

export const ServerTeaForm: React.FC<TeaFormProps> = ({
  initialData,
  mode = "create",
}) => {
  const { addTea, updateTea } = useTeaStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    if (mode === "create") {
      const teaData = {
        name: formData.get("name") as string,
        type: formData.get("type") as TeaType,
        description: (formData.get("description") as string) || undefined,
        tastingNotes: (formData.get("tastingNotes") as string) || undefined,
        brewTime: formData.get("brewTime")
          ? Number(formData.get("brewTime"))
          : undefined,
        infusionIngredients:
          (formData.get("infusionIngredients") as string) || undefined,
        favorite: formData.get("favorite") === "on",
      };

      if (!teaData.name || !teaData.type) {
        setErrors({
          name: !teaData.name ? ["Name is required"] : [],
          type: !teaData.type ? ["Type is required"] : [],
        });
        setIsSubmitting(false);
        return;
      }

      addTea(teaData);
      router.back();
    } else if (mode === "edit" && initialData?.id) {
      const teaData = {
        name: formData.get("name") as string,
        type: formData.get("type") as TeaType,
        description: (formData.get("description") as string) || undefined,
        tastingNotes: (formData.get("tastingNotes") as string) || undefined,
        brewTime: formData.get("brewTime")
          ? Number(formData.get("brewTime"))
          : undefined,
        infusionIngredients:
          (formData.get("infusionIngredients") as string) || undefined,
        favorite: formData.get("favorite") === "on",
      };

      if (!teaData.name || !teaData.type) {
        setErrors({
          name: !teaData.name ? ["Name is required"] : [],
          type: !teaData.type ? ["Type is required"] : [],
        });
        setIsSubmitting(false);
        return;
      }

      updateTea(initialData.id, teaData);
      router.back();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TEA_FORM_FIELDS.map((field) => {
            const fieldValue = initialData?.[field.name as keyof Tea] || "";
            const error = errors[field.name as keyof typeof errors];

            switch (field.type) {
              case "textarea":
                return (
                  <div key={field.name} className="lg:col-span-2">
                    <Textarea
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      defaultValue={fieldValue as string}
                      aria-describedby={
                        error ? `${field.name}-error` : undefined
                      }
                    />
                    {error && (
                      <div id={`${field.name}-error`} className="mt-1">
                        {error.map((err: string) => (
                          <p key={err} className="text-sm text-red-600">
                            {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );

              case "select":
                return (
                  <div key={field.name}>
                    <Select
                      name={field.name}
                      label={field.label}
                      required={field.required}
                      options={field.options || []}
                      defaultValue={fieldValue as string}
                      aria-describedby={
                        error ? `${field.name}-error` : undefined
                      }
                    />
                    {error && (
                      <div id={`${field.name}-error`} className="mt-1">
                        {error.map((err: string) => (
                          <p key={err} className="text-sm text-red-600">
                            {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );

              case "number":
                return (
                  <div key={field.name}>
                    <Input
                      type="number"
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      min={0}
                      max={field.name === "servings" ? 30 : undefined}
                      defaultValue={fieldValue as string}
                      aria-describedby={
                        error ? `${field.name}-error` : undefined
                      }
                    />
                    {error && (
                      <div id={`${field.name}-error`} className="mt-1">
                        {error.map((err: string) => (
                          <p key={err} className="text-sm text-red-600">
                            {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );

              case "checkbox":
                return (
                  <div key={field.name} className="lg:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={field.name}
                        defaultChecked={fieldValue as boolean}
                        className="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {field.label}
                      </span>
                    </label>
                    {error && (
                      <div id={`${field.name}-error`} className="mt-1">
                        {error.map((err: string) => (
                          <p key={err} className="text-sm text-red-600">
                            {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );

              default:
                return (
                  <div key={field.name}>
                    <Input
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      defaultValue={fieldValue as string}
                      aria-describedby={
                        error ? `${field.name}-error` : undefined
                      }
                    />
                    {error && (
                      <div id={`${field.name}-error`} className="mt-1">
                        {error.map((err: string) => (
                          <p key={err} className="text-sm text-red-600">
                            {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
            }
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
              ? "Save Changes"
              : "Add Tea"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServerTeaForm;
