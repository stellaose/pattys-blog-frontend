"use client";
import { LayoutAuth } from "#components/layouts";
import React from "react";
import { SubmitButton } from "#components/elements";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";

const VerifyOtp = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  return (
    <>
      <LayoutAuth description="Enter OTP code to sent to ****** to continue.">
        <Form
          className="!mt-20 "
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={() => router.push("/auth/verify-otp")}
        >
          <div className="lg:w-3/4 ssm:w-4/5 w-9/10 mx-auto mt-20">
            <p className="text-18 mb-2">Enter OTP</p>{" "}
            <div className="justify-between flex items-center ">
              <Input.OTP
                length={6}
                onChange={(value: string) => {
                  console.log(value);
                }}
                className="text-sm"
                mask="●"
              />
            </div>
            <div className="pb-16 pt-14">
              <SubmitButton
                title="Verify"
                bgVariant="primary"
                className="!w-full"
                disabled={!values?.email || !values?.password}
              />
            </div>
          </div>
        </Form>
      </LayoutAuth>
    </>
  );
};

export default VerifyOtp;
