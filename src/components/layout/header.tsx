"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { useIsDesktop } from "@/hooks/use-responsive";
import { ProfileDropdown } from "./profile-dropdown";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-background-color/80 backdrop-blur-md",
        "border-b border-white/20 animate-in slide-in-from-top duration-500",
        className
      )}
    >
      <Container size="full" padding="lg">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group">
            <h1 className="font-title text-2xl md:text-3xl text-text-color font-medium hover:scale-105 transition-transform duration-200">
              Alba
            </h1>
          </Link>

          {isDesktop && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/closet" active={pathname.startsWith("/closet")}>
                My Collection
              </NavLink>
              <NavLink href="/discover" active={pathname === "/discover"}>
                Discover
              </NavLink>
              <NavLink href="/rituals" active={pathname === "/rituals"}>
                Rituals
              </NavLink>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isDesktop ? <ProfileDropdown /> : <MobileMenu />}
          </div>
        </div>
      </Container>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active,
  className,
}) => (
  <Link
    href={href}
    className={cn(
      "relative px-3 py-2 text-sm font-medium transition-all duration-200",
      "font-body rounded-full",
      active
        ? "text-text-color bg-primary-green/20"
        : "text-text-color/70 hover:text-text-color hover:bg-white/10",
      className
    )}
  >
    {children}
    {active && (
      <div className="absolute inset-0 bg-primary-green/20 rounded-full -z-10 animate-in fade-in duration-200" />
    )}
  </Link>
);
