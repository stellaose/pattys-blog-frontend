"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
  image: StaticImageData;
}> = ({ children, image }) => {
  return (
    <>
      <div className="flex 2lg:items-start">
        <div className="w-[50vw] h-[100vh] overflow-hidden max-2lg:hidden block">
          <Image src={image} alt="" className="w-full h-full" loading="eager" />
        </div>
        <div className="2lg:w-[50vw] w-full max-2lg:py-20 h-[100vh]  overflow-auto">{children}</div>
      </div>
    </>
  );
};
