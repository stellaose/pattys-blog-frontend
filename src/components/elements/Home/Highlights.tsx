import React from "react";
import Image from "next/image";
import {
  container,
  highlightRow,
  highlightText,
  highlightTitle,
} from "#/styles/home";
import { highlights } from "#/utils/home";

export const Highlights = () => {
  return (
    <section className={container}>
      <div className={highlightRow}>
        {highlights.map((highlight) => (
          <div key={highlight.title} className="flex items-center gap-x-5">
            <Image
              src={highlight.icon}
              alt=""
              loading="eager"
              className="h-13 w-13 shrink-0"
            />
            <div className="flex flex-col gap-1.5 max-w-[300px]">
              <p className={highlightTitle}>{highlight.title}</p>
              <p className={highlightText}>{highlight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
