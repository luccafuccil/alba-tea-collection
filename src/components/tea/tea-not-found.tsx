"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTeaStore } from "@/store/tea-store";

interface TeaNotFoundProps {
  onBack?: () => void;
  message?: string;
}

const TeaNotFound: React.FC<TeaNotFoundProps> = ({
  onBack,
  message = "Tea not found",
}) => {
  const router = useRouter();
  const { teas, clearAllTeas } = useTeaStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/closet");
    }
  };

  const handleClearStorage = () => {
    if (confirm("This will clear all saved teas. Are you sure?")) {
      clearAllTeas();
      router.push("/closet");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-title font-semibold text-primary-brown mb-2">
                {message}
              </h1>
              <p className="text-primary-brown/70 font-body">
                The tea you&apos;re looking for could not be found in your
                collection.
              </p>
              <p className="text-sm text-primary-brown/50 font-body mt-2">
                Available teas: {teas.length}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleBack} className="flex-1">
                Back to Collection
              </Button>
              {teas.length === 0 && (
                <Button
                  onClick={handleClearStorage}
                  variant="secondary"
                  className="flex-1"
                >
                  Clear Old Data
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaNotFound;
