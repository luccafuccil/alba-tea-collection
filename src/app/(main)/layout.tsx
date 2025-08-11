import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function MainLayout({ children, modal }: MainLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
