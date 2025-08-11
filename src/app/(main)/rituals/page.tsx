"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBook, IconPencil, IconHeart, IconLeaf } from "@tabler/icons-react";

export default function RitualsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-orange/20 via-primary-green/10 to-primary-blue/20">
      <Container size="lg" className="py-20">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="text-6xl animate-in zoom-in delay-200 duration-500">
            🧘‍♀️
          </div>

          <h1 className="font-title text-3xl md:text-4xl text-text-color animate-in fade-in delay-300 duration-500">
            Tea Rituals
          </h1>

          <div className="animate-in fade-in delay-400 duration-500">
            <Card
              size="medium"
              className="max-w-xl lg:max-w-2xl mx-auto bg-white/80 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <IconLeaf size={32} className="text-primary-orange" />
                </div>

                <div className="space-y-3">
                  <h2 className="font-title text-xl text-text-color">
                    In the Making
                  </h2>
                  <p className="font-body text-text-color/70 leading-relaxed">
                    Discover the meditative art of tea ceremonies. Create
                    personal rituals that combine mindfulness, gratitude, and
                    the ancient wisdom of tea.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="text-center space-y-1 animate-in fade-in delay-600 duration-300">
                    <IconPencil
                      className="mx-auto text-primary-blue"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Guided Ceremonies
                    </p>
                  </div>

                  <div className="text-center space-y-1 animate-in fade-in delay-700 duration-300">
                    <IconLeaf
                      className="mx-auto text-primary-green"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Mindful Brewing
                    </p>
                  </div>

                  <div className="text-center space-y-1 animate-in fade-in delay-800 duration-300">
                    <IconHeart
                      className="mx-auto text-primary-orange"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Personal Moments
                    </p>
                  </div>

                  <div className="text-center space-y-1 animate-in fade-in delay-900 duration-300">
                    <IconBook
                      className="mx-auto text-text-color/60"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Ritual Library
                    </p>
                  </div>
                </div>

                <div className="pt-4 animate-in fade-in delay-1000 duration-300">
                  <Button
                    variant="secondary"
                    onClick={() => window.history.back()}
                  >
                    Back to Collection
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
