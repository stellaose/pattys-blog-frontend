"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileLikes } from "#components/elements";
import { useGetBlogs } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { getLikedBlogs } from "#/utils/profile";

const Likes = () => {
  const state = useAppSelector((state) => state.app);

  const { blogs, isLoading } = useGetBlogs(state.isLoggedIn, { limit: 100 });

  return (
    <>
      <ProfileLayout>
        <ProfileLikes
          blogs={getLikedBlogs(blogs, state.userId)}
          isLoading={isLoading}
        />
      </ProfileLayout>
    </>
  );
};

export default Likes;
