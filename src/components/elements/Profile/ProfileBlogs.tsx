import React from "react";
import { SkeletonLoader } from "#components/general";
import { Popconfirm } from "antd";
import {
  GoComment,
  GoHeart,
  GoHeartFill,
  GoThumbsdown,
  GoTrash,
} from "react-icons/go";
import {
  profileBlogStat,
  profileBlogTitle,
  profileDelete,
  profileFlag,
  profileGrid,
  profilePanel,
  profileSection,
  profileSectionHead,
  profileSectionTitle,
} from "#/styles/profile";
import {
  eyebrow,
  sectionText,
  storyMeta,
  storyTag,
  storyAction,
} from "#/styles/home";
import { feedActionActive, feedActionLiked } from "#/styles/feed";
import { formatBlogDate, getBlogExcerpt } from "#/utils/feed";
import { CreateBlog } from "../Feed/CreateBlog";
import { ProfileEmpty } from "./ProfileEmpty";

type Props = {
  blogs: any[];
  userId: string;
  isLoading: boolean;
  onLike: (blog: any) => void;
  onDislike: (blog: any) => void;
  onDelete: (blogId: string) => void;
};

export const ProfileBlogs: React.FC<Props> = ({
  blogs,
  userId,
  isLoading,
  onLike,
  onDislike,
  onDelete,
}) => {
  return (
    <section className={profileSection}>
      <div className={profileSectionHead}>
        <div>
          <p className={eyebrow}>my blogs</p>
          <h2 className={profileSectionTitle}>Everything you have written</h2>
        </div>
        <CreateBlog />
      </div>

      {isLoading ? (
        <SkeletonLoader
          count={2}
          className={profilePanel}
          wrapperClassName={profileGrid}
        />
      ) : blogs.length === 0 ? (
        <ProfileEmpty
          title="No blogs yet"
          text="Your published blogs will show up here. Start with your first one."
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
                <div className="flex items-center gap-2">
                  {blog.isFlagged && <p className={profileFlag}>Flagged</p>}
                  {blog.category && <p className={storyTag}>{blog.category}</p>}
                </div>
              </div>
              <h3 className={profileBlogTitle}>{blog.title}</h3>
              <p className={`${sectionText} !text-sm`}>
                {getBlogExcerpt(blog.description, 160)}
              </p>
              <div className="flex items-center gap-5 border-t border-white-150 pt-4 mt-auto">
                <button
                  type="button"
                  aria-pressed={!!blog.likes?.includes(userId)}
                  aria-label={
                    blog.likes?.includes(userId) ? "Remove like" : "Like blog"
                  }
                  className={`${storyAction} ${blog.likes?.includes(userId) ? feedActionLiked : ""}`}
                  onClick={() => onLike(blog)}
                >
                  {blog.likes?.includes(userId) ? (
                    <GoHeartFill size={18} />
                  ) : (
                    <GoHeart size={18} />
                  )}
                  {blog.likeNo ?? 0}
                </button>
                <button
                  type="button"
                  aria-pressed={!!blog.dislikes?.includes(userId)}
                  aria-label={
                    blog.dislikes?.includes(userId)
                      ? "Remove dislike"
                      : "Dislike blog"
                  }
                  className={`${storyAction} ${blog.dislikes?.includes(userId) ? feedActionActive : ""}`}
                  onClick={() => onDislike(blog)}
                >
                  <GoThumbsdown size={18} />
                  {blog.dislikeNo ?? 0}
                </button>
                <span className={profileBlogStat}>
                  <GoComment size={18} /> {blog.review?.length ?? 0}
                </span>
                <Popconfirm
                  title="Delete this blog?"
                  description="This cannot be undone."
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => onDelete(blog.blogId)}
                >
                  <button type="button" className={`${profileDelete} ml-auto`}>
                    <GoTrash size={16} /> Delete
                  </button>
                </Popconfirm>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
