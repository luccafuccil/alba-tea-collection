import React, { Suspense } from "react";
import { Metadata } from "next";
import { ProfilePageContent } from "@/components/profile/profile-page-content";
import { PageContainer } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-overlay";

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `${id} | Alba`,
    description: "View and manage your tea profile and collection highlights.",
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  return (
    <PageContainer className="bg-gradient-profile">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <ProfilePageContent profileId={id} />
      </Suspense>
    </PageContainer>
  );
}
