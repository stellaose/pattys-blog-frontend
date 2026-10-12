import React from "react";
import {
  sectionText,
  storyCard,
  storyCover,
  storyTag,
  storyTitle,
} from "#/styles/home";
import { Story } from "#/utils/home";
import { StoryActions, StoryAuthor } from "./StoryActions";
import { StoryCover } from "./StoryCover";

export const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <article className={storyCard}>
      <StoryCover story={story} className={storyCover} />
      <div className="flex flex-col gap-3 p-6 grow">
        <p className={storyTag}>{story.category}</p>
        <h3 className={storyTitle}>{story.title}</h3>
        <p className={`${sectionText} !text-sm`}>{story.excerpt}</p>
        <div className="pt-2">
          <StoryAuthor story={story} />
        </div>
        <StoryActions story={story} />
      </div>
    </article>
  );
};
