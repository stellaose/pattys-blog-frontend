"use client";
import React, { useState } from "react";
import {
  categoryChip,
  categoryCount,
  categoryChipActive,
  categoryChipIdle,
  container,
  eyebrow,
  featuredCard,
  featuredTitle,
  sectionText,
  sectionTitle,
  storyGrid,
  storyTag,
} from "#/styles/home";
import { featuredStory, stories, storyCategories } from "#/utils/home";
import { StoryActions, StoryAuthor } from "./StoryActions";
import { StoryCard } from "./StoryCard";
import { StoryCover } from "./StoryCover";

export const Stories = () => {
  const [category, setCategory] = useState("All");

  const filteredStories =
    category === "All"
      ? stories
      : stories.filter((story) => story.category === category);

  return (
    <section id="stories" className={`${container} py-20 scroll-mt-32`}>
      <div className="mb-8">
        <p className={eyebrow}>featured story</p>
        <h2 className={sectionTitle}>Fresh off the press</h2>
      </div>

      <article className={featuredCard}>
        <StoryCover
          story={featuredStory}
          className="relative min-h-[280px] 2lg:min-h-[420px] overflow-hidden"
        />
        <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
          <p className={storyTag}>{featuredStory.category}</p>
          <h3 className={featuredTitle}>{featuredStory.title}</h3>
          <p className={sectionText}>{featuredStory.excerpt}</p>
          <div className="pt-2 pb-2">
            <StoryAuthor story={featuredStory} />
          </div>
          <StoryActions story={featuredStory} />
        </div>
      </article>

      <div className="mt-20 mb-8 flex lg:flex-row flex-col lg:items-end justify-between gap-6">
        <div>
          <p className={eyebrow}>browse by category</p>
          <h2 className={sectionTitle}>Join the conversation</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {storyCategories.map((item) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={category === item.name}
              className={`${categoryChip} ${category === item.name ? categoryChipActive : categoryChipIdle}`}
              onClick={() => setCategory(item.name)}
            >
              {item.name}
              <span className={categoryCount}>{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={storyGrid}>
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};
