"use client";

import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { Tea } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface DeleteConfirmationModalProps {
  tea: Tea;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ tea, isOpen, onClose, onConfirm, isDeleting = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="confirm"
      title="Delete Tea"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 bg-red-50 rounded-full flex items-center justify-center ring-4 ring-red-100">
          <IconTrash size={24} className="text-red-500" />
        </div>

        <div className="space-y-2">
          <p className="text-(--primary-brown)/70 font-body text-sm leading-relaxed">
            Are you sure you want to delete <br />
            <span className="font-medium text-(--primary-brown)">
              &quot;{tea.name}&quot;
            </span>
            ?
            <br />
            <span className="text-xs text-(--primary-brown)/60">
              This action cannot be undone.
            </span>
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
