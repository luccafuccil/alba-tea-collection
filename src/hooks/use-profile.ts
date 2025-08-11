"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { Profile } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants/ui";

export function useProfile(profileId?: string) {
  const [profile, setProfile] = useLocalStorage<Profile | null>(
    STORAGE_KEYS.profile,
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (id?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/profile.json");
      if (response.ok) {
        const profileData = await response.json();

        if (!id || id === profileData.id) {
          const completeProfile: Profile = {
            id: profileData.id,
            name: profileData.name,
            photo: profileData.photo,
            level: profileData.level,
            createdAt: new Date("2024-01-15"),
          };

          setProfile(completeProfile);
          return;
        }
      }

      if (id && id !== "lucca") {
        setError("Profile not found");
        setProfile(null);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);

      const mockProfile: Profile = {
        id: "lucca",
        name: "Tea Lover",
        photo: "/images/profile/generic-profile.png",
        level: "beginner",
        createdAt: new Date("2024-01-15"),
      };

      if (!id || id === mockProfile.id) {
        setProfile(mockProfile);
      } else {
        setError("Profile not found");
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      if (!profile) return;

      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const updatedProfile = {
          ...profile,
          ...updates,
          updatedAt: new Date(),
        };

        setProfile(updatedProfile);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update profile"
        );
      } finally {
        setLoading(false);
      }
    },
    [profile, setProfile]
  );

  useEffect(() => {
    fetchProfile(profileId);
  }, [profileId, fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: () => fetchProfile(profileId),
  };
}
