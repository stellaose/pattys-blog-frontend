"use client";
import React from "react";
import { Form } from "antd";
import { RiUser6Line } from "react-icons/ri";
import { IoIosAt } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import {
  CustomInput,
  CustomTextArea,
  Select,
  SubmitButton,
} from "#components/general";
import { authLabel, authPhoneLabel } from "#/styles/auth";
import { feedPanelTitle } from "#/styles/feed";
import {
  profileFormField,
  profileFormRow,
  profilePanel,
} from "#/styles/profile";
import {
  bioPlaceholder,
  emailPlaceholder,
  firstNamePlaceholder,
  genderPlaceholder,
  lastNamePlaceholder,
  phoneNumberPlaceholder,
  userNamePlaceholder,
} from "#/utils/placeholder";
import {
  firstNameRule,
  genderOptions,
  genderRule,
  lastNameRule,
  phoneNumberRule,
  usernameRule,
} from "#/utils/messages";

const fields = [
  "first_name",
  "last_name",
  "user_name",
  "phone_number",
  "gender",
  "bio",
];

type Props = {
  user: any;
  loading: boolean;
  onFieldChange: (key: string, value: any) => void;
  onSubmit: () => void;
};

export const ProfileInformation: React.FC<Props> = ({
  user,
  loading,
  onFieldChange,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const isUnchanged = fields.every(
    (field) => (values?.[field] ?? "") === (user?.[field] ?? ""),
  );

  return (
    <div className={profilePanel}>
      <p className={feedPanelTitle}>personal information</p>
      <Form
        className="flex flex-col gap-y-4"
        requiredMark={false}
        layout="vertical"
        autoComplete="off"
        form={form}
        initialValues={user}
        onFinish={onSubmit}
      >
        <div className={profileFormRow}>
          <div className={profileFormField}>
            <CustomInput
              name="first_name"
              label={<p className={authLabel}>First Name</p>}
              placeholder={firstNamePlaceholder}
              prefix={<RiUser6Line size={24} color="#77767D" />}
              rules={firstNameRule}
              onChange={(e) => {
                form.setFieldValue("first_name", e.target.value);
                onFieldChange("first_name", e.target.value);
              }}
            />
          </div>
          <div className={profileFormField}>
            <CustomInput
              name="last_name"
              label={<p className={authLabel}>Last Name</p>}
              placeholder={lastNamePlaceholder}
              prefix={<RiUser6Line size={24} color="#77767D" />}
              rules={lastNameRule}
              onChange={(e) => {
                form.setFieldValue("last_name", e.target.value);
                onFieldChange("last_name", e.target.value);
              }}
            />
          </div>
        </div>

        <div className={profileFormRow}>
          <div className={profileFormField}>
            <CustomInput
              name="user_name"
              label={<p className={authLabel}>Username</p>}
              placeholder={userNamePlaceholder}
              prefix={<IoIosAt size={24} color="#77767D" />}
              rules={usernameRule}
              onChange={(e) => {
                form.setFieldValue("user_name", e.target.value);
                onFieldChange("user_name", e.target.value);
              }}
            />
          </div>
          <div className={profileFormField}>
            <CustomInput
              name="email"
              type="email"
              label={<p className={authLabel}>E-mail</p>}
              placeholder={emailPlaceholder}
              prefix={<MdOutlineMailOutline size={24} color="#77767D" />}
              disabled
              onChange={() => {}}
            />
          </div>
        </div>

        <div className={profileFormRow}>
          <div className={profileFormField}>
            <CustomInput
              name="phone_number"
              label={<p className={authPhoneLabel}>Phone Number</p>}
              rules={phoneNumberRule}
              type="phoneNo"
              value={values?.phone_number?.replace(/[^0-9]/g, "")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                form.setFieldValue("phone_number", e.target.value);
                onFieldChange(
                  "phone_number",
                  e.target.value?.replace(/[^0-9]/g, ""),
                );
              }}
              placeholder={phoneNumberPlaceholder}
            />
          </div>
          <div className={profileFormField}>
            <Select
              name="gender"
              label={<p className={authLabel}>Gender</p>}
              prefix={<HiOutlineUsers size={24} color="#77767D" />}
              placeholder={genderPlaceholder}
              options={genderOptions}
              rules={genderRule}
              onChange={(value) => {
                form.setFieldValue("gender", value);
                onFieldChange("gender", value);
              }}
            />
          </div>
        </div>

        <CustomTextArea
          name="bio"
          label={<p className={authLabel}>Bio</p>}
          placeholder={bioPlaceholder}
          onChange={(e: any) => {
            form.setFieldValue("bio", e.target.value);
            onFieldChange("bio", e.target.value);
          }}
        />

        <div className="mt-2">
          <SubmitButton
            title="Save changes"
            bgVariant="secondary"
            className="!w-full"
            loading={loading}
            disabled={isUnchanged}
          />
        </div>
      </Form>
    </div>
  );
};
