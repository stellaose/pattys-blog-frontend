"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import { Logo, SignupImg, NigeriaFlag } from "#assets/images";
import { Form, Input } from "antd";
import { CustomInput } from "#components/general";
import Image from "next/image";

const Signup = () => {
  return (
    <>
      <AuthLayout image={SignupImg}>
        <>
          <div className="w-[90%] !mx-auto">
            <div className="flex flex-col justify-center items-center pt-[56px] gap-y-5">
              <Image src={Logo} alt="" className="h-[50px] w-auto" />
              <p>Welcome to Pattys. This is going to be a fun ride! 😉</p>
            </div>

            <Form
              className="!mt-20 flex flex-col gap-y-8"
              requiredMark={false}
              layout="vertical"
              autoComplete="off"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  <CustomInput
                    name="first_name"
                    label={
                      <p className="text-base">
                        First Name <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder="First Name"
                    type="text"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                    ]}
                    onChange={(e) => console.log(e)}
                  />
                </div>
                <div className="flex flex-col w-12/25 gap-y-3.5">
                  <CustomInput
                    name="last_name"
                    label={
                      <p className="text-base">
                        Last Name <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                    ]}
                    onChange={(e) => console.log(e)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  <CustomInput
                    name="user_name"
                    label={
                      <p className="text-base">
                        Username <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder="User Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                    ]}
                    onChange={(e) => console.log(e)}
                  />
                </div>
                <div className="flex flex-col w-12/25 gap-y-3.5">
                  <Form.Item
                    name="phone_number"
                    label={
                      <p className="flex gap-1 items-center text-base">
                        Phone Number <span className="text-red">*</span>
                      </p>
                    }
                    rules={[
                      { required: true, message: "Phone number is required" },
                    ]}
                  >
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={NigeriaFlag}
                        alt=""
                        className="h-[48px] w-auto"
                      />{" "}
                      <Input
                        placeholder="Phone Number"
                        type="tel"
                        className="!h-[60px] text-base"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          console.log(e)
                        }
                      />
                    </div>
                  </Form.Item>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-full">
                  <CustomInput
                    name="email"
                    label={
                      <p className="text-base">
                        E-mail <span className="text-red">*</span>{" "}
                      </p>
                    }
                    type="email"
                    placeholder="E-mail"
                    rules={[
                      {
                        required: true,
                        message: "E-mail is required",
                      },
                    ]}
                    onChange={(e) => console.log(e)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  
                    <CustomInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Password is required",
                        },
                      ]}
                      onChange={(e) => console.log(e)}
                    />
                </div>
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  
                    <CustomInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Confirm Password"
                      rules={[
                        {
                          required: true,
                          message: "Password is required",
                        },
                      ]}
                      onChange={(e) => console.log(e)}
                    />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-3.5 w-12/25">
                  <label htmlFor="gender">Gender </label>
                  {/* <CustomSelect
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  /> */}
                </div>
              </div>
            </Form>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Signup;
