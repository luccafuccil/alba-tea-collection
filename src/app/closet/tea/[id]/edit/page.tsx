"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { TeaForm } from "@/components/tea/tea-form";
import { PageContainer } from "@/components/ui/container";
import { useTeaStore } from "@/store/tea-store";

interface EditTeaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditTeaPage({ params }: EditTeaPageProps) {
  const { id } = use(params);
  const { getTea } = useTeaStore();
  const tea = getTea(id);

  if (!tea) {
    notFound();
  }

  return (
    <PageContainer className="bg-gradient-closet">
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.6,
        }}
        className="py-8"
      >
        <TeaForm initialData={tea} />
      </motion.div>
    </PageContainer>
  );
}
