"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TeaDetailBackground from "@/components/tea/tea-detail-background";
import TeaDetailCard from "@/components/tea/tea-detail-card";
import TeaDetailLoading from "@/components/tea/tea-detail-loading";
import TeaNotFound from "@/components/tea/tea-not-found";
import { useTeaStore } from "@/store/tea-store";

export default function TeaDetailPage() {
  const params = useParams();
  const { teas, toggleFavorite } = useTeaStore();
  const [isLoading, setIsLoading] = useState(true);

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teas.find((t) => t.id === teaId);

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

  if (isLoading) {
    return <TeaDetailLoading />;
  }

  if (!tea) {
    return <TeaNotFound />;
  }

  return (
    <TeaDetailBackground tea={tea}>
      <TeaDetailCard tea={tea} onFavoriteToggle={handleFavoriteToggle} />
    </TeaDetailBackground>
  );
}
