"use client";

import React, { useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageContainer } from "@/components/ui/container";
import { useTeaStore } from "@/store/tea-store";
import TeaNotFound from "@/components/tea/tea-not-found";
import { Button } from "@/components/ui/button";

export default function DeleteTeaPage() {
  const params = useParams();
  const router = useRouter();
  const { getTea, deleteTea: deleteTeaFromStore } = useTeaStore();
  const [isPending, startTransition] = useTransition();

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teaId ? getTea(teaId) : undefined;

  if (!tea) {
    return <TeaNotFound />;
  }

  const handleDelete = () => {
    startTransition(() => {
      try {
        deleteTeaFromStore(tea.id);
        router.push("/closet");
      } catch (error) {
        console.error("Error deleting tea:", error);
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <PageContainer className="bg-gradient-closet py-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-title font-semibold text-primary-brown mb-2">
                Delete Tea
              </h1>
              <p className="text-primary-brown/70 font-body">
                Are you sure you want to delete <strong>{tea.name}</strong>?
              </p>
              <p className="text-sm text-primary-brown/50 font-body mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? "Deleting..." : "Delete Tea"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
