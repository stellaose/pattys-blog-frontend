"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { AuthImg } from "#/assets/svg";
import {
  container,
  eyebrow,
  heroCard,
  heroSection,
  heroTitle,
  outlineLink,
  primaryLink,
  sectionText,
  storyMeta,
} from "#/styles/home";
import { featuredStory } from "#/utils/home";

export const Hero: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`${container} ${heroSection}`}>
      <motion.div
        className="2lg:w-1/2 w-full flex flex-col gap-6"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.26, 1, 0.4, 1] }}
      >
        <p className={eyebrow}>The Pattys journal</p>
        <h1 className={heroTitle}>
          Stories worth
          <br />
          your <span className="text-purple-200">time.</span>
        </h1>
        <p className={`${sectionText} max-w-[440px]`}>
          Pattys is a community where we read, share and grow through ideas that
          matter. Follow the categories you love, like what moves you and join
          the conversation in the comments.
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          <Link href="/#stories">
            <span className={primaryLink}>
              Start reading <GoArrowRight size={16} />
            </span>
          </Link>
          <Link href={isLoggedIn ? "/dashboard" : "/auth/signup"}>
            <span className={outlineLink}>
              {isLoggedIn ? "Go to dashboard" : "Write a story"}
            </span>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="2lg:w-1/2 w-full relative flex justify-end"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          delay: shouldReduceMotion ? 0 : 0.2,
          ease: [0.26, 1, 0.4, 1],
        }}
      >
        <Image
          src={AuthImg}
          alt=""
          loading="eager"
          className="w-full max-w-[630px] h-auto"
        />
        <div className={heroCard}>
          <p className={eyebrow}>Editor&apos;s pick</p>
          <p className="text-base font-lora font-bold text-black-200 mt-1.5 leading-snug">
            {featuredStory.title}
          </p>
          <p className={`${storyMeta} mt-2`}>
            {featuredStory.author} · {featuredStory.likes} likes ·{" "}
            {featuredStory.comments} comments
          </p>
        </div>
      </motion.div>
    </section>
  );
};
