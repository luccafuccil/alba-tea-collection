"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ProfilePhoto } from "@/components/layout/profile-photo";
import { Profile } from "@/lib/types";
import { getProfileLevelInfo } from "@/lib/profile";

interface ProfileGreetingProps {
  profile: Profile;
}

export const ProfileGreeting: React.FC<ProfileGreetingProps> = ({
  profile,
}) => {
  const levelInfo = getProfileLevelInfo(profile.level);

  return (
    <Card size="large" className="bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ProfilePhoto
            src={profile.photo}
            size="xl"
            className="w-32 h-32 md:w-40 md:h-40"
          />
        </motion.div>

        <div className="flex-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="font-title text-3xl md:text-4xl text-text-color leading-tight">
              This is your page,
              <br />
              {profile.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${levelInfo.color}`}
            >
              <span>{levelInfo.icon}</span>
              {levelInfo.label}
            </span>

            {profile.createdAt && (
              <span className="text-sm text-text-color/60 font-body">
                Member since {new Date(profile.createdAt).getFullYear()}
              </span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-body text-text-color/70 max-w-md"
          >
            {levelInfo.description}
          </motion.p>
        </div>
      </div>
    </Card>
  );
};
