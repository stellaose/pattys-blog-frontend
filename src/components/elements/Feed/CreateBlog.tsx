"use client";
import React, { useState } from "react";
import { Form, Modal } from "antd";
import { GoPencil } from "react-icons/go";
import {
  CustomInput,
  CustomTextArea,
  Select,
  SubmitButton,
} from "#components/general";
import { useBlog, useFieldRequest } from "#/hooks";
import { authLabel } from "#/styles/auth";
import { createBlogLight, createBlogTitle } from "#/styles/feed";
import { eyebrow, primaryLink, sectionText } from "#/styles/home";
import { blogCategoryOptions } from "#/utils/feed";
import {
  blogCategoryRule,
  blogDescriptionRule,
  blogTitleRule,
} from "#/utils/messages";
import {
  blogCategoryPlaceholder,
  blogDescriptionPlaceholder,
  blogTitlePlaceholder,
} from "#/utils/placeholder";

export const CreateBlog: React.FC<{
  title?: string;
  variant?: "dark" | "light";
}> = ({ title = "Create blog", variant = "dark" }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const isFormValid =
    !values?.title || !values?.category?.length || !values?.description;

  const { onCreateBlog, postResponse } = useBlog();

  const onFinish = async () => {
    const isCreated = await onCreateBlog();
    if (isCreated) {
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={
          variant === "dark" ? `${primaryLink} cursor-pointer` : createBlogLight
        }
        onClick={() => setOpen(true)}
      >
        <GoPencil size={16} /> {title}
      </button>

      <Modal
        open={open}
        footer={null}
        centered
        destroyOnHidden
        width={620}
        onCancel={() => setOpen(false)}
      >
        <Form
          className="flex flex-col gap-y-4 !pt-2"
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <div className="mb-2">
            <p className={eyebrow}>new blog</p>
            <h3 className={createBlogTitle}>Share your voice</h3>
            <p className={`${sectionText} !text-sm`}>
              Write something the community will want to like and talk about.
            </p>
          </div>

          <CustomInput
            name="title"
            label={
              <p className={authLabel}>
                Title <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={blogTitlePlaceholder}
            rules={blogTitleRule}
            onChange={(e) => {
              form.setFieldValue("title", e.target.value);
              setRequestField("title", e.target.value);
            }}
          />

          <Select
            name="category"
            label={
              <p className={authLabel}>
                Category <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={blogCategoryPlaceholder}
            mode="tags"
            options={blogCategoryOptions}
            rules={blogCategoryRule}
            onChange={(value: string[]) => {
              const category = value[value.length - 1]?.trim();
              form.setFieldValue("category", category ? [category] : []);
              setRequestField("category", category);
            }}
          />

          <CustomTextArea
            name="description"
            label={
              <p className={authLabel}>
                Description <span className="text-red">*</span>{" "}
              </p>
            }
            placeholder={blogDescriptionPlaceholder}
            rules={blogDescriptionRule}
            onChange={(e: any) => {
              form.setFieldValue("description", e.target.value);
              setRequestField("description", e.target.value);
            }}
          />

          <div className="mt-2">
            <SubmitButton
              title="Publish blog"
              bgVariant="secondary"
              className="!w-full"
              loading={postResponse.isLoading}
              disabled={isFormValid}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};
