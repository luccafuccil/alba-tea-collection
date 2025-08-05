"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardSkeleton } from "@/components/ui/card";

const TeaDetailLoading: React.FC = () => {
  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden mt-16 relative">
            <div className="p-8 space-y-6">
              <CardSkeleton
                size="large"
                className="bg-transparent shadow-none border-none min-h-dvh"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeaDetailLoading;
