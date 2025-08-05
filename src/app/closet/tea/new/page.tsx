"use client";

import React from "react";
import { motion } from "framer-motion";
import { TeaForm } from "@/components/tea/tea-form";
import { PageContainer } from "@/components/ui/container";

export default function NewTeaPage() {
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
        <TeaForm />
      </motion.div>
    </PageContainer>
  );
}
