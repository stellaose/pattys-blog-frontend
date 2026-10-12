/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AuthLayout } from "#components/layouts";
import React, { useEffect } from "react";
import { Form } from "antd";
import { CustomInput, CustomTextArea, Select } from "#components/general";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";
import Line from "#assets/images/line.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiUser6Line } from "react-icons/ri";
import { IoIosAt } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";

import {
  authLabel,
  authPhoneLabel,
  inputText,
  signupBody,
  signupFormBody,
  signupFormSubheading,
  signupFormTitle,
  signupTitleHeadline,
} from "#/styles/auth";
import {
  bioPlaceholder,
  confirmPasswordPlaceholder,
  emailPlaceholder,
  firstNamePlaceholder,
  genderPlaceholder,
  lastNamePlaceholder,
  passwordPlaceholder,
  phoneNumberPlaceholder,
  userNamePlaceholder,
} from "#/utils/placeholder";
import {
  confirmPasswordRule,
  emailRule,
  firstNameRule,
  genderOptions,
  genderRule,
  lastNameRule,
  passwordRule,
  phoneNumberRule,
  usernameRule,
} from "#/utils/messages";
import { PlatformLogin } from "#components/elements";

const Signup = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const isFormValid =
    !values?.email ||
    !values?.password ||
    !values?.first_name ||
    !values?.last_name ||
    !values?.user_name ||
    !values?.phone_number ||
    !values?.gender ||
    !values?.confirm_password;

  const { onSignup, postAuthResponse } = useAuth();

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <AuthLayout>
        <>
          <div className={signupBody}>
            <Form
              className="!mt-14 flex flex-col gap-y-4"
              requiredMark={false}
              layout="vertical"
              autoComplete="off"
              form={form}
              onFinish={onSignup}
            >
              <div className="mb-4">
                <p className={signupFormTitle}>create account</p>
                <h3 className={signupTitleHeadline}>Start your journey</h3>
                <p className={signupFormSubheading}>
                  Create your account to continue to PATTYS
                </p>
              </div>

              <div className={signupFormBody}>
                <div className={inputText}>
                  <CustomInput
                    name="first_name"
                    label={
                      <p className={authLabel}>
                        First Name <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder={firstNamePlaceholder}
                    type="text"
                    prefix={<RiUser6Line size={24} color="#77767D" />}
                    rules={firstNameRule}
                    onChange={(e) => {
                      form.setFieldValue("first_name", e.target.value);
                      setRequestField("first_name", e.target.value);
                    }}
                  />
                </div>
                <div className={inputText}>
                  <CustomInput
                    name="last_name"
                    label={
                      <p className={authLabel}>
                        Last Name <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder={lastNamePlaceholder}
                    prefix={<RiUser6Line size={24} color="#77767D" />}
                    rules={lastNameRule}
                    onChange={(e) => {
                      form.setFieldValue("last_name", e.target.value);
                      setRequestField("last_name", e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className={signupFormBody}>
                <div className={inputText}>
                  <CustomInput
                    name="user_name"
                    label={
                      <p className={authLabel}>
                        Username <span className="text-red">*</span>{" "}
                      </p>
                    }
                    placeholder={userNamePlaceholder}
                    prefix={<IoIosAt size={24} color="#77767D" />}
                    rules={usernameRule}
                    onChange={(e) => {
                      form.setFieldValue("user_name", e.target.value);
                      setRequestField("user_name", e.target.value);
                    }}
                  />
                </div>
                <div className={inputText}>
                  <CustomInput
                    name="phone_number"
                    label={
                      <p className={authPhoneLabel}>
                        Phone Number <span className="text-red">*</span>
                      </p>
                    }
                    rules={phoneNumberRule}
                    type="phoneNo"
                    value={values?.phone_number?.replace(/[^0-9]/g, "")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      form.setFieldValue("phone_number", e.target.value);
                      setRequestField(
                        "phone_number",
                        e.target.value?.replace(/[^0-9]/g, ""),
                      );
                    }}
                    placeholder={phoneNumberPlaceholder}
                  />
                </div>
              </div>

              <div className={signupFormBody}>
                <div className={inputText}>
                  <CustomInput
                    name="email"
                    label={
                      <p className={authLabel}>
                        E-mail <span className="text-red">*</span>{" "}
                      </p>
                    }
                    type="email"
                    placeholder={emailPlaceholder}
                    prefix={<MdOutlineMailOutline size={24} color="#77767D" />}
                    rules={emailRule}
                    onChange={(e) => {
                      form.setFieldValue("email", e.target.value);
                      setRequestField("email", e.target.value);
                    }}
                  />
                </div>
                <div className={inputText}>
                  <Select
                    name="gender"
                    label={
                      <p className={authLabel}>
                        Gender <span className="text-red">*</span>{" "}
                      </p>
                    }
                    prefix={<HiOutlineUsers size={24} color="#77767D" />}
                    placeholder={genderPlaceholder}
                    options={genderOptions}
                    rules={genderRule}
                    onChange={(value) => {
                      form.setFieldValue("gender", value);
                      setRequestField("gender", value);
                    }}
                  />
                </div>
              </div>

              <div className={signupFormBody}>
                <div className={inputText}>
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder={passwordPlaceholder}
                    label={
                      <p className={authLabel}>
                        Password <span className="text-red">*</span>{" "}
                      </p>
                    }
                    prefix={<IoLockClosedOutline size={24} color="#77767D" />}
                    rules={passwordRule}
                    onChange={(e) => {
                      form.setFieldValue("password", e.target.value);
                      setRequestField("password", e.target.value);
                    }}
                  />
                </div>
                <div className={inputText}>
                  <CustomInput
                    name="confirm_password"
                    type="password"
                    placeholder={confirmPasswordPlaceholder}
                    prefix={<IoLockClosedOutline size={24} color="#77767D" />}
                    label={
                      <p className={authLabel}>
                        Confirm password{" "}
                        <span className="text-red">*</span>{" "}
                      </p>
                    }
                    rules={confirmPasswordRule}
                    onChange={(e) => {
                      form.setFieldValue("confirm_password", e.target.value);
                      setRequestField("confirm_password", e.target.value);
                    }}
                  />
                </div>
              </div>

              <CustomTextArea
                label={<p className={authLabel}>Bio</p>}
                placeholder={bioPlaceholder}
                onChange={(e: any) => {
                  form.setFieldValue("bio", e.target.value);
                  setRequestField("bio", e.target.value);
                }}
                name="bio"
              />

              <div className="mt-4.75">
                <SubmitButton
                  title="Create Account"
                  bgVariant="secondary"
                  className="!w-full"
                  loading={postAuthResponse.isLoading}
                  disabled={isFormValid}
                />
                <div className="mt-[31.5px]">
                  <div className="flex items-center justify-center w-full">
                    <Image
                      src={Line}
                      alt="line"
                      loading="eager"
                      className="w-auto"
                    />
                    <p className="text-[10.5px] text-grey-100 flex-nowrap">
                      or continue with
                    </p>
                    <Image
                      src={Line}
                      alt="line"
                      loading="eager"
                      className="w-auto"
                    />
                  </div>
                  
                  <div className="mt-[24.5px]">
                    <PlatformLogin/>
                  </div>

                  <p className="text-grey-200 mt-11 flex items-center justify-center gap-2">
                    Already have an account{" "}
                    <span
                      className="text-purple-200 font-medium cursor-pointer hover:underline flex items-center gap-2"
                      onClick={() => router.push("/auth/login")}
                    >
                      Login <GoArrowRight color="#5b4bd8" size={16} />
                    </span>
                  </p>
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
