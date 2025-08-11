"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProfileDropdown } from "@/hooks/use-profile-dropdown";
import profileData from "@/../public/profile.json";

// Static profile data for now
const mockProfile = {
  id: profileData.id,
  name: profileData.name,
  photo: profileData.photo,
  level: profileData.level,
};

export const ProfileDropdown: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    menuItems,
    handleItemClick,
    handleProfileClick,
  } = useProfileDropdown(mockProfile.id);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-10 h-10 rounded-full overflow-hidden",
          "ring-2 ring-transparent hover:ring-(--primary-green)/50",
          "transition-all duration-200",
          isOpen && "ring-2 ring-(--primary-green)"
        )}
      >
        <Image
          src={mockProfile.photo}
          alt="Profile"
          width={40}
          height={40}
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
                  <Image
                    src={mockProfile.photo}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={handleProfileClick}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/profile/generic-profile.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-(--primary-brown)">
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
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  badge={item.badge}
                  isActive={item.isActive}
                  onClick={() => handleItemClick(item)}
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
  badge?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon: Icon,
  label,
  badge,
  isActive = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={badge === "soon"}
      className={cn(
        "w-full flex items-center gap-3 px-6 py-3 text-left",
        "transition-colors relative",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "group",
        isActive
          ? "bg-(--primary-green)/10 text-(--primary-brown)"
          : "hover:bg-gray-50"
      )}
    >
      <Icon
        size={20}
        className={cn(
          "transition-colors",
          isActive
            ? "text-(--primary-brown)"
            : "text-(--primary-brown)/60 group-hover:text-(--primary-brown)"
        )}
      />
      <span
        className={cn(
          "font-body transition-colors flex-1",
          isActive
            ? "text-(--primary-brown) font-medium"
            : "text-(--primary-brown) group-hover:font-medium"
        )}
      >
        {label}
      </span>
      {badge && (
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--primary-green) rounded-r-full" />
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
