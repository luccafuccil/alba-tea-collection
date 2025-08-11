"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  PROFILE_MENU_ITEMS,
  resolveHref,
  isNavigationItemActive,
  type NavigationItem,
} from "@/lib/constants/navigation";

interface UseNavigationMenuReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: Array<
    NavigationItem & { resolvedHref: string; isActive: boolean }
  >;
  handleItemClick: (item: NavigationItem) => void;
  handleProfileClick: () => void;
}

export const useNavigationMenu = (
  profileId: string
): UseNavigationMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleProfileClick = () => {
    router.push(`/profile/${profileId}`);
    setIsOpen(false);
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.badge === "soon") {
      return;
    }

    const resolvedHref = resolveHref(item.href, profileId);
    router.push(resolvedHref);
    setIsOpen(false);
  };

  const menuItems = PROFILE_MENU_ITEMS.map((item) => ({
    ...item,
    resolvedHref: resolveHref(item.href, profileId),
    isActive: isNavigationItemActive(item, pathname, profileId),
  }));

  return {
    isOpen,
    setIsOpen,
    menuItems,
    handleItemClick,
    handleProfileClick,
  };
};
