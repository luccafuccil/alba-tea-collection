"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const CentralCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isFromCloset = searchParams.get("from") === "closet";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto px-6"
    >
      <Card
        size="large"
        className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-xl"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-32 h-24">
              <Image
                src="/images/front-page-flower.png"
                alt="Decorative flower"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-title text-2xl text-(--primary-brown) leading-tight">
              {isFromCloset ? (
                "Ready for more tea discoveries?"
              ) : (
                <>
                  Take your time, breathe,
                  <br />
                  catalogue your tea collection
                  <br />
                  and discover new sensations.
                </>
              )}
            </h1>

            <p className="font-body text-(--primary-brown)/70 text-base md:text-lg leading-normal">
              You can add your own teas
              <br />
              or we can suggest one for you,
              <br />
              just as you like it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => router.push("/closet")}
              className={cn(
                "text-lg px-8 py-4 font-body",
                "hover:scale-105 active:scale-95 transform transition-all duration-200",
                "shadow-lg hover:shadow-xl"
              )}
            >
              Go to my closet
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
