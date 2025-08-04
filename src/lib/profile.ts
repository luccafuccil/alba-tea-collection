import { Profile, ProfileLevel } from "@/lib/types";

export function getProfileLevelInfo(level: ProfileLevel) {
  const levels = {
    beginner: {
      label: "Beginner",
      description: "Just starting your tea journey",
      color: "bg-green-100 text-green-800",
      icon: "🌱",
    },
    connoisseur: {
      label: "Connoisseur",
      description: "Developing refined taste",
      color: "bg-amber-100 text-amber-800",
      icon: "🍃",
    },
    master: {
      label: "Master",
      description: "Expert in tea appreciation",
      color: "bg-red-100 text-red-800",
      icon: "🏆",
    },
  };

  return levels[level];
}

export function getProfileCompletionPercentage(profile: Profile): number {
  const fields = ["name", "photo", "level"];
  const completed = fields.filter((field) => {
    const value = profile[field as keyof Profile];
    return value && value !== "";
  }).length;

  return Math.round((completed / fields.length) * 100);
}
