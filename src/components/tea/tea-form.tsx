"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormSubmit } from "@/hooks/use-form";
import { useTeaStore } from "@/store/tea-store";
import { Tea } from "@/lib/types";
import { TEA_FORM_FIELDS } from "@/lib/constants";
import { Input, Textarea, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TeaFormProps {
  initialData?: Partial<Tea>;
  onCancel?: () => void;
}

export const TeaForm: React.FC<TeaFormProps> = ({ initialData, onCancel }) => {
  const router = useRouter();
  const { addTea, updateTea } = useTeaStore();

  const isEditing = !!initialData?.id;

  const form = useFormState(
    isEditing ? initialData : { type: "black" },
    TEA_FORM_FIELDS
  );

  const { submit, isSubmitting, submitError } = useFormSubmit(
    async (data: Partial<Tea>) => {
      if (isEditing && initialData?.id) {
        updateTea(initialData.id, data);
      } else {
        addTea(data as Omit<Tea, "id" | "createdAt" | "updatedAt">);
      }
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateForm()) {
      submit(form.formData, form.reset);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="relative text-center space-y-2">
          <button
            type="button"
            onClick={handleCancel}
            className="absolute left-0 top-0 text-sm text-(--primary-brown) font-body hover:underline transition-all duration-200"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-title font-semibold text-(--primary-brown)">
            {isEditing ? "Edit Tea" : "Add New Tea"}
          </h2>
          <p className="text-(--primary-brown)/60 font-body">
            {isEditing
              ? "Update your tea details"
              : "Add a new tea to your collection"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {TEA_FORM_FIELDS.map((field) => {
            if (field.conditional) {
              const conditionValue = form.formData[field.conditional.field];
              if (conditionValue !== field.conditional.value) {
                return null;
              }
            }

            const fieldProps = form.getFieldProps(field.name);

            switch (field.type) {
              case "textarea":
                return (
                  <Textarea
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    {...fieldProps}
                  />
                );

              case "select":
                return (
                  <Select
                    key={field.name}
                    label={field.label}
                    required={field.required}
                    options={field.options || []}
                    {...fieldProps}
                  />
                );

              case "number":
                return (
                  <Input
                    key={field.name}
                    type="number"
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    min={0}
                    max={30}
                    {...fieldProps}
                  />
                );

              default:
                return (
                  <Input
                    key={field.name}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    {...fieldProps}
                  />
                );
            }
          })}

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-body">{submitError}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Add Tea"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default TeaForm;
