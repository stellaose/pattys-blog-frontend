import React from "react";
import { feedEmpty } from "#/styles/feed";
import { sectionText } from "#/styles/home";
import { CreateBlog } from "./CreateBlog";

export const FeedEmpty: React.FC<{ isFiltered: boolean }> = ({
  isFiltered,
}) => {
  return (
    <div className={feedEmpty}>
      <h3 className="text-24 font-lora font-bold text-black-200">
        {isFiltered ? "Nothing matches that yet" : "Your feed is quiet"}
      </h3>
      <p className={`${sectionText} max-w-[380px]`}>
        {isFiltered
          ? "Try another category or clear your search to see more blogs."
          : "No one has published a blog yet. Be the first to share your voice."}
      </p>
      {!isFiltered && (
        <div className="mt-2">
          <CreateBlog />
        </div>
      )}
    </div>
  );
};
