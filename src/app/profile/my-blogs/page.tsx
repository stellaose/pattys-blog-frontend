"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileBlogs } from "#components/elements";
import { useBlog, useGetMyBlogs } from "#/hooks";
import { useAppSelector } from "#store/hook";

const MyBlogs = () => {
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

  const { blogs, isLoading } = useGetMyBlogs(isLoggedIn);
  const { onDeleteBlog } = useBlog();

  return (
    <>
      <ProfileLayout>
        <ProfileBlogs
          blogs={blogs}
          isLoading={isLoading}
          onDelete={onDeleteBlog}
        />
      </ProfileLayout>
    </>
  );
};

export default MyBlogs;
