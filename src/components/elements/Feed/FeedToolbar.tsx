"use client";
import React, { useState } from "react";
import { Input } from "antd";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import {
  categoryChip,
  categoryChipActive,
  categoryChipIdle,
} from "#/styles/home";
import {
  feedCategoryInput,
  feedSort,
  feedSortActive,
  feedSortIdle,
  feedToolbar,
} from "#/styles/feed";
import { feedCategories, feedSortOptions } from "#/utils/feed";
import {
  customCategoryPlaceholder,
  searchBlogPlaceholder,
} from "#/utils/placeholder";

type Props = {
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSearch: (keyword: string) => void;
};

export const FeedToolbar: React.FC<Props> = ({
  category,
  sort,
  onCategoryChange,
  onSortChange,
  onSearch,
}) => {
  const [customCategory, setCustomCategory] = useState("");

  const isCustomCategory = !feedCategories.includes(category);

  return (
    <div className={feedToolbar}>
      <div className="flex sm:flex-row flex-col sm:items-center gap-4">
        <Input
          allowClear
          placeholder={searchBlogPlaceholder}
          prefix={<IoSearchOutline size={20} color="#77767D" />}
          className="!h-12.5 text-base"
          onPressEnter={(e) => onSearch(e.currentTarget.value)}
          onChange={(e) => {
            if (!e.target.value) onSearch("");
          }}
        />
        <div className="flex items-center gap-4 shrink-0">
          {feedSortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={sort === option.value}
              className={`${feedSort} ${sort === option.value ? feedSortActive : feedSortIdle}`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {feedCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={`${categoryChip} ${category === item ? categoryChipActive : categoryChipIdle}`}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
        {isCustomCategory && (
          <button
            type="button"
            aria-pressed
            aria-label={`Remove ${category} filter`}
            className={`${categoryChip} ${categoryChipActive} gap-1.5`}
            onClick={() => onCategoryChange("All")}
          >
            {category} <IoCloseOutline size={16} />
          </button>
        )}
        <Input
          value={customCategory}
          placeholder={customCategoryPlaceholder}
          className={feedCategoryInput}
          onChange={(e) => setCustomCategory(e.target.value)}
          onPressEnter={() => {
            if (!customCategory.trim()) return;
            onCategoryChange(customCategory.trim());
            setCustomCategory("");
          }}
        />
      </div>
    </div>
  );
};
