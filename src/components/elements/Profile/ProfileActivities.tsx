import React from "react";
import { Skeleton } from "antd";
import { GoBook, GoComment, GoHeart, GoThumbsdown } from "react-icons/go";
import {
  profilePanel,
  profileRow,
  profileRowDetail,
  profileRowIcon,
  profileRowText,
  profileSection,
  profileSectionTitle,
} from "#/styles/profile";
import { eyebrow, storyMeta } from "#/styles/home";
import { formatBlogDate } from "#/utils/feed";
import { ProfileActivity } from "#/utils/profile";
import { ProfileEmpty } from "./ProfileEmpty";

const icons: Record<ProfileActivity["type"], React.ReactNode> = {
  blog: <GoBook size={18} />,
  like: <GoHeart size={18} />,
  dislike: <GoThumbsdown size={18} />,
  comment: <GoComment size={18} />,
};

type Props = {
  activities: ProfileActivity[];
  isLoading: boolean;
};

export const ProfileActivities: React.FC<Props> = ({
  activities,
  isLoading,
}) => {
  return (
    <section className={profileSection}>
      <div>
        <p className={eyebrow}>activity</p>
        <h2 className={profileSectionTitle}>What you have been up to</h2>
      </div>

      {isLoading ? (
        <div className={profilePanel}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      ) : activities.length === 0 ? (
        <ProfileEmpty
          title="Nothing here yet"
          text="Publish, like or comment on a blog and it will show up here."
        />
      ) : (
        <div className={profilePanel}>
          {activities.map((activity) => (
            <div key={activity.id} className={profileRow}>
              <span className={profileRowIcon}>{icons[activity.type]}</span>
              <div className="min-w-0 grow">
                <p className={profileRowText}>{activity.text}</p>
                <p className={profileRowDetail}>{activity.detail}</p>
              </div>
              {activity.date && (
                <p className={`${storyMeta} shrink-0`}>
                  {formatBlogDate(activity.date)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
