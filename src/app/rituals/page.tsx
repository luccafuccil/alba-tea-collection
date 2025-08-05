"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBook, IconPencil, IconHeart, IconLeaf } from "@tabler/icons-react";

export default function RitualsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-orange/20 via-primary-green/10 to-primary-blue/20">
      <Container size="lg" className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="text-6xl"
          >
            🧘‍♀️
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-title text-3xl md:text-4xl text-text-color"
          >
            Tea Rituals
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-center space-y-1"
                  >
                    <IconPencil
                      className="mx-auto text-primary-blue"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Guided Ceremonies
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="text-center space-y-1"
                  >
                    <IconLeaf
                      className="mx-auto text-primary-green"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Mindful Brewing
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-center space-y-1"
                  >
                    <IconHeart
                      className="mx-auto text-primary-orange"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Personal Moments
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="text-center space-y-1"
                  >
                    <IconBook
                      className="mx-auto text-text-color/60"
                      size={20}
                    />
                    <p className="font-body text-xs text-text-color/60">
                      Ritual Library
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="pt-4"
                >
                  <Button
                    variant="secondary"
                    onClick={() => window.history.back()}
                  >
                    Back to Collection
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
