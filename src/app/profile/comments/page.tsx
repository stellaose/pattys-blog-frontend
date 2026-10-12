"use client";
import React from "react";
import { ProfileLayout } from "#components/layouts";
import { ProfileComments } from "#components/elements";
import { useGetBlogs, useGetMyBlogs, useReview } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { getReceivedComments, getWrittenComments } from "#/utils/profile";

const Comments = () => {
  const state = useAppSelector((state) => state.app);

  const { blogs: myBlogs, isLoading } = useGetMyBlogs(state.isLoggedIn);
  const { blogs: allBlogs, isLoading: isLoadingAll } = useGetBlogs(
    state.isLoggedIn,
    { limit: 100 },
  );
  const { onDeleteReview } = useReview();

  return (
    <>
      <ProfileLayout>
        <ProfileComments
          received={getReceivedComments(myBlogs, state.userId)}
          written={getWrittenComments(allBlogs, state.userId)}
          isLoading={isLoading || isLoadingAll}
          onDelete={onDeleteReview}
        />
      </ProfileLayout>
    </>
  );
};

export default Comments;
