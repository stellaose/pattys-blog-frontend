"use client";
import React from "react";
import Image from "next/image";
import Logo from "#assets/images/logo.png";
import {
  authFixedBottom,
  authFixedBottomOne,
  authFixedBottomTextOne,
  authFixedBottomTextTwo,
  authForm,
  authHeroText,
  authHeroTitle,
  authLayoutMainBody,
} from "#/styles/auth";
import { AuthImg, Discover, Connect, Contribute } from "#/assets/svg";
import { motion, useReducedMotion } from "framer-motion";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.26, 1, 0.4, 1] }}
        className={authLayoutMainBody}
      >
        <Image
          src={Logo}
          alt="Logo"
          className="w-[165px]  pt-6.5"
          loading="eager"
        />
        <div className="flex">
          <div className="w-[50vw]  overflow-hidden max-2lg:hidden block pt-20.5 pb-4">
            <div className="max-w-[357px] flex flex-col gap-1">
              <h1 className={`${authHeroTitle}  -mb-9`}>
                Ideas flow<span className="text-purple-200">. </span>
              </h1>
              <h1 className={authHeroTitle}>
                Minds <span className="text-purple-200">grow.</span>
              </h1>
              <div className="mt-6.5 flex flex-col">
                <p className={authHeroText}>Pattys is a community</p>
                <p className={authHeroText}>
                  where we read, share and grow through ideas
                </p>
                <p className={authHeroText}>that matter</p>
              </div>
            </div>
            <Image
              src={AuthImg}
              alt="auth img"
              loading="eager"
              className="-mt-16 max-w-[580px]  xxl:max-w-[630px]"
            />

            <div className="flex max-w-[535px] justify-between mt-10">
              <div className={authFixedBottom}>
                <Image src={Discover} alt="discover" loading="eager" />
                <div className={authFixedBottomOne}>
                  <p className={authFixedBottomTextOne}>Discover</p>
                  <div className="flex flex-col gap-0.5">
                    <p className={authFixedBottomTextTwo}>Curated stories </p>{" "}
                    <p className={authFixedBottomTextTwo}>that inspire</p>
                  </div>
                </div>
              </div>
              <div className={authFixedBottom}>
                <Image src={Connect} alt="connect" loading="eager" />
                <div className={authFixedBottomOne}>
                  <p className={authFixedBottomTextOne}>Connect</p>
                  <div className="flex flex-col gap-0.5">
                    <p className={authFixedBottomTextTwo}>
                      Join conversations{" "}
                    </p>{" "}
                    <p className={authFixedBottomTextTwo}>that matter</p>
                  </div>
                </div>
              </div>
              <div className={authFixedBottom}>
                <Image src={Contribute} alt="contribute" loading="eager" />
                <div className={authFixedBottomOne}>
                  <p className={authFixedBottomTextOne}>Discover</p>
                  <div className="flex flex-col gap-0.5">
                    <p className={authFixedBottomTextTwo}>Share your voice</p>{" "}
                    <p className={authFixedBottomTextTwo}>with the world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={authForm}>
            <motion.div
              className="overflow-auto h-9/10 "
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : 0.25,
                ease: [0.26, 1, 0.4, 1],
              }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
