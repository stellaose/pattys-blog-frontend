import React from "react";
import {
  profileAvatar,
  profileGlow,
  profileHeader,
  profileName,
  profileStat,
  profileStatLabel,
  profileStatValue,
  profileStats,
} from "#/styles/profile";
import { eyebrow, sectionText, storyMeta } from "#/styles/home";
import { formatBlogDate } from "#/utils/feed";
import { getInitials } from "#/utils/helper";

type Props = {
  user: any;
  stats: { blogs: number; likes: number; comments: number };
  label?: string;
};

export const ProfileHeader: React.FC<Props> = ({
  user,
  stats,
  label = "your profile",
}) => {
  const items = [
    { label: "Blogs", value: stats.blogs },
    { label: "Likes", value: stats.likes },
    { label: "Comments", value: stats.comments },
  ];

  return (
    <div className={profileHeader}>
      <div className={profileGlow} />
      <div className="relative flex sm:flex-row flex-col sm:items-center gap-6">
        <span className={profileAvatar}>
          {getInitials(user?.first_name, user?.last_name)}
        </span>
        <div className="flex flex-col gap-1">
          <p className={eyebrow}>{label}</p>
          <h1 className={profileName}>
            {user?.first_name} {user?.last_name}
            <span className="text-purple-200">.</span>
          </h1>
          <p className={storyMeta}>
            {user?.user_name && `@${user.user_name}`}
            {user?.createdAt && ` · Joined ${formatBlogDate(user.createdAt)}`}
          </p>
          {user?.bio && (
            <p className={`${sectionText} !text-sm max-w-[480px] mt-1`}>
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className={profileStats}>
        {items.map((item) => (
          <div key={item.label} className={profileStat}>
            <p className={profileStatValue}>{item.value}</p>
            <p className={profileStatLabel}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
