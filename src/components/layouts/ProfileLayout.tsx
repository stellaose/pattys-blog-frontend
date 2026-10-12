"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AppLayouts } from "./AppLayouts";
import { ProfileHeader, ProfileTabs } from "#components/elements";
import { useAuthGuard, useGetMyBlogs } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { container } from "#/styles/home";
import { profileBody } from "#/styles/profile";
import { getProfileStats } from "#/utils/profile";

export const ProfileLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();
  const state = useAppSelector((state) => state.app);

  const { isAllowed } = useAuthGuard();
  const { blogs } = useGetMyBlogs(state.isLoggedIn);

  if (!isAllowed) return null;

  return (
    <>
      <AppLayouts>
        <div className={profileBody}>
          <div className={container}>
            <ProfileHeader user={state.user} stats={getProfileStats(blogs)} />
            <ProfileTabs pathname={pathname} />
            {children}
          </div>
        </div>
      </AppLayouts>
    </>
  );
};
