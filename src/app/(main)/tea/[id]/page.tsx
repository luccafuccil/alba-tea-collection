"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTeaStore } from "@/store/tea-store";
import TeaDetailCard from "@/components/tea/tea-detail-card";
import TeaNotFound from "@/components/tea/tea-not-found";

export default function TeaDetailPage() {
  const params = useParams();
  const { getTea, toggleFavorite } = useTeaStore();

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teaId ? getTea(teaId) : undefined;

  if (!tea) {
    return <TeaNotFound />;
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(tea.id);
  };

  const handleEdit = () => {
    window.location.href = `/tea/${tea.id}/edit`;
  };

  const handleDelete = () => {
    console.log("Delete tea:", tea.id);
  };

  return (
    <TeaDetailCard
      tea={tea}
      onFavoriteToggle={handleFavoriteToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
