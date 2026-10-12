"use client";
import React, { useState } from "react";
import { Pagination, Skeleton } from "antd";
import { useAppSelector } from "#store/hook";
import { useBlog, useGetBlogs, useReview } from "#/hooks";
import { feedCard, feedStack } from "#/styles/feed";
import { storyMeta } from "#/styles/home";
import { feedPageSize, feedSortOptions } from "#/utils/feed";
import { FeedCard } from "./FeedCard";
import { FeedComments } from "./FeedComments";
import { FeedEmpty } from "./FeedEmpty";
import { FeedToolbar } from "./FeedToolbar";

export const Feed = () => {
  const state = useAppSelector((state) => state.app);

  const [category, setCategory] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(feedSortOptions[0].value);
  const [page, setPage] = useState(1);
  const [openBlogIds, setOpenBlogIds] = useState<string[]>([]);

  const { blogs, pagination, isLoading } = useGetBlogs(state.isLoggedIn, {
    category: category === "All" ? undefined : category,
    keyword: keyword || undefined,
    sort,
    page,
    limit: feedPageSize,
  });

  const { onLikeDislikeBlog } = useBlog();
  const { onCreateReview, onDeleteReview, postResponse } = useReview();

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

      <div className={feedStack}>
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className={feedCard}>
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </div>
          ))
        ) : blogs.length === 0 ? (
          <FeedEmpty isFiltered={isFiltered} />
        ) : (
          blogs.map((blog: any) => (
            <FeedCard
              key={blog.blogId}
              blog={blog}
              userId={state.userId}
              isCommentsOpen={openBlogIds.includes(blog.blogId)}
              onLike={() => onLikeDislikeBlog(blog.blogId, "like")}
              onDislike={() => onLikeDislikeBlog(blog.blogId, "dislike")}
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
                userId={state.userId}
                loading={postResponse.isLoading}
                onSubmit={(review) => onCreateReview(blog.blogId, review)}
                onDelete={onDeleteReview}
              />
            </FeedCard>
          ))
        )}
      </div>

      {!isLoading && pagination?.totalBlogs > 0 && (
        <p className={`${storyMeta} mt-6`}>
          Showing {blogs.length} of {pagination.totalBlogs} blogs
        </p>
      )}

      {(pagination?.totalPages ?? 1) > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            pageSize={feedPageSize}
            total={pagination?.totalBlogs}
            showSizeChanger={false}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};
