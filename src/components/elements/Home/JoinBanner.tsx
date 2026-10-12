import React from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { container, joinBanner, joinBannerLink } from "#/styles/home";

export const JoinBanner = () => {
  return (
    <section className={container}>
      <div className={joinBanner}>
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="relative flex flex-col gap-3 max-w-[560px]">
          <p className="text-xs text-lilac-200 font-bold uppercase font-arial">
            join pattys
          </p>
          <h2 className="text-32 sm:text-42 font-lora font-bold text-white leading-tight">
            Share your voice with the{" "}
            <span className="text-purple-100">world.</span>
          </h2>
          <p className="text-next text-white-300 font-arial">
            Create a free account to follow writers you love, join the
            conversation and publish your own stories.
          </p>
        </div>
        <Link
          href="/auth/signup"
          className="relative shrink-0 self-start 2lg:self-auto"
        >
          <span className={joinBannerLink}>
            Create account <GoArrowRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
};
