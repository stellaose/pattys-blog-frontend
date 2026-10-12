"use client";
import React from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import {
  feedAside,
  feedBody,
  feedGrid,
  feedHeader,
  feedPanel,
  feedPanelTitle,
  feedProfileAvatar,
  feedProfileLink,
  feedProfileName,
  feedPromo,
  feedTitle,
} from "#/styles/feed";
import { container, eyebrow, sectionText, storyMeta } from "#/styles/home";
import { getInitials } from "#/utils/helper";
import { CreateBlog } from "#components/elements";

export const FeedLayout: React.FC<{
  children: React.ReactNode;
  user: any;
}> = ({ children, user }) => {
  return (
    <>
      <div className={feedBody}>
        <div className={container}>
          <div className={feedHeader}>
            <div>
              <p className={eyebrow}>your feed</p>
              <h1 className={feedTitle}>
                Welcome back{user?.first_name ? `, ${user.first_name}` : ""}
                <span className="text-purple-200">.</span>
              </h1>
              <p className={`${sectionText} mt-2`}>
                See what the community is writing, liking and talking about
                today.
              </p>
            </div>
            <div className="shrink-0">
              <CreateBlog />
            </div>
          </div>

          <div className={feedGrid}>
            <div className="min-w-0">{children}</div>

            <aside className={feedAside}>
              <div className={feedPanel}>
                <p className={feedPanelTitle}>your profile</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className={feedProfileAvatar}>
                    {getInitials(user?.first_name, user?.last_name)}
                  </span>
                  <div className="min-w-0">
                    <p className={feedProfileName}>
                      {user?.first_name} {user?.last_name}
                    </p>
                    {user?.user_name && (
                      <p className={storyMeta}>@{user.user_name}</p>
                    )}
                  </div>
                </div>
                {user?.bio && (
                  <p className={`${sectionText} !text-sm mb-4`}>{user.bio}</p>
                )}
                <Link href="/profile/my-blogs">
                  <span className={feedProfileLink}>
                    My blogs ({user?.blogs?.length ?? 0})
                    <GoArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/profile/settings">
                  <span className={`${feedProfileLink} !pb-0`}>
                    Profile settings <GoArrowRight size={16} />
                  </span>
                </Link>
              </div>

              <div className={feedPromo}>
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-purple-200/40 blur-3xl" />
                <p className="relative text-xs text-lilac-200 font-bold uppercase font-arial">
                  your turn
                </p>
                <p className="relative text-24 font-lora font-bold text-white leading-snug">
                  Share your voice with the{" "}
                  <span className="text-purple-100">world.</span>
                </p>
                <div className="relative self-start">
                  <CreateBlog title="Start writing" variant="light" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
