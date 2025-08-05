"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tea } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TeaDetailBackgroundProps {
  tea: Tea;
  children: React.ReactNode;
  className?: string;
}

const getTeaGradient = (teaType: Tea["type"]) => {
  const gradients = {
    black: "bg-gradient-to-b from-slate-100 to-(--background-color)",
    green: "bg-gradient-to-b from-emerald-100 to-(--background-color)",
    white: "bg-gradient-to-b from-stone-100 to-(--background-color)",
    oolong: "bg-gradient-to-b from-orange-100 to-(--background-color)",
    puerh: "bg-gradient-to-b from-rose-100 to-(--background-color)",
  };
  return (
    gradients[teaType] ||
    "bg-gradient-to-br from-gray-200 to-(--background-color)"
  );
};

const TeaDetailBackground: React.FC<TeaDetailBackgroundProps> = ({
  tea,
  children,
  className,
}) => {
  return (
    <div className={cn("py-8 min-h-dvh", getTeaGradient(tea.type), className)}>
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden mt-16 relative">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeaDetailBackground;
