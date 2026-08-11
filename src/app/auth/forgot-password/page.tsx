/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#components/layouts";
import React, { useEffect } from "react";
import { Form, Row, Col } from "antd";
import { SubmitButton } from "#components/general";
import { CustomInput } from "#components/general";
import { useAuth, useFieldRequest } from "#/hooks";

const ForgotPassword = () => {
  const { onForgotPassword, postAuthResponse } = useAuth();

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
      <LayoutAuth description="Send verification e-mail">
        <Form
          className="!mt-20 "
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={onForgotPassword}
        >
          <div className="lg:w-3/4 ssm:w-4/5 w-9/10 mx-auto">
            <Row
              gutter={24}
              className="flex flex-col gap-y-2 justify-between items-center "
            >
              <Col span={24}>
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
              </Col>
            </Row>

            <div className="pb-16 mt-7">
              <SubmitButton
                title="Send OTP"
                bgVariant="secondary"
                className="!w-full"
                loading={postAuthResponse.isLoading}
                disabled={!values?.email}
              />
            </div>
          </div>
        </Form>
      </LayoutAuth>
    </>
  );
};

export default ForgotPassword;
