"use client";
import React from "react";
import Image from "next/image";
import { Form } from "antd";
import { RiUser6Line } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoClock, GoComment } from "react-icons/go";
import {
  CustomInput,
  CustomTextArea,
  Select,
  SubmitButton,
} from "#components/general";
import { Instagram, LinkedIn, X } from "#assets/svg";
import { authLabel } from "#/styles/auth";
import { feedPanelTitle } from "#/styles/feed";
import { footerSocial, sectionText } from "#/styles/home";
import {
  contactGrid,
  contactIcon,
  contactLabel,
  contactRow,
  contactValue,
  infoPanel,
} from "#/styles/info";
import { contactTopics } from "#/utils/info";
import { ContactMessage } from "#/hooks";
import {
  contactMessageRule,
  contactTopicRule,
  emailRule,
  fullNameRule,
} from "#/utils/messages";
import {
  contactMessagePlaceholder,
  contactTopicPlaceholder,
  emailPlaceholder,
  fullNamePlaceholder,
} from "#/utils/placeholder";

const socials = [
  { label: "X", href: "https://www.x.com/pattys/", icon: X },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pattys/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/patty's/",
    icon: LinkedIn,
  },
];

type Props = {
  user: any;
  loading: boolean;
  onSubmit: (contact: ContactMessage) => Promise<boolean | undefined>;
};

export const ContactContent: React.FC<Props> = ({
  user,
  loading,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const isFormValid =
    !values?.name || !values?.email || !values?.topic || !values?.message;

  const onFinish = async (contact: ContactMessage) => {
    const isSent = await onSubmit(contact);
    if (isSent) {
      form.resetFields();
    }
  };

  return (
    <div className={contactGrid}>
      <div className={`${infoPanel} self-start`}>
        <p className={feedPanelTitle}>get in touch</p>
        <div className={contactRow}>
          <span className={contactIcon}>
            <GoClock size={20} />
          </span>
          <div>
            <p className={contactLabel}>Response time</p>
            <p className={contactValue}>
              We read every message and reply as soon as we can.
            </p>
          </div>
        </div>
        <div className={contactRow}>
          <span className={contactIcon}>
            <GoComment size={20} />
          </span>
          <div>
            <p className={contactLabel}>Follow us</p>
            <div className="flex gap-3 mt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={footerSocial}
                >
                  <Image
                    src={social.icon}
                    alt=""
                    className="h-4 w-auto"
                    loading="eager"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={infoPanel}>
        <p className={feedPanelTitle}>send a message</p>
        <p className={`${sectionText} !text-sm mb-4`}>
          Your message goes straight to our team&apos;s inbox.
        </p>
        <Form
          key={user?.userId ?? "guest"}
          className="flex flex-col gap-y-4"
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          initialValues={{
            name: user ? `${user.first_name} ${user.last_name}` : undefined,
            email: user?.email,
          }}
          onFinish={onFinish}
        >
          <CustomInput
            name="name"
            label={
              <p className={authLabel}>
                Full name <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={fullNamePlaceholder}
            prefix={<RiUser6Line size={24} color="#77767D" />}
            rules={fullNameRule}
            onChange={(e) => form.setFieldValue("name", e.target.value)}
          />
          <CustomInput
            name="email"
            type="email"
            label={
              <p className={authLabel}>
                E-mail <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={emailPlaceholder}
            prefix={<MdOutlineMailOutline size={24} color="#77767D" />}
            rules={emailRule}
            onChange={(e) => form.setFieldValue("email", e.target.value)}
          />
          <Select
            name="topic"
            label={
              <p className={authLabel}>
                Topic <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={contactTopicPlaceholder}
            options={contactTopics}
            rules={contactTopicRule}
            onChange={(value) => form.setFieldValue("topic", value)}
          />
          <CustomTextArea
            name="message"
            label={
              <p className={authLabel}>
                Message <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={contactMessagePlaceholder}
            rules={contactMessageRule}
            onChange={(e: any) => form.setFieldValue("message", e.target.value)}
          />

          <div className="mt-2">
            <SubmitButton
              title="Send message"
              bgVariant="secondary"
              className="!w-full"
              loading={loading}
              disabled={isFormValid}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
