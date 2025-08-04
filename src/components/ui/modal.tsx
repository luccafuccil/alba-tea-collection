"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ModalVariant } from "@/lib/types";
import { ANIMATIONS } from "@/lib/constants/ui";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: ModalVariant;
  title?: string;
  className?: string;
  closeOnBackdrop?: boolean;
  closeButtonVisible?: boolean;
}

const modalVariants = {
  default: "max-w-md",
  form: "max-w-2xl max-h-[90vh] overflow-y-auto",
  confirm: "max-w-sm",
  fullscreen: "max-w-full max-h-full m-0 rounded-none",
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  title,
  className,
  closeOnBackdrop = true,
  closeButtonVisible = true,
}: ModalProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            {...ANIMATIONS.fadeIn}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              {...ANIMATIONS.modal}
              className={cn(
                "relative w-full bg-white rounded-3xl shadow-2xl pointer-events-auto",
                "border border-gray-100",
                modalVariants[variant],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || closeButtonVisible) && (
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  {title && (
                    <h2 className="text-xl font-title text-text-color font-medium">
                      {title}
                    </h2>
                  )}
                  <div className="flex-1" />
                  {closeButtonVisible && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors -mr-2"
                      aria-label="Close modal"
                    >
                      X
                    </button>
                  )}
                </div>
              )}

              <div className={cn("p-6", title && "pt-4")}>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const FormModal = (props: Omit<ModalProps, "variant">) => {
  return <Modal {...props} variant="form" />;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="confirm" title={title}>
      <div className="space-y-4">
        <p className="text-text-color font-body">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-color bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-body"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              "px-4 py-2 text-white rounded-full transition-colors font-body",
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-primary-green hover:bg-darker-green text-text-color"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const MobileModal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...ANIMATIONS.slideInRight}
          className={cn(
            "fixed inset-0 z-50 bg-background-color",
            "flex flex-col overflow-hidden",
            className
          )}
        >
          <div className="flex items-center p-4 border-b border-gray-100 bg-white">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              X
            </button>
            {title && (
              <h1 className="ml-4 text-lg font-title text-text-color font-medium">
                {title}
              </h1>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
