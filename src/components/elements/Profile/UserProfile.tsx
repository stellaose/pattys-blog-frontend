import React from "react";
import { SkeletonLoader } from "#components/general";
import { feedGrid, feedPanel, feedPanelTitle } from "#/styles/feed";
import { eyebrow } from "#/styles/home";
import {
  profilePanel,
  profileSectionTitle,
  userInfoLabel,
  userInfoRow,
  userInfoValue,
} from "#/styles/profile";
import { formatBlogDate } from "#/utils/feed";
import { getProfileStats } from "#/utils/profile";
import { FeedList } from "../Feed/FeedList";
import { ProfileEmpty } from "./ProfileEmpty";
import { ProfileHeader } from "./ProfileHeader";

type Props = {
  user: any;
  blogs: any[];
  userId: string;
  isLoading: boolean;
};

export const UserProfile: React.FC<Props> = ({
  user,
  blogs,
  userId,
  isLoading,
}) => {
  if (isLoading) {
    return <SkeletonLoader avatar rows={4} className={profilePanel} />;
  }

  if (!user) {
    return (
      <ProfileEmpty
        title="Profile not found"
        text="This member does not exist or their account has been closed."
      />
    );
  }

  const information = [
    { label: "Username", value: user.user_name && `@${user.user_name}` },
    { label: "Gender", value: user.gender },
    { label: "Joined", value: formatBlogDate(user.createdAt) },
    { label: "Blogs", value: blogs.length },
  ];

  return (
    <>
      <ProfileHeader
        user={user}
        stats={getProfileStats(blogs)}
        label="member profile"
      />

      <div className={feedGrid}>
        <div className="min-w-0">
          <div className="mb-6">
            <p className={eyebrow}>blogs</p>
            <h2 className={profileSectionTitle}>
              Written by {user.first_name}
            </h2>
          </div>
          {blogs.length === 0 ? (
            <ProfileEmpty
              title="No blogs yet"
              text={`${user.first_name} has not published a blog yet.`}
            />
          ) : (
            <FeedList blogs={blogs} userId={userId} />
          )}
        </div>

        <aside className={`${feedPanel} self-start w-full`}>
          <p className={feedPanelTitle}>information</p>
          {information
            .filter((item) => item.value || item.value === 0)
            .map((item) => (
              <div key={item.label} className={userInfoRow}>
                <p className={userInfoLabel}>{item.label}</p>
                <p
                  className={`${userInfoValue} ${item.label === "Username" ? "!normal-case" : ""}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          {user.bio && (
            <div className="pt-4">
              <p className={`${userInfoLabel} mb-1`}>Bio</p>
              <p className="text-sm font-arial text-black-200">{user.bio}</p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};
