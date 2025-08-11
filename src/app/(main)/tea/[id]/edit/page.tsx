"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTeaStore } from "@/store/tea-store";
import TeaDetailBackground from "@/components/tea/tea-detail-background";
import { ServerTeaForm } from "@/components/tea/server-tea-form";

export default function EditTeaPage() {
  const params = useParams();
  const { getTea, teas, clearAllTeas } = useTeaStore();
  const router = useRouter();

  const teaId = Array.isArray(params.id) ? params.id[0] : params.id;
  const tea = teaId ? getTea(teaId) : undefined;

  const handleGoBack = () => {
    router.push("/closet");
  };

  const handleClearStorage = () => {
    if (confirm("Isso irá limpar todos os chás salvos. Tem certeza?")) {
      clearAllTeas();
      router.push("/closet");
    }
  };

  if (!tea) {
    return (
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
                Tea Not Found
              </h1>
              <p className="text-primary-brown/70 font-body">
                The tea with ID <strong>&quot;{teaId}&quot;</strong> could not
                be found.
              </p>
              <p className="text-sm text-primary-brown/50 font-body mt-2">
                Available teas: {teas.length}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleGoBack}
                className="flex-1 bg-primary-brown text-white px-6 py-3 rounded-lg hover:bg-primary-brown/90 transition-colors font-medium"
              >
                Back to Collection
              </button>

              {teas.length === 0 && (
                <button
                  onClick={handleClearStorage}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Clear Old Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TeaDetailBackground tea={tea}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-title font-semibold text-primary-brown mb-2">
              Edit Tea{" "}
            </h1>
          </div>

          <ServerTeaForm mode="edit" initialData={tea} />
        </div>
      </div>
    </TeaDetailBackground>
  );
}
