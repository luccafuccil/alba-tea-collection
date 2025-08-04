import React from "react";
import { Metadata } from "next";
import { CentralCard } from "@/components/home/central-card";
import { PageContainer } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Alba - Your Tea Collection",
  description:
    "Take your time, breathe, catalogue your tea collection and discover new sensations.",
};

export default function HomePage() {
  return (
    <PageContainer className="bg-gradient-home flex items-center justify-center min-h-screen">
      <CentralCard />
    </PageContainer>
  );
}
