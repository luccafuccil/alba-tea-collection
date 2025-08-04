"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconUser,
  IconMug,
  IconShoppingCart,
  IconLabel,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import profileData from "@/../public/profile.json";

// Static profile data for now
const mockProfile = {
  id: profileData.id,
  name: profileData.name,
  photo: profileData.photo,
  level: profileData.level,
};

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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

  const handleItemClick = (href: string, badge?: string) => {
    if (badge !== "soon") {
      router.push(href);
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <IconMenu2 size={24} className="text-text-color" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={cn(
                "fixed top-0 right-0 h-full w-80 max-w-[85vw]",
                "bg-white shadow-xl z-50",
                "flex flex-col"
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-title text-xl text-text-color">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <IconX size={20} className="text-text-color" />
                </button>
              </div>

              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={mockProfile.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/profile/generic-profile.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-title text-lg text-text-color">
                      {mockProfile.name}
                    </h3>
                    <span className="text-sm text-text-color/60 capitalize">
                      {mockProfile.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 py-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item.href, item.badge)}
                    disabled={item.badge === "soon"}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-4 text-left",
                      "hover:bg-gray-50 transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "group"
                    )}
                  >
                    <item.icon
                      size={20}
                      className="text-text-color/60 group-hover:text-text-color"
                    />
                    <span className="font-body text-text-color flex-1">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
