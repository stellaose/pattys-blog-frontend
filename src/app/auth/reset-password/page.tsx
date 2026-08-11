/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#/components/layouts";
import React, { useEffect } from "react";
import { Form, Col, Row } from "antd";
import { CustomInput } from "#/components/general";
import { SubmitButton } from "#/components/general";
import { useAuth, useFieldRequest } from "#/hooks";

const ResetPassword = () => {
  const { onResetPassword, postAuthResponse } = useAuth();

  const { setRequestField } = useFieldRequest();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <LayoutAuth description="Reset your password">
        <Form
          className="!mt-20 "
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={onResetPassword}
        >
          <div className="lg:w-3/4 ssm:w-4/5 w-9/10 mx-auto">
            <Row
              gutter={24}
              className="flex flex-col gap-y-2 justify-between items-center "
            >
              <Col span={24}>
                <CustomInput
                  name="password"
                  label={
                    <p className="text-base">
                      Password <span className="text-red">*</span>{" "}
                    </p>
                  }
                  type="password"
                  placeholder="Password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                  ]}
                  onChange={(e) => {
                    form.setFieldValue("password", e.target.value);
                    setRequestField("password", e.target.value);
                  }}
                />
              </Col>

              <Col span={24}>
                <CustomInput
                  name="confirm_password"
                  label={
                    <p className="text-base">
                      Confirm password <span className="text-red">*</span>{" "}
                    </p>
                  }
                  type="password"
                  placeholder="Confirm password"
                  rules={[
                    { required: true, message: "Confirm Password is required" },
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
                  onChange={(e) => console.log(e)}
                />
              </Col>
            </Row>

            <div className="pb-16 mt-10">
              <SubmitButton
                title="Confirm"
                bgVariant="secondary"
                className="!w-full"
                loading={postAuthResponse.isLoading}
                disabled={!values?.confirm_password || !values?.password}
              />
            </div>
          </div>
        </Form>
      </LayoutAuth>
    </>
  );
};

export default ResetPassword;
