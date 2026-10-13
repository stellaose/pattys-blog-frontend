import React from "react";
import Link from "next/link";
import { Skeleton } from "antd";
import { GoComment, GoTrash } from "react-icons/go";
import {
  profileDelete,
  profileGrid,
  profilePanel,
  profileRow,
  profileRowDetail,
  profileRowIcon,
  profileRowText,
  profileSection,
  profileSectionTitle,
} from "#/styles/profile";
import { eyebrow, storyAuthorLink, storyMeta } from "#/styles/home";
import { feedPanelTitle } from "#/styles/feed";
import { getUserProfileLink } from "#/utils/feed";
import { ProfileComment } from "#/utils/profile";

type Props = {
  received: ProfileComment[];
  written: ProfileComment[];
  isLoading: boolean;
  onDelete: (reviewId: string) => void;
};

const CommentList: React.FC<{
  comments: ProfileComment[];
  emptyText: string;
  onDelete?: (reviewId: string) => void;
}> = ({ comments, emptyText, onDelete }) => {
  if (comments.length === 0) {
    return <p className={storyMeta}>{emptyText}</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.reviewId} className={profileRow}>
          <span className={profileRowIcon}>
            <GoComment size={18} />
          </span>
          <div className="min-w-0 grow">
            <p className={profileRowText}>{comment.blogTitle}</p>
            <p className={profileRowDetail}>
              <Link href={getUserProfileLink(comment.author)}>
                <span className={storyAuthorLink}>{comment.authorName}</span>
              </Link>{" "}
              {comment.review}
            </p>
          </div>
          {onDelete && (
            <button
              type="button"
              aria-label="Delete comment"
              className={profileDelete}
              onClick={() => onDelete(comment.reviewId)}
            >
              <GoTrash size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export const ProfileComments: React.FC<Props> = ({
  received,
  written,
  isLoading,
  onDelete,
}) => {
  return (
    <section className={profileSection}>
      <div>
        <p className={eyebrow}>comments</p>
        <h2 className={profileSectionTitle}>The conversation so far</h2>
      </div>

      <div className={profileGrid}>
        <div className={profilePanel}>
          <p className={feedPanelTitle}>on your blogs ({received.length})</p>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <CommentList
              comments={received}
              emptyText="No one has commented on your blogs yet."
              onDelete={onDelete}
            />
          )}
        </div>
        <div className={profilePanel}>
          <p className={feedPanelTitle}>written by you ({written.length})</p>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <CommentList
              comments={written}
              emptyText="You have not commented on any blog yet."
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </section>
  );
};
