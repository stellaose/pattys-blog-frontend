/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#components/layouts";
import React, { useEffect } from "react";
import { SubmitButton } from "#/components/general";
import { Form, Input, Button, Spin } from "antd";
import { useAuth, useFieldRequest } from "#/hooks";

const VerifyOtp = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const { postAuthResponse, onResendOtp } = useAuth();
  const { onVerifyOTP, postAuthResponse: verifyOTPResponse } = useAuth();

  const email = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("userId") ?? "";

  const maskedEmail =
    email && email?.slice(0, 2) + "**************" + email?.slice(-2);

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <LayoutAuth
        description={
          <p>
            Enter OTP code to sent to{" "}
            <span className="font-semibold">{maskedEmail}</span> to continue.
          </p>
        }
      >
        <>
          <Form
            className="!mt-20 "
            requiredMark={false}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={onVerifyOTP}
          >
            <div className="lg:w-3/4 ssm:w-4/5 w-9/10 mx-auto mt-20">
              <Form.Item
                name="code"
                label={<p className="flex gap-1 items-center text-base">OTP</p>}
                rules={[{ required: true, message: "otp is required" }]}
              >
                <div className="justify-between flex items-center ">
                  <Input.OTP
                    length={6}
                    onChange={(value: string) => {
                      setRequestField("code", value);
                    }}
                    className="text-sm"
                    mask="●"
                  />
                </div>
              </Form.Item>
              <div className="pb-16 pt-14">
                <SubmitButton
                  title="Verify"
                  bgVariant="primary"
                  className="!w-full"
                  disabled={!values?.code}
                  loading={verifyOTPResponse.isLoading}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center lg:w-3/4 ssm:w-4/5 w-9/10 mx-auto">
              <span className="text-sm text-black/70">
                Didn’t received the code?{" "}
              </span>
              <Button
                onClick={() => onResendOtp(userId, true)}
                htmlType="button"
                loading={postAuthResponse.isLoading}
                className="!bg-white !py-1 !h-fit px-[15px]!  !border-black/60 !text-black/60 cursor-pointer !font-medium hover:!scale-105 transform transition duration-300 !rounded-2xl"
              >
                {postAuthResponse.isLoading ? <Spin /> : "Resend"}
              </Button>
            </div>
          </Form>
        </>
      </LayoutAuth>
    </>
  );
};

export default VerifyOtp;
