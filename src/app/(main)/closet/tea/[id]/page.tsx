"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TeaDetailCard from "@/components/tea/tea-detail-card";
import TeaDetailLoading from "@/components/tea/tea-detail-loading";
import TeaNotFound from "@/components/tea/tea-not-found";
import { DeleteConfirmationModal } from "@/components/tea/delete-confirmation-modal";
import { useTeaStore } from "@/store/tea-store";

export default function TeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { teas, toggleFavorite, deleteTea } = useTeaStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teas.find((t) => t.id === teaId);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleFavoriteToggle = () => {
    if (tea) {
      toggleFavorite(tea.id);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tea) return;

    setIsDeleting(true);
    try {
      deleteTea(tea.id);
      setShowDeleteModal(false);
      setIsDeleted(true);

      setTimeout(() => {
        router.push("/closet");
      }, 1500);
    } catch (error) {
      console.error("Error deleting tea:", error);
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <TeaDetailLoading />;
  }

  if (isDeleted) {
    return (
      <div className="min-h-screen bg-(--primary-cream) flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-title font-semibold text-(--primary-brown)">
            Tea Deleted Successfully
          </h2>
          <p className="text-(--primary-brown)/70 font-body">
            Returning to your collection...
          </p>
        </div>
      </div>
    );
  }

  if (!tea) {
    return <TeaNotFound />;
  }

  return (
    <>
      <TeaDetailCard
        tea={tea}
        onFavoriteToggle={handleFavoriteToggle}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal
        tea={tea}
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
