"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileBlogs } from "#components/elements";
import { useBlog, useGetMyBlogs } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { getNextLikeStatus } from "#/utils/feed";

const MyBlogs = () => {
  const state = useAppSelector((state) => state.app);

  const { blogs, isLoading } = useGetMyBlogs(state.isLoggedIn);
  const { onDeleteBlog, onLikeDislikeBlog } = useBlog();

  return (
    <>
      <ProfileLayout>
        <ProfileBlogs
          blogs={blogs}
          userId={state.userId}
          isLoading={isLoading}
          onLike={(blog) =>
            onLikeDislikeBlog(
              blog.blogId,
              getNextLikeStatus(blog, state.userId, "like"),
            )
          }
          onDislike={(blog) =>
            onLikeDislikeBlog(
              blog.blogId,
              getNextLikeStatus(blog, state.userId, "dislike"),
            )
          }
          onDelete={onDeleteBlog}
        />
      </ProfileLayout>
    </>
  );
};

export default MyBlogs;
