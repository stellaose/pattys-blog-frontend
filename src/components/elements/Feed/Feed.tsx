"use client";
import React, { useState } from "react";
import { Pagination, SkeletonLoader } from "#components/general";
import { useAppSelector } from "#store/hook";
import { useGetBlogs } from "#/hooks";
import { feedCard, feedStack } from "#/styles/feed";
import { storyMeta } from "#/styles/home";
import { feedPageSize, feedSortOptions } from "#/utils/feed";
import { FeedEmpty } from "./FeedEmpty";
import { FeedList } from "./FeedList";
import { FeedToolbar } from "./FeedToolbar";

export const Feed = () => {
  const state = useAppSelector((state) => state.app);

  const [category, setCategory] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(feedSortOptions[0].value);
  const [page, setPage] = useState(1);

  const { blogs, pagination, isLoading } = useGetBlogs(state.isLoggedIn, {
    category: category === "All" ? undefined : category.toLowerCase(),
    keyword: keyword || undefined,
    sort,
    page,
    limit: feedPageSize,
  });

  const isFiltered = category !== "All" || !!keyword;

  return (
    <div>
      <FeedToolbar
        category={category}
        sort={sort}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
        onSearch={(value) => {
          setKeyword(value);
          setPage(1);
        }}
      />

      {isLoading ? (
        <SkeletonLoader
          count={3}
          avatar
          className={feedCard}
          wrapperClassName={feedStack}
        />
      ) : blogs.length === 0 ? (
        <FeedEmpty isFiltered={isFiltered} />
      ) : (
        <FeedList blogs={blogs} userId={state.userId} />
      )}

      {!isLoading && pagination?.totalBlogs > 0 && (
        <p className={`${storyMeta} mt-6`}>
          Showing {blogs.length} of {pagination.totalBlogs} blogs
        </p>
      )}

      <Pagination
        current={page}
        total={pagination?.totalBlogs ?? 0}
        pageSize={feedPageSize}
        onChange={setPage}
      />
    </div>
  );
};
