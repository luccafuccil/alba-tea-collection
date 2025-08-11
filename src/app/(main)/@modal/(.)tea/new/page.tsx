"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { ServerTeaForm } from "@/components/tea/server-tea-form";

export default function InterceptedNewTeaModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      variant="form"
      title="Add New Tea"
      animationClass="animate-slideUpModalDramatic"
    >
      <ServerTeaForm mode="create" />
    </Modal>
  );
}
