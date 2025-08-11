"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useNavigationMenu } from "@/hooks/use-navigation-menu";
import profileData from "@/../public/profile.json";

// Static profile data for now
const mockProfile = {
  id: profileData.id,
  name: profileData.name,
  photo: profileData.photo,
  level: profileData.level,
};

export const MobileMenu: React.FC = () => {
  const { isOpen, setIsOpen, menuItems, handleItemClick } = useNavigationMenu(
    mockProfile.id
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-(--primary-green)/10 transition-colors"
      >
        <IconMenu2 size={24} className="text-(--primary-brown)" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0  backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={cn(
                "fixed top-0 right-0 h-full w-80 max-w-[85vw]",
                "bg-white shadow-2xl z-50 border-l border-gray-100",
                "glass",
                "flex flex-col"
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-(--primary-green)/30">
                    <Image
                      src={mockProfile.photo}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/profile/generic-profile.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-title text-lg text-(--primary-brown)">
                      {mockProfile.name}
                    </h3>
                    <span className="text-sm text-(--primary-brown)/60 capitalize">
                      {mockProfile.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <IconX size={20} className="text-(--primary-brown)" />
                </button>
              </div>

              <div className="flex-1 py-4 bg-white/90 backdrop-blur-sm">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    disabled={item.badge === "soon"}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-4 text-left",
                      "transition-colors relative",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "group bg-white/40 backdrop-blur-sm",
                      item.isActive
                        ? "bg-white/70 text-(--primary-brown)"
                        : "hover:bg-white/50"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        "transition-colors",
                        item.isActive
                          ? "text-(--primary-brown)"
                          : "text-(--primary-brown)/70 group-hover:text-(--primary-brown)"
                      )}
                    />
                    <span
                      className={cn(
                        "font-body transition-colors flex-1",
                        item.isActive
                          ? "text-(--primary-brown) font-medium"
                          : "text-(--primary-brown)/90"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-xs bg-white/50 text-(--primary-brown)/90 px-2 py-1 rounded-full backdrop-blur-sm border border-white/50">
                        {item.badge}
                      </span>
                    )}
                    {item.isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--primary-green) rounded-r-full shadow-sm" />
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
