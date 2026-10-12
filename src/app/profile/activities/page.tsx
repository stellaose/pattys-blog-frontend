"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileActivities } from "#components/elements";
import { useGetBlogs, useGetMyBlogs } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { getActivities } from "#/utils/profile";

const Activities = () => {
  const state = useAppSelector((state) => state.app);

  const { blogs: myBlogs, isLoading } = useGetMyBlogs(state.isLoggedIn);
  const { blogs: allBlogs, isLoading: isLoadingAll } = useGetBlogs(
    state.isLoggedIn,
    { limit: 100 },
  );

  return (
    <>
      <ProfileLayout>
        <ProfileActivities
          activities={getActivities(myBlogs, allBlogs, state.userId)}
          isLoading={isLoading || isLoadingAll}
        />
      </ProfileLayout>
    </>
  );
};

export default Activities;
