"use client";

import React, { useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { DeleteConfirmationModal } from "@/components/tea/delete-confirmation-modal";
import { useTeaStore } from "@/store/tea-store";

export default function InterceptedDeleteTeaModal() {
  const router = useRouter();
  const params = useParams();
  const { getTea, deleteTea: deleteTeaFromStore } = useTeaStore();
  const [isPending, startTransition] = useTransition();

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teaId ? getTea(teaId) : undefined;

  const handleClose = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!tea) return;

    startTransition(() => {
      try {
        deleteTeaFromStore(tea.id);
        router.push("/closet");
      } catch (error) {
        console.error("Error deleting tea:", error);
      }
    });
  };

  if (!tea) {
    return null;
  }

  return (
    <DeleteConfirmationModal
      tea={tea}
      isOpen={true}
      onClose={handleClose}
      onConfirm={handleConfirm}
      isDeleting={isPending}
    />
  );
}
