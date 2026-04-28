"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import { Logo, SignupImg, NigeriaFlag } from "#assets/images";
import { Form, Input } from "antd";
import { CustomInput, CustomTextArea, Select } from "#components/general";
import Image from "next/image";
import { SubmitButton } from "#/components/elements";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  return (
    <>
      <AuthLayout image={SignupImg}>
        <>
          <div className="2lg:w-9/10 xxl:w-4/5 md:w-3/4 sm:w-4/5 w-9/10 !mx-auto pb-14">
            <div className="flex flex-col justify-center items-center pt-[56px] gap-y-5">
              <Image
                src={Logo}
                alt=""
                className="h-[50px] w-auto"
                loading="eager"
              />
              <p>Welcome to Pattys. This is going to be a fun ride! 😉</p>
            </div>

            <Form
              className="!mt-20 flex flex-col gap-y-8"
              requiredMark={false}
              layout="vertical"
              autoComplete="off"
              form={form}
            >
              <div className="flex xl:flex-row 2lg:flex-col sm:flex-row flex-col justify-between items-center">
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
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
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
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

              <div className="flex xl:flex-row 2lg:flex-col sm:flex-row flex-col justify-between items-center">
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
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
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
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
                        loading="eager"
                      />{" "}
                      <Input
                        placeholder="Phone Number"
                        required
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

              <div className="flex xl:flex-row 2lg:flex-col sm:flex-row flex-col justify-between items-center">
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
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
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
                  <Select
                    name="gender"
                    label={
                      <p className="text-base">
                        Gender <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder="Gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
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

              <div className="flex xl:flex-row 2lg:flex-col sm:flex-row flex-col justify-between items-center">
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    label={
                      <p className="text-base">
                        Password <span className="text-red">*</span>{" "}
                      </p>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                    ]}
                    onChange={(e) => console.log(e)}
                  />
                </div>
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    label={
                      <p className="text-base">
                        Confirm password{" "}
                        <span className="text-red">*</span>{" "}
                      </p>
                    }
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

              <CustomTextArea
                label={<p className="text-base">Bio</p>}
                placeholder="Enter Bio"
                onChange={(e) => console.log(e)}
                name="bio"
              />

              <div className="pb-10">
                <SubmitButton
                  title="Signup"
                  bgVariant="primary"
                  className="!w-full"
                  disabled={
                    !values?.first_name ||
                    !values?.last_name ||
                    !values?.email ||
                    !values?.phone_number ||
                    !values?.password ||
                    !values?.confirm_password ||
                    !values?.user_name ||
                    !values?.gender
                  }
                />
                <p className="italic mt-2">
                  If you already have an account, Please{" "}
                  <span
                    className="text-lemon font-medium cursor-pointer hover:underline"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Signup;
