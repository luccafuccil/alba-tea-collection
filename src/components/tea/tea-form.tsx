"use client";

import React from "react";
import { useForm } from "@/hooks/use-form";
import { useTeaStore } from "@/store/tea-store";
import { Tea } from "@/lib/types";
import { TEA_FORM_FIELDS } from "@/lib/constants";
import { Input, Textarea, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface TeaFormProps {
  initialData?: Partial<Tea>;
  onCancel?: () => void;
}

export const TeaForm: React.FC<TeaFormProps> = ({ initialData, onCancel }) => {
  const { addTea, updateTea } = useTeaStore();

  const isEditing = !!initialData?.id;

  const form = useForm(
    isEditing ? initialData : { type: "black" },
    TEA_FORM_FIELDS
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await form.submit(async (data: Partial<Tea>) => {
      if (isEditing && initialData?.id) {
        updateTea(initialData.id, data);
      } else {
        addTea(data as Omit<Tea, "id" | "createdAt" | "updatedAt">);
      }
    });

    if (success && onCancel) {
      onCancel();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  <div key={field.name} className="lg:col-span-2">
                    <Textarea
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                      {...fieldProps}
                    />
                  </div>
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
        </div>

        {form.errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-body">
              {form.errors.submit}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-100">
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
            disabled={form.isSubmitting}
            className="flex-1"
          >
            {form.isSubmitting
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Add Tea"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TeaForm;
