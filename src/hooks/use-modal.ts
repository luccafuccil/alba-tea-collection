"use client";

import { useState, useCallback } from "react";

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

export function useModalManager() {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  }, []);

  const isModalOpen = useCallback(
    (id: string) => {
      return Boolean(modals[id]);
    },
    [modals]
  );

  const closeAllModals = useCallback(() => {
    setModals({});
  }, []);

  return {
    modals,
    openModal,
    closeModal,
    isModalOpen,
    closeAllModals,
  };
}
