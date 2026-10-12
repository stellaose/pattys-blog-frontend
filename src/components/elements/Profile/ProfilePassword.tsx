"use client";
import React from "react";
import { Form } from "antd";
import { IoLockClosedOutline } from "react-icons/io5";
import { CustomInput, SubmitButton } from "#components/general";
import { authLabel } from "#/styles/auth";
import { feedPanelTitle } from "#/styles/feed";
import { profilePanel } from "#/styles/profile";
import { sectionText } from "#/styles/home";
import {
  confirmPasswordPlaceholder,
  currentPasswordPlaceholder,
  newPasswordPlaceholder,
} from "#/utils/placeholder";
import {
  confirmPasswordRule,
  currentPasswordRule,
  passwordRule,
} from "#/utils/messages";

type Props = {
  loading: boolean;
  onFieldChange: (key: string, value: any) => void;
  onSubmit: () => Promise<boolean | undefined>;
};

export const ProfilePassword: React.FC<Props> = ({
  loading,
  onFieldChange,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const isFormValid =
    !values?.current_password || !values?.password || !values?.confirm_password;

  const onFinish = async () => {
    const isUpdated = await onSubmit();
    if (isUpdated) {
      form.resetFields();
    }
  };

  return (
    <div className={`${profilePanel} self-start w-full`}>
      <p className={feedPanelTitle}>change password</p>
      <p className={`${sectionText} !text-sm mb-4`}>
        Use at least 8 characters with an uppercase letter, a lowercase letter,
        a number and a special character.
      </p>
      <Form
        className="flex flex-col gap-y-4"
        requiredMark={false}
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <CustomInput
          name="current_password"
          type="password"
          label={<p className={authLabel}>Current password</p>}
          placeholder={currentPasswordPlaceholder}
          prefix={<IoLockClosedOutline size={24} color="#77767D" />}
          rules={currentPasswordRule}
          onChange={(e) => {
            form.setFieldValue("current_password", e.target.value);
            onFieldChange("current_password", e.target.value);
          }}
        />
        <CustomInput
          name="password"
          type="password"
          label={<p className={authLabel}>New password</p>}
          placeholder={newPasswordPlaceholder}
          prefix={<IoLockClosedOutline size={24} color="#77767D" />}
          rules={passwordRule}
          onChange={(e) => {
            form.setFieldValue("password", e.target.value);
            onFieldChange("password", e.target.value);
          }}
        />
        <CustomInput
          name="confirm_password"
          type="password"
          label={<p className={authLabel}>Confirm new password</p>}
          placeholder={confirmPasswordPlaceholder}
          prefix={<IoLockClosedOutline size={24} color="#77767D" />}
          rules={confirmPasswordRule}
          onChange={(e) => {
            form.setFieldValue("confirm_password", e.target.value);
          }}
        />

        <div className="mt-2">
          <SubmitButton
            title="Update password"
            bgVariant="secondary"
            className="!w-full"
            loading={loading}
            disabled={isFormValid}
          />
        </div>
      </Form>
    </div>
  );
};
