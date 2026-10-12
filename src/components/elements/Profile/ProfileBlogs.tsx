import React from "react";
import { Popconfirm, Skeleton } from "antd";
import { GoComment, GoHeart, GoThumbsdown, GoTrash } from "react-icons/go";
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
import { eyebrow, sectionText, storyMeta, storyTag } from "#/styles/home";
import { formatBlogDate, getBlogExcerpt } from "#/utils/feed";
import { CreateBlog } from "../Feed/CreateBlog";
import { ProfileEmpty } from "./ProfileEmpty";

type Props = {
  blogs: any[];
  isLoading: boolean;
  onDelete: (blogId: string) => void;
};

export const ProfileBlogs: React.FC<Props> = ({
  blogs,
  isLoading,
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
        <div className={profileGrid}>
          {[1, 2].map((item) => (
            <div key={item} className={profilePanel}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
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
                <span className={profileBlogStat}>
                  <GoHeart size={18} /> {blog.likeNo ?? 0}
                </span>
                <span className={profileBlogStat}>
                  <GoThumbsdown size={18} /> {blog.dislikeNo ?? 0}
                </span>
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
