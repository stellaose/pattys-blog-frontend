import React from "react";
import Link from "next/link";
import {
  profileTab,
  profileTabActive,
  profileTabIdle,
  profileTabsRow,
} from "#/styles/profile";
import { profileTabs } from "#/utils/profile";

export const ProfileTabs: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <nav className={profileTabsRow}>
      {profileTabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <span
            className={`${profileTab} ${pathname === tab.href ? profileTabActive : profileTabIdle}`}
          >
            {tab.icon} {tab.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
