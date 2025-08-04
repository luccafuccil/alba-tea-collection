"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconUser,
  IconMug,
  IconShoppingCart,
  IconLabel,
  IconSettings,
} from "@tabler/icons-react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import profileData from "@/../public/profile.json";

// Static profile data for now
const mockProfile = {
  id: profileData.id,
  name: profileData.name,
  photo: profileData.photo,
  level: profileData.level,
};

export const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleProfileClick = () => {
    router.push(`/profile/${mockProfile.id}`);
    setIsOpen(false);
  };

  const menuItems = [
    { icon: IconUser, label: "My Profile", href: `/profile/${mockProfile.id}` },
    { icon: IconMug, label: "My Tea Collection", href: "/closet" },
    {
      icon: IconShoppingCart,
      label: "Shop for Teas",
      href: "/shop",
      badge: "soon",
    },
    {
      icon: IconLabel,
      label: "Saved Programs",
      href: "/programs",
      badge: "soon",
    },
    { icon: IconSettings, label: "Settings", href: "/settings", badge: "soon" },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-10 h-10 rounded-full overflow-hidden",
          "ring-2 ring-transparent hover:ring-primary-green/50",
          "transition-all duration-200",
          isOpen && "ring-primary-green"
        )}
      >
        <img
          src={mockProfile.photo}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/profile/generic-profile.png";
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-12 right-0 w-80",
              "bg-white rounded-2xl shadow-xl border border-gray-100",
              "py-4 z-50"
            )}
          >
            <div className="px-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={mockProfile.photo}
                    alt="Profile"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={handleProfileClick}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/profile/generic-profile.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-title text-lg text-text-color">
                    Hello,
                    <br />
                    {mockProfile.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-block px-2 py-1 rounded-full text-xs font-medium mt-1",
                      getLevelColor(mockProfile.level)
                    )}
                  >
                    {mockProfile.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="py-2">
              {menuItems.map((item) => (
                <DropdownItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  badge={item.badge}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DropdownItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  badge?: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon: Icon,
  label,
  href,
  badge,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (badge !== "soon") {
      router.push(href);
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={badge === "soon"}
      className={cn(
        "w-full flex items-center gap-3 px-6 py-3 text-left",
        "hover:bg-gray-50 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "group"
      )}
    >
      <Icon
        size={20}
        className="text-text-color/60 group-hover:text-text-color"
      />
      <span className="font-body text-text-color flex-1">{label}</span>
      {badge && (
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

const getLevelColor = (level: string) => {
  const colors = {
    beginner: "bg-green-100 text-green-800",
    connoisseur: "bg-amber-100 text-amber-800",
    master: "bg-red-100 text-red-800",
  };
  return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-800";
};
