import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-cream to-primary-green/10">
      <div className="flex items-center justify-center min-h-screen p-4">
        {children}
      </div>
    </div>
  );
}
