import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { AuthImg } from "#/assets/svg";
import {
  eyebrow,
  highlightRow,
  highlightText,
  highlightTitle,
  primaryLink,
  sectionText,
  sectionTitle,
} from "#/styles/home";
import {
  aboutCard,
  aboutCardNumber,
  aboutCardTitle,
  aboutCards,
  aboutGrid,
  aboutLead,
} from "#/styles/info";
import { highlights } from "#/utils/home";
import { aboutSteps, aboutStory } from "#/utils/info";

export const AboutContent: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  return (
    <>
      <div className={aboutGrid}>
        <div>
          <p className={eyebrow}>our story</p>
          <h2 className={`${sectionTitle} mb-5`}>
            Ideas flow<span className="text-purple-200">.</span> Minds{" "}
            <span className="text-purple-200">grow.</span>
          </h2>
          {aboutStory.map((paragraph) => (
            <p key={paragraph} className={aboutLead}>
              {paragraph}
            </p>
          ))}
          <Link
            href={isLoggedIn ? "/dashboard" : "/auth/signup"}
            className="inline-block mt-2"
          >
            <span className={primaryLink}>
              {isLoggedIn ? "Go to dashboard" : "Join Pattys"}{" "}
              <GoArrowRight size={16} />
            </span>
          </Link>
        </div>
        <Image
          src={AuthImg}
          alt=""
          loading="eager"
          className="w-full max-w-[600px] h-auto 2lg:ml-auto"
        />
      </div>

      <div className={`${highlightRow} mt-12`}>
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

      <div className="pt-16">
        <p className={eyebrow}>how it works</p>
        <h2 className={`${sectionTitle} mb-8`}>
          Four steps to your first blog
        </h2>
        <div className={aboutCards}>
          {aboutSteps.map((step, index) => (
            <div key={step.title} className={aboutCard}>
              <span className={aboutCardNumber}>{index + 1}</span>
              <p className={aboutCardTitle}>{step.title}</p>
              <p className={`${sectionText} !text-sm`}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
