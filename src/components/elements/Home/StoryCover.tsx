import React from "react";
import Image from "next/image";
import { Story, StoryTone } from "#/utils/home";

const tones: Record<StoryTone, string> = {
  lilac: "bg-lilac-100",
  pink: "bg-pink-100",
  blue: "bg-blue-50",
  cream: "bg-pink-200",
};

export const StoryCover: React.FC<{ story: Story; className: string }> = ({
  story,
  className,
}) => {
  return (
    <div className={`${className} ${tones[story.tone]}`}>
      {story.image ? (
        <Image
          src={story.image}
          alt=""
          fill
          sizes="(max-width: 1080px) 100vw, 690px"
          className="object-cover transition transform duration-500 group-hover:scale-105"
        />
      ) : (
        <p className="absolute -bottom-3 left-5 text-56 font-lora font-bold italic text-purple-200/20 whitespace-nowrap">
          {story.category}.
        </p>
      )}
    </div>
  );
};
