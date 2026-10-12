import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "#assets/images/logo.png";
import { usePathname } from "next/navigation";
import { LinkedIn, Instagram, X } from "#assets/svg";
import {
  footerBody,
  footerColumnTitle,
  footerLink,
  footerSocial,
  footerTagline,
  sectionText,
} from "#/styles/home";
import { footerLinks } from "#/utils/home";

const socials = [
  { label: "X", href: "https://www.x.com/pattys/", icon: X },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pattys/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/patty's/",
    icon: LinkedIn,
  },
];

export const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-white-100 pt-20">
        <footer className={footerBody}>
          <div className="w-full max-w-[1380px] mx-auto">
            <div className="flex lg:flex-row flex-col justify-between gap-12">
              <div className="flex flex-col gap-4 max-w-[340px]">
                <Image
                  src={Logo}
                  alt="Pattys"
                  className="h-12.5 w-auto self-start"
                  loading="eager"
                />
                <p className={footerTagline}>
                  Ideas flow<span className="text-purple-200">.</span> Minds{" "}
                  <span className="text-purple-200">grow.</span>
                </p>
                <p className={`${sectionText} !text-sm`}>
                  A community where we read, share and grow through ideas that
                  matter.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-2 gap-x-16 gap-y-10">
                {footerLinks.map((column) => (
                  <div key={column.title} className="flex flex-col gap-3">
                    <p className={footerColumnTitle}>{column.title}</p>
                    {column.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span
                          className={`${footerLink} ${pathname === link.href ? "underline !text-black-200" : ""}`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 pt-6 border-t border-white-150 flex sm:flex-row flex-col-reverse sm:items-center justify-between gap-5">
              <p className="text-13 text-grey-100 font-arial">
                Stella Ose Inc © 2026. All rights reserved.
              </p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={footerSocial}
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      className="h-4 w-auto"
                      loading="eager"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
