/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#components/layouts";
import React, { useEffect } from "react";
import { Form } from "antd";
import { CustomInput } from "#components/general";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";
import { useRouter } from "next/navigation";
import { MdOutlineMailOutline } from "react-icons/md";

import { authLabel, otpFormLink } from "#/styles/auth";
import { emailPlaceholder } from "#/utils/placeholder";
import { emailRule } from "#/utils/messages";
import { AuthLinks } from "#components/elements";

const ForgotPassword = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const isFormValid = !values?.email;

  const { onForgotPassword, postAuthResponse } = useAuth();

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <LayoutAuth
        title="Forgot your password?"
        description={[
          "Enter the email address linked to your account",
          "and we’ll send you a 6-digit verification code.",
        ]}
      >
        <>
          <Form
            requiredMark={false}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={onForgotPassword}
          >
            <div className="w-full mx-auto flex flex-col gap-y-4">
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

              <div className="pt-10">
                <SubmitButton
                  title="Send OTP"
                  bgVariant="secondary"
                  className="!w-full !rounded-full"
                  loading={postAuthResponse.isLoading}
                  disabled={isFormValid}
                />
              </div>
            </div>
            <p
              className={otpFormLink}
              onClick={() => router.push("/auth/login")}
            >
              Back to login
            </p>

            <AuthLinks />
          </Form>
        </>
      </LayoutAuth>
    </>
  );
};

export default ForgotPassword;
