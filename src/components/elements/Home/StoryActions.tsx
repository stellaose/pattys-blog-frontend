"use client";
import React, { useState } from "react";
import { GoComment, GoHeart, GoHeartFill } from "react-icons/go";
import {
  storyAction,
  storyActionActive,
  storyActions,
  storyAuthor,
  storyAvatar,
  storyMeta,
} from "#/styles/home";
import { Story } from "#/utils/home";

export const StoryAuthor: React.FC<{ story: Story }> = ({ story }) => {
  const initials = story.author
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return (
    <div className={storyAuthor}>
      <span className={storyAvatar}>{initials}</span>
      <p className={storyMeta}>
        <span className="font-bold text-black-200">{story.author}</span>
        <br />
        {story.date} · {story.readTime}
      </p>
    </div>
  );
};

export const StoryActions: React.FC<{ story: Story }> = ({ story }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={storyActions}>
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike story" : "Like story"}
        className={`${storyAction} ${liked ? storyActionActive : ""}`}
        onClick={() => setLiked(!liked)}
      >
        {liked ? <GoHeartFill size={18} /> : <GoHeart size={18} />}
        {story.likes + (liked ? 1 : 0)}
      </button>
      <span className={`${storyAction} !cursor-default`}>
        <GoComment size={18} />
        {story.comments} <span className="font-normal">comments</span>
      </span>
    </div>
  );
};
