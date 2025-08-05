"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface TeaNotFoundProps {
  onBack?: () => void;
  message?: string;
}

const TeaNotFound: React.FC<TeaNotFoundProps> = ({
  onBack,
  message = "Tea not found",
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="font-title text-2xl text-text-color">{message}</h1>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default TeaNotFound;
