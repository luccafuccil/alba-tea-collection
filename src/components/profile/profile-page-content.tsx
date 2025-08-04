"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { LoadingSpinner } from "@/components/ui/loading-overlay";
import { Card } from "@/components/ui/card";
import { ProfileGreeting } from "./profile-greeting";
import { ProfileTeaList } from "./profile-tea-list";
import { WeatherWidget } from "@/components/widgets/weather-widget";
import { useProfile } from "@/hooks/use-profile";

interface ProfilePageContentProps {
  profileId: string;
}

export const ProfilePageContent: React.FC<ProfilePageContentProps> = ({
  profileId,
}) => {
  const { profile, loading, error } = useProfile(profileId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-12">
        <Card size="large" className="text-center">
          <div className="space-y-4">
            <div className="text-6xl">😕</div>
            <h2 className="font-title text-2xl text-text-color">
              Profile Not Found
            </h2>
            <p className="font-body text-text-color/70">
              The profile you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </Card>
      </Container>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Container size="xl" className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <ProfileGreeting profile={profile} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <WeatherWidget />
          <ProfileTeaList profileId={profileId} />
        </motion.div>
      </div>
    </Container>
  );
};
