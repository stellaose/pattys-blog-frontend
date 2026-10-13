import React from "react";
import Image from "next/image";
import Logo from "#assets/images/logo.png";
import Link from "next/link";
import { DropDownImg, Logout } from "#assets/svg";
import { navAvatar } from "#/styles/profile";
import { getInitials } from "#/utils/helper";
import { Dropdown } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { GoComment, GoHeart, GoHome, GoPencil } from "react-icons/go";

const userLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <GoHome size={18} /> },
  {
    label: "My Blogs",
    href: "/profile/my-blogs",
    icon: <GoPencil size={18} />,
  },
  { label: "Likes", href: "/profile/likes", icon: <GoHeart size={18} /> },
  {
    label: "Comments",
    href: "/profile/comments",
    icon: <GoComment size={18} />,
  },
];

type Props = {
  user: any;
  isLoggedIn: boolean;
  onLogout: () => void;
};
export const Header: React.FC<Props> = ({ user, isLoggedIn, onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="rounded-xl shadow-md px-[30px] max-sm:px-4 py-[9px] fixed z-50 left-0 right-0 top-6 w-full max-w-[1380px] mx-auto border border-black/11 bg-white backdrop-blur">
        <div className="flex justify-between items-center">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="shrink-0">
            <Image
              src={Logo}
              alt="Pattys"
              className="h-12.5 max-sm:h-9 w-auto"
              loading="eager"
            />
          </Link>

          {isLoggedIn ? (
            <div className="flex gap-x-6 max-lg:hidden">
              {userLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <p
                    className={`font-medium flex items-center gap-1.5 ${pathname === link.href ? "text-purple-200" : "text-black"}`}
                  >
                    {link.icon} {link.label}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex gap-x-8 max-lg:hidden">
              <Link href="/about-us">
                <p className="font-medium text-black">About us</p>
              </Link>
              <Link href="/privacy-policy">
                <p className="font-medium text-black">Privacy Policy</p>
              </Link>
              <Link href="/terms-and-conditions">
                <p className="font-medium text-black">Terms & conditions</p>
              </Link>
              <Link href="/contact-us">
                <p className="font-medium text-black">Contact us</p>
              </Link>
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-x-4.75">
              <span className={navAvatar}>
                {getInitials(user?.first_name, user?.last_name)}
              </span>
              <div className="cursor-pointer">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <p
                            className="font-medium text-black py-1.25 px-1"
                            onClick={() => router.push("/profile")}
                          >
                            Profile
                          </p>
                        ),
                      },
                      {
                        key: "3",
                        label: (
                          <p
                            className="font-medium text-red flex items-center gap-1.25 px-1 py-1.25"
                            onClick={onLogout}
                          >
                            <Image
                              src={Logout}
                              alt=""
                              className="h-4 w-auto"
                              loading="eager"
                            />{" "}
                            Logout
                          </p>
                        ),
                      },
                    ],
                  }}
                >
                  <span className="flex items-center font-medium text-base text-black">
                    {user?.user_name}{" "}
                    <Image
                      src={DropDownImg}
                      alt=""
                      className="h-6 w-auto"
                      loading="eager"
                    />
                  </span>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link href="/auth/signup">
                <span className="border border-black-100 text-white bg-black-100 py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-black-100 hover:bg-transparent font-semibold inline-block whitespace-nowrap max-sm:px-4">
                  Sign up
                </span>
              </Link>
              <Link href="/auth/login">
                <span className="border border-black-100 text-black-100 py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-white hover:bg-black-100 font-semibold inline-block whitespace-nowrap max-sm:px-4">
                  Log in
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
