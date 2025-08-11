"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CentralCardContent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-lg mx-auto px-6 animate-slideInUp">
      <Card
        size="large"
        className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-xl"
      >
        <div className="space-y-8">
          <div className="flex justify-center animate-scaleIn">
            <div className="relative w-32 h-24">
              <Image
                src="/images/front-page-flower.png"
                alt="Decorative flower"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 animate-slideInUp">
            <h1 className="font-title text-2xl text-(--primary-brown) leading-tight">
              <>
                Take your time, breathe,
                <br />
                catalogue your tea collection
                <br />
                and discover new sensations.
              </>
            </h1>

            <p className="font-body text-(--primary-brown)/70 text-base md:text-lg leading-normal">
              You can add your own teas
              <br />
              or we can suggest one for you,
              <br />
              just as you like it.
            </p>
          </div>

          <div className="animate-fadeIn">
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export const CentralCard: React.FC = () => {
  return (
    <Suspense fallback={<CentralCardFallback />}>
      <CentralCardContent />
    </Suspense>
  );
};

const CentralCardFallback: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-lg mx-auto px-6 animate-slideInUp">
      <Card
        size="large"
        className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-xl"
      >
        <div className="space-y-8">
          <div className="flex justify-center animate-scaleIn">
            <div className="relative w-32 h-24">
              <Image
                src="/images/front-page-flower.png"
                alt="Decorative flower"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="space-y-4 animate-slideInUp"
            style={{ animationDelay: "200ms" }}
          >
            <h1 className="font-title text-2xl text-(--primary-brown) leading-tight">
              Take your time, breathe,
              <br />
              catalogue your tea collection
              <br />
              and discover new sensations.
            </h1>

            <p className="font-body text-(--primary-brown)/70 text-base md:text-lg leading-normal">
              You can add your own teas
              <br />
              or we can suggest one for you,
              <br />
              just as you like it.
            </p>
          </div>

          <div className="animate-fadeIn">
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
          </div>
        </div>
      </Card>
    </div>
  );
};
