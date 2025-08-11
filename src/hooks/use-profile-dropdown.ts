"use client";

import { useRef } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useNavigationMenu } from "@/hooks/use-navigation-menu";
import { type NavigationItem } from "@/lib/constants/navigation";

interface UseProfileDropdownReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  menuItems: Array<
    NavigationItem & { resolvedHref: string; isActive: boolean }
  >;
  handleItemClick: (item: NavigationItem) => void;
  handleProfileClick: () => void;
}

export const useProfileDropdown = (
  profileId: string
): UseProfileDropdownReturn => {
  const navigation = useNavigationMenu(profileId);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => navigation.setIsOpen(false));

  return {
    ...navigation,
    dropdownRef,
  };
};
