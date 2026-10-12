/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AuthLayout } from "#components/layouts";
import React, { useEffect } from "react";
import { Form } from "antd";
import { CustomInput } from "#components/general";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";
import Line from "#assets/images/line.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";

import {
  authLabel,
  loginBody,
  loginForgotPassword,
  signupFormSubheading,
  signupFormTitle,
  signupTitleHeadline,
} from "#/styles/auth";
import { emailPlaceholder, passwordPlaceholder } from "#/utils/placeholder";
import { emailRule, loginPasswordRule } from "#/utils/messages";
import { PlatformLogin } from "#components/elements";

const Login = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const isFormValid = !values?.email || !values?.password;

  const { onLogin, postAuthResponse } = useAuth();

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <AuthLayout>
        <>
          <div className={loginBody}>
            <Form
              className="!mt-14 flex flex-col gap-y-4"
              requiredMark={false}
              layout="vertical"
              autoComplete="off"
              form={form}
              onFinish={onLogin}
            >
              <div className="mb-4">
                <p className={signupFormTitle}>welcome back</p>
                <h3 className={signupTitleHeadline}>Continue your journey</h3>
                <p className={signupFormSubheading}>
                  Log in to your account to continue to PATTYS
                </p>
              </div>

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

              <div>
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
                  rules={loginPasswordRule}
                  onChange={(e) => {
                    form.setFieldValue("password", e.target.value);
                    setRequestField("password", e.target.value);
                  }}
                />
                <p className="flex justify-end">
                  <span
                    className={loginForgotPassword}
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot your password?
                  </span>
                </p>
              </div>

              <div className="mt-4.75">
                <SubmitButton
                  title="Log in"
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
                    <PlatformLogin />
                  </div>

                  <p className="text-grey-200 mt-11 flex items-center justify-center gap-2">
                    Don&apos;t have an account{" "}
                    <span
                      className="text-purple-200 font-medium cursor-pointer hover:underline flex items-center gap-2"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Sign up <GoArrowRight color="#5b4bd8" size={16} />
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

export default Login;
