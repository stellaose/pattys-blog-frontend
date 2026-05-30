"use client";
import React from "react";
import { Footer, Header } from ".";

export const AppLayouts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};
