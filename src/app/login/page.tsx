"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import { Form } from "antd";
import { CustomInput } from "#/components/general";
import { SubmitButton } from "#/components/elements";
import { Logo, LoginImg } from "#assets/images";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <AuthLayout image={LoginImg}>
        <>
          <div className="w-[90%] mx-auto">
            <div className="flex flex-col justify-center items-center pt-[56px] gap-y-5">
              <Image
                src={Logo}
                alt=""
                className="h-[50px] w-auto"
                loading="eager"
              />
              <p>Welcome back!</p>
            </div>

            <form className="mt-20 flex flex-col gap-y-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  <label htmlFor="first_name">First Name </label>
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className=" w-full"
                  />
                </div>
                <div className="flex flex-col w-12/25 gap-y-3.5">
                  <label htmlFor="last_name">Last Name </label>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="w-full "
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  <label htmlFor="user_name">Username </label>
                  <input
                    name="user_name"
                    type="text"
                    placeholder="Username"
                    className=" w-full"
                  />
                </div>
                <div className="flex flex-col w-12/25 gap-y-3.5">
                  <label htmlFor="last_name">Last Name </label>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="w-full "
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Login;
