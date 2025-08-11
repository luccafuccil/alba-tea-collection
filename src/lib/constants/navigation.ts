import { IconUser, IconMug, IconBook, IconCalendar } from "@tabler/icons-react";

export interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  badge?: "new" | "soon" | "beta";
  matchPattern?: string;
  exact?: boolean;
}

export const PROFILE_MENU_ITEMS: NavigationItem[] = [
  {
    id: "profile",
    icon: IconUser,
    label: "My Profile",
    href: "/profile/{profileId}",
    matchPattern: "/profile/",
  },
  {
    id: "collection",
    icon: IconMug,
    label: "My Tea Collection",
    href: "/closet",
    matchPattern: "/closet",
  },
  {
    id: "discover",
    icon: IconBook,
    label: "Discover Teas",
    href: "/discover",
    badge: "soon",
    exact: true,
  },
  {
    id: "rituals",
    icon: IconCalendar,
    label: "Tea Rituals",
    href: "/rituals",
    badge: "soon",
    exact: true,
  },
];

export const resolveHref = (href: string, profileId: string): string => {
  return href.replace("{profileId}", profileId);
};

export const isNavigationItemActive = (
  item: NavigationItem,
  currentPath: string,
  profileId: string
): boolean => {
  const resolvedHref = resolveHref(item.href, profileId);

  if (item.exact) {
    return currentPath === resolvedHref;
  }

  if (item.matchPattern) {
    return currentPath.startsWith(item.matchPattern);
  }

  return currentPath.startsWith(resolvedHref);
};
