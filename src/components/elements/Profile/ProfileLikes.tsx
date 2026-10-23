import React from "react";
import { SkeletonLoader } from "#components/general";
import { GoComment, GoHeartFill, GoThumbsdown } from "react-icons/go";
import {
  profileBlogStat,
  profileBlogTitle,
  profileGrid,
  profilePanel,
  profileSection,
  profileSectionTitle,
} from "#/styles/profile";
import { eyebrow, sectionText, storyMeta, storyTag } from "#/styles/home";
import { formatBlogDate, getBlogExcerpt } from "#/utils/feed";
import { ProfileEmpty } from "./ProfileEmpty";

type Props = {
  blogs: any[];
  isLoading: boolean;
};

export const ProfileLikes: React.FC<Props> = ({ blogs, isLoading }) => {
  return (
    <section className={profileSection}>
      <div>
        <p className={eyebrow}>likes</p>
        <h2 className={profileSectionTitle}>Blogs you liked</h2>
      </div>

      {isLoading ? (
        <SkeletonLoader
          count={2}
          className={profilePanel}
          wrapperClassName={profileGrid}
        />
      ) : blogs.length === 0 ? (
        <ProfileEmpty
          title="No likes yet"
          text="Blogs you like from the feed will be collected here."
        />
      ) : (
        <div className={profileGrid}>
          {blogs.map((blog) => (
            <article
              key={blog.blogId}
              className={`${profilePanel} flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className={storyMeta}>{formatBlogDate(blog.createdAt)}</p>
                {blog.category && <p className={storyTag}>{blog.category}</p>}
              </div>
              <h3 className={profileBlogTitle}>{blog.title}</h3>
              <p className={`${sectionText} !text-sm`}>
                {getBlogExcerpt(blog.description, 160)}
              </p>
              <div className="flex items-center gap-5 border-t border-white-150 pt-4 mt-auto">
                <span className={`${profileBlogStat} !text-red`}>
                  <GoHeartFill size={18} /> {blog.likeNo ?? 0}
                </span>
                <span className={profileBlogStat}>
                  <GoThumbsdown size={18} /> {blog.dislikeNo ?? 0}
                </span>
                <span className={profileBlogStat}>
                  <GoComment size={18} /> {blog.review?.length ?? 0}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
