import React from "react";
import { Metadata } from "next";
import { PageContainer } from "@/components/ui/container";
import { ServerTeaForm } from "@/components/tea/server-tea-form";

export const metadata: Metadata = {
  title: "Add New Tea | Alba",
  description: "Add a new tea to your collection.",
};

export default function NewTeaPage() {
  return (
    <PageContainer className="bg-gradient-closet py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-title font-semibold text-primary-brown mb-2">
              Add New Tea
            </h1>
            <p className="text-primary-brown/70 font-body">
              Fill in the details below to add a new tea to your collection.
            </p>
          </div>
          <ServerTeaForm mode="create" />
        </div>
      </div>
    </PageContainer>
  );
}
