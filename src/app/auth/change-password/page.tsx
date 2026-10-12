/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#components/layouts";
import React, { useEffect } from "react";
import { Form } from "antd";
import { CustomInput } from "#components/general";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";
import { useRouter } from "next/navigation";
import { IoLockClosedOutline } from "react-icons/io5";

import { authLabel, otpFormLink } from "#/styles/auth";
import {
  confirmPasswordPlaceholder,
  passwordPlaceholder,
} from "#/utils/placeholder";
import { confirmPasswordRule, passwordRule } from "#/utils/messages";
import { AuthLinks, LockIcon } from "#components/elements";

const ChangePassword = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const isFormValid = !values?.password || !values?.confirm_password;

  const { onChangePassword, putResponse } = useAuth();

  useEffect(() => {
    if (putResponse.isSuccess) {
      form.resetFields();
    }
  }, [putResponse.isSuccess]);

  return (
    <>
      <LayoutAuth
        title="Change your password"
        description={["Choose a new password to keep your account secure."]}
        icon={<LockIcon />}
      >
        <>
          <Form
            requiredMark={false}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={onChangePassword}
          >
            <div className="w-full mx-auto flex flex-col gap-y-4">
              <CustomInput
                name="password"
                type="password"
                placeholder={passwordPlaceholder}
                label={
                  <p className={authLabel}>
                    New password <span className="text-red">*</span>{" "}
                  </p>
                }
                prefix={<IoLockClosedOutline size={24} color="#77767D" />}
                rules={passwordRule}
                onChange={(e) => {
                  form.setFieldValue("password", e.target.value);
                  setRequestField("password", e.target.value);
                }}
              />

              <CustomInput
                name="confirm_password"
                type="password"
                placeholder={confirmPasswordPlaceholder}
                prefix={<IoLockClosedOutline size={24} color="#77767D" />}
                label={
                  <p className={authLabel}>
                    Confirm password <span className="text-red">*</span>{" "}
                  </p>
                }
                rules={confirmPasswordRule}
                onChange={(e) => {
                  form.setFieldValue("confirm_password", e.target.value);
                  setRequestField("confirm_password", e.target.value);
                }}
              />

              <div className="pt-10">
                <SubmitButton
                  title="Change Password"
                  bgVariant="secondary"
                  className="!w-full !rounded-full"
                  loading={putResponse.isLoading}
                  disabled={isFormValid}
                />
              </div>
            </div>
            <p className={otpFormLink} onClick={() => router.back()}>
              Go back
            </p>

            <AuthLinks />
          </Form>
        </>
      </LayoutAuth>
    </>
  );
};

export default ChangePassword;
