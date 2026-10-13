"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input, Spin } from "antd";
import { GoTrash } from "react-icons/go";
import { feedComment, feedComments } from "#/styles/feed";
import { storyAuthorLink, storyMeta } from "#/styles/home";
import {
  canDeleteReview,
  getAuthorName,
  getUserProfileLink,
} from "#/utils/feed";
import { commentPlaceholder } from "#/utils/placeholder";

type Props = {
  blog: any;
  userId: string;
  loading: boolean;
  onSubmit: (review: string) => Promise<boolean | undefined>;
  onDelete: (reviewId: string) => void;
};

export const FeedComments: React.FC<Props> = ({
  blog,
  userId,
  loading,
  onSubmit,
  onDelete,
}) => {
  const [value, setValue] = useState("");

  const reviews = blog?.review ?? [];

  const onPressEnter = async () => {
    if (!value.trim()) return;

    const isCreated = await onSubmit(value.trim());
    if (isCreated) {
      setValue("");
    }
  };

  return (
    <div className={feedComments}>
      {reviews.length === 0 && (
        <p className={storyMeta}>No comments yet. Start the conversation.</p>
      )}

      {reviews.map((review: any) => (
        <div key={review.reviewId} className={feedComment}>
          <p>
            <Link href={getUserProfileLink(review.author)}>
              <span className={storyAuthorLink}>
                {getAuthorName(review.authorDetails)}
              </span>
            </Link>{" "}
            {review.review}
          </p>
          {canDeleteReview(blog, review, userId) && (
            <button
              type="button"
              aria-label="Delete comment"
              className="text-grey-100 cursor-pointer hover:text-red transition duration-300"
              onClick={() => onDelete(review.reviewId)}
            >
              <GoTrash size={16} />
            </button>
          )}
        </div>
      ))}

      <Input
        value={value}
        placeholder={commentPlaceholder}
        className="!h-11 text-sm"
        suffix={loading ? <Spin size="small" /> : <span />}
        disabled={loading}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={onPressEnter}
      />
    </div>
  );
};
