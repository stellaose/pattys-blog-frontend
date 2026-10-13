"use client";
import React, { useState } from "react";
import { useBlog, useReview } from "#/hooks";
import { feedStack } from "#/styles/feed";
import { getNextLikeStatus } from "#/utils/feed";
import { FeedCard } from "./FeedCard";
import { FeedComments } from "./FeedComments";

export const FeedList: React.FC<{ blogs: any[]; userId: string }> = ({
  blogs,
  userId,
}) => {
  const [openBlogIds, setOpenBlogIds] = useState<string[]>([]);

  const { onLikeDislikeBlog } = useBlog();
  const { onCreateReview, onDeleteReview, postResponse } = useReview();

  return (
    <div className={feedStack}>
      {blogs.map((blog: any) => (
        <FeedCard
          key={blog.blogId}
          blog={blog}
          userId={userId}
          isCommentsOpen={openBlogIds.includes(blog.blogId)}
          onLike={() =>
            onLikeDislikeBlog(
              blog.blogId,
              getNextLikeStatus(blog, userId, "like"),
            )
          }
          onDislike={() =>
            onLikeDislikeBlog(
              blog.blogId,
              getNextLikeStatus(blog, userId, "dislike"),
            )
          }
          onToggleComments={() =>
            setOpenBlogIds(
              openBlogIds.includes(blog.blogId)
                ? openBlogIds.filter((id) => id !== blog.blogId)
                : [...openBlogIds, blog.blogId],
            )
          }
        >
          <FeedComments
            blog={blog}
            userId={userId}
            loading={postResponse.isLoading}
            onSubmit={(review) => onCreateReview(blog.blogId, review)}
            onDelete={onDeleteReview}
          />
        </FeedCard>
      ))}
    </div>
  );
};
