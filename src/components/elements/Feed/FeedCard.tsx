import React from "react";
import Link from "next/link";
import {
  GoChevronDown,
  GoChevronUp,
  GoComment,
  GoHeart,
  GoHeartFill,
  GoThumbsdown,
} from "react-icons/go";
import {
  feedActionActive,
  feedActionLiked,
  feedActions,
  feedCard,
  feedCardText,
  feedCardTitle,
  feedCommentsToggle,
} from "#/styles/feed";
import {
  storyAction,
  storyAuthor,
  storyAuthorLink,
  storyAvatar,
  storyMeta,
  storyTag,
} from "#/styles/home";
import {
  formatBlogDate,
  getAuthorName,
  getBlogExcerpt,
  getUserProfileLink,
} from "#/utils/feed";
import { getInitials } from "#/utils/helper";

type Props = {
  blog: any;
  userId: string;
  isCommentsOpen: boolean;
  onLike: () => void;
  onDislike: () => void;
  onToggleComments: () => void;
  children?: React.ReactNode;
};

export const FeedCard: React.FC<Props> = ({
  blog,
  userId,
  isCommentsOpen,
  onLike,
  onDislike,
  onToggleComments,
  children,
}) => {
  const author = blog?.authorDetails;
  const authorName = getAuthorName(author);
  const commentCount = blog?.review?.length ?? 0;
  const isLiked = blog?.likes?.includes(userId);
  const isDisliked = blog?.dislikes?.includes(userId);

  return (
    <article className={feedCard}>
      <div className="flex items-center justify-between gap-4">
        <div className={storyAuthor}>
          <span className={`${storyAvatar} uppercase`}>
            {getInitials(author?.first_name, author?.last_name) || "P"}
          </span>
          <p className={storyMeta}>
            <Link href={getUserProfileLink(blog?.author)}>
              <span className={storyAuthorLink}>{authorName}</span>
            </Link>
            <br />
            {formatBlogDate(blog?.createdAt)}
          </p>
        </div>
        {blog?.category && <p className={storyTag}>{blog.category}</p>}
      </div>

      <h3 className={feedCardTitle}>{blog?.title}</h3>
      <p className={feedCardText}>{getBlogExcerpt(blog?.description)}</p>

      <div className={feedActions}>
        <button
          type="button"
          aria-pressed={!!isLiked}
          aria-label={isLiked ? "Remove like" : "Like blog"}
          className={`${storyAction} ${isLiked ? feedActionLiked : ""}`}
          onClick={onLike}
        >
          {isLiked ? <GoHeartFill size={18} /> : <GoHeart size={18} />}
          {blog?.likeNo ?? 0}
        </button>
        <button
          type="button"
          aria-pressed={!!isDisliked}
          aria-label={isDisliked ? "Remove dislike" : "Dislike blog"}
          className={`${storyAction} ${isDisliked ? feedActionActive : ""}`}
          onClick={onDislike}
        >
          <GoThumbsdown size={18} />
          {blog?.dislikeNo ?? 0}
        </button>
        <button
          type="button"
          aria-expanded={isCommentsOpen}
          className={`${storyAction} ${isCommentsOpen ? feedActionActive : ""}`}
          onClick={onToggleComments}
        >
          <GoComment size={18} />
          {commentCount} <span className="font-normal">comments</span>
        </button>
      </div>

      <button
        type="button"
        aria-expanded={isCommentsOpen}
        className={feedCommentsToggle}
        onClick={onToggleComments}
      >
        {isCommentsOpen ? "Hide comments" : `Show comments (${commentCount})`}
        {isCommentsOpen ? (
          <GoChevronUp size={16} />
        ) : (
          <GoChevronDown size={16} />
        )}
      </button>

      {isCommentsOpen && children}
    </article>
  );
};
