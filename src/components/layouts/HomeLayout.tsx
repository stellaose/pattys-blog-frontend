"use client";
import React from "react";
import { Hero, Highlights, JoinBanner } from "#components/elements";
import { useAppSelector } from "#store/hook";
import { homeBody } from "#/styles/home";

export const HomeLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

  return (
    <>
      <div className={homeBody}>
        <Hero isLoggedIn={isLoggedIn} />
        <Highlights />
        {children}
        {!isLoggedIn && <JoinBanner />}
      </div>
    </>
  );
};
