import React from "react";
import Image from "next/image";
import Logo from "#assets/images/logo.png";
import Link from "next/link";
import { Avatar, DropDownImg, Logout } from "#assets/svg";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  user: any;
  isLoggedIn: boolean;
  onLogout: () => void;
};
export const Header: React.FC<Props> = ({ user, isLoggedIn, onLogout }) => {
  const router = useRouter();
  return (
    <>
      <div className="bg-white-100 rounded-xl shadow-md px-[30px] py-[9px] fixed left-0 right-0 top-[70px] w-full max-w-[1380px] mx-auto border border-black/11">
        <div className="flex justify-between items-center">
          <Image src={Logo} alt="" className="h-12.5 w-auto" loading="eager" />

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

          {isLoggedIn ? (
            <div className="flex items-center gap-x-4.75">
              <Image
                src={Avatar}
                alt=""
                className="h-10 w-auto"
                loading="eager"
              />
              <div className="cursor-pointer">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <p
                            className="font-medium text-black py-1.25 px-1"
                            onClick={() => router.push("/profile/settings")}
                          >
                            Profile Settings
                          </p>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <p
                            className="font-medium text-black py-1.25 px-1"
                            onClick={() => router.push("/profile/my-blogs")}
                          >
                            My Blogs
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
                <span className="border border-orange text-white-100 bg-orange py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-orange hover:bg-transparent font-semibold">
                  Sign up
                </span>
              </Link>
              <Link href="/auth/login">
                <span className="border border-lemon bg-lemon text-black py-[13px] px-6 rounded-lg cursor-pointer hover:scale-105 transition transform duration-300 hover:text-lemon hover:bg-transparent font-semibold">
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
