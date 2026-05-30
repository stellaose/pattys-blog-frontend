/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AuthLayout } from "#components/layouts";
import React, { useEffect } from "react";
import { Logo, SignupImg } from "#assets/images";
import { Form } from "antd";
import { CustomInput, CustomTextArea, Select } from "#components/general";
import Image from "next/image";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const state = useAppSelector((state) => state.app);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const { onSignup, postAuthResponse } = useAuth();

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

 

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
              onFinish={onSignup}
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
                    onChange={(e) => {
                      form.setFieldValue("first_name", e.target.value);
                      setRequestField("first_name", e.target.value);
                    }}
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
                    onChange={(e) => {
                      form.setFieldValue("last_name", e.target.value);
                      setRequestField("last_name", e.target.value);
                    }}
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
                        message: "Username is required",
                      },
                    ]}
                    onChange={(e) => {
                      form.setFieldValue("user_name", e.target.value);
                      setRequestField("user_name", e.target.value);
                    }}
                  />
                </div>
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
                  <CustomInput
                    name="phone_number"
                    label={
                      <p className="flex gap-1 items-center text-base">
                        Phone Number <span className="text-red">*</span>
                      </p>
                    }
                    rules={[
                      { required: true, message: "Phone number is required" },
                      {
                        pattern: new RegExp("[0]{1}[7-9]{1}[0-9]{9}"),
                        message: "Phone number must start with 07 or 08 or 09",
                      },
                    ]}
                    type="phoneNo"
                    value={values?.phone_number?.replace(/[^0-9]/g, "")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue("phone_number", e.target.value);
                      setRequestField(
                        "phone_number",
                        e.target.value?.replace(/[^0-9]/g, ""),
                      );
                    }}
                    placeholder="Phone Number"
                  />
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
                    onChange={(e) => {
                      form.setFieldValue("email", e.target.value);
                      setRequestField("email", e.target.value);
                    }}
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
                    onChange={(value) => {
                      form.setFieldValue("gender", value);
                      setRequestField("gender", value);
                    }}
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
                      {
                        pattern: new RegExp(
                          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                        ),
                        message:
                          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    ]}
                    onChange={(e) => {
                      form.setFieldValue("password", e.target.value);
                      setRequestField("password", e.target.value);
                    }}
                  />
                </div>
                <div className="xl:w-12/25 2lg:w-full sm:w-12/25 w-full">
                  <CustomInput
                    name="confirm_password"
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
                        message: "Confirm password is required",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match"),
                          );
                        },
                      }),
                    ]}
                    onChange={(e) => {
                      form.setFieldValue("confirm_password", e.target.value);
                      setRequestField("confirm_password", e.target.value);
                    }}
                  />
                </div>
              </div>

              <CustomTextArea
                label={<p className="text-base">Bio</p>}
                placeholder="Enter Bio"
                onChange={(e: any) => {
                  form.setFieldValue("bio", e.target.value);
                  setRequestField("bio", e.target.value);
                }}
                name="bio"
              />

              <div className="pb-10">
                <SubmitButton
                  title="Signup"
                  bgVariant="primary"
                  className="!w-full"
                  loading={postAuthResponse.isLoading}
                  disabled={
                    !state.request?.email ||
                    !state.request?.password ||
                    !state.request?.first_name ||
                    !state.request?.last_name ||
                    !state.request?.user_name ||
                    !state.request?.phone_number || !state.request?.gender || !state.request?.confirm_password
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
