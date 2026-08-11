import React from "react";
import Image from "next/image";
import Logo from "#assets/images/logo.png";
import { useRouter, usePathname } from "next/navigation";
import { LinkedIn, Instagram, X } from "#assets/svg";

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="bg-orange-disabled pt-8 px-8 py-4  mt-20">
        <div className="flex items-start justify-between w-full max-w-[1380px] mx-auto ">
          <Image src={Logo} alt="" className="h-12.5 w-auto" loading="eager" />

          <div className="max-w-103.75 flex items-start justify-evenly w-full pt-4">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-lg mb-2">Resources</p>
              <p
                className={`hover:underline cursor-pointer ${pathname === "/about-us" && "underline"}`}
                onClick={() => router.push("/about-us")}
              >
                About us
              </p>
              <p
                className={`hover:underline cursor-pointer ${pathname === "/contact-us" && "underline"}`}
                onClick={() => router.push("/contact-us")}
              >
                Contact us
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-lg mb-2">Legal</p>
              <p
                className={`hover:underline cursor-pointer ${pathname === "/terms-and-conditions" && "underline"}`}
                onClick={() => router.push("/terms-and-conditions")}
              >
                Terms & conditions
              </p>
              <p
                className={`hover:underline cursor-pointer  ${pathname === "/privacy-policy" && "underline"}`}
                onClick={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-lg mb-2">Follow us</p>
            <div className="flex gap-6">
              <a
                href="https://www.x.com/pattys/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={X} alt="" className="h-6 w-auto" loading="eager" />
              </a>

              <a
                href="https://www.instagram.com/pattys/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={Instagram}
                  alt=""
                  className="h-6 w-auto"
                  loading="eager"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/patty's/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={LinkedIn}
                  alt=""
                  className="h-6 w-auto"
                  loading="eager"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-sm  mt-20 font-semibold">
          Stella Ose Inc © 2026
        </p>
      </div>
    </>
  );
};
