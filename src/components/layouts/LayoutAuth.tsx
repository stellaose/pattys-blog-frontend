import React from "react";
import { Logo } from "#assets/images";
import Image from "next/image";

export const LayoutAuth: React.FC<{
  description: string;
  children: React.ReactNode;
}> = ({ children, description }) => {
  return (
    <>
      <div className="xl:pt-[185px] 2lg:pt-[140px] lg:pt-[120px] md:pt-[100px] sm:pt-[80px] pt-[60px] max-w-[720px] mx-auto w-full">
        <div className="shadow-mmd border border-black/5 rounded-lg pt-5 pb-16">
          <div>
            <Image src={Logo} alt="" loading="eager" className="h-[50px] w-auto mx-auto" />
          
            <p className="text-center mt-10 text-black text-18">{description}</p>
            
            <div className="mt-20">
              {children}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
