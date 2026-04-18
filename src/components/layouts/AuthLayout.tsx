'use client'
import React from "react";
import Image, { StaticImageData } from "next/image";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
  image:  StaticImageData;
}> = ({ children, image }) => {
  return (
    <>
      <div className="flex items-start">
        <div className="w-[50vw] h-[100vh] overflow-hidden">
          <Image src={image} alt="" className="w-full h-full" />
        </div>
        <div className="min-w-[50vw] bg-white-100 overflow-auto">{children}</div>
      </div>
    </>
  );
};
