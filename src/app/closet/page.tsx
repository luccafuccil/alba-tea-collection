import React, { Suspense } from "react";
import { Metadata } from "next";
import { TeaClosetContent } from "@/components/closet/tea-closet-content";
import { PageContainer } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-overlay";

export const metadata: Metadata = {
  title: "My Tea Collection | Alba",
  description: "Manage and explore your personal tea collection.",
};

export default function ClosetPage() {
  return (
    <PageContainer className="bg-gradient-closet">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <TeaClosetContent />
      </Suspense>
    </PageContainer>
  );
}
