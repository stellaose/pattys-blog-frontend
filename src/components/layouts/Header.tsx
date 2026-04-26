import React from "react";
import Image from "next/image";
import Logo from "#assets/images/logo.png";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <div className="bg-white-100 rounded-xl shadow-md px-[30px] py-[9px] fixed left-0 right-0 top-[70px] w-full max-w-[1380px] mx-auto border border-black/11">
        <div className="flex justify-between items-center">
          <Image src={Logo} alt="" className="h-[50px] w-auto" />

          <div className="flex gap-x-8">
            <Link href="about-us">
              <p className="font-medium text-black">About us</p>
            </Link>
            <Link href="privacy-policy">
              <p className="font-medium text-black">Privacy Policy</p>
            </Link>
            <Link href="terms-and-conditions">
              <p className="font-medium text-black">Terms & conditions</p>
            </Link>
            <Link href="contact-us">
              <p className="font-medium text-black">Contact us</p>
            </Link>
          </div>

          <div className="flex items-center gap-x-4">
            <Link href="/signup">
              <span className="border border-orange text-white-100 bg-orange py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-orange hover:bg-transparent font-semibold">
                Sign up
              </span>
            </Link>
            <Link href="/login">
              <span className="border border-lemon bg-lemon text-black py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-lemon hover:bg-transparent font-semibold">
                Log in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
