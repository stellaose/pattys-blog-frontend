/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LayoutAuth } from "#components/layouts";
import React, { useEffect } from "react";
import { SubmitButton } from "#/components/general";
import { Form, Input } from "antd";
import { useAuth, useFieldRequest } from "#/hooks";
import { useAppSelector } from "#store/hook";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { otpLayoutBottom } from "#styles/auth";

const VerifyOtp = () => {
  const stateUserId = useAppSelector((state) => state.app.userId);
  const isForgotPassword = useAppSelector(
    (state) => state.app.isForgotPassword,
  );

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const { setRequestField } = useFieldRequest();

  const { postAuthResponse, onResendOtp } = useAuth();
  const {
    onVerifyOTP,
    onVerifyForgotPasswordOTP,
    postAuthResponse: verifyOTPResponse,
  } = useAuth();

  const router = useRouter();

  const handleRoute = (value: string) => {
    router.push(value);
  };

  useEffect(() => {
    if (postAuthResponse.isSuccess) {
      form.resetFields();
    }
  }, [postAuthResponse.isSuccess]);

  return (
    <>
      <LayoutAuth>
        <>
          <Form
            requiredMark={false}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={() => {
              if (isForgotPassword) {
                onVerifyForgotPasswordOTP();
              } else {
                onVerifyOTP();
              }
            }}
          >
            <div className="w-full mx-auto">
              <Form.Item
                name="code"
                label=""
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
                  title="Verify E-mail"
                  bgVariant="secondary"
                  className="!w-full !rounded-full"
                  disabled={!values?.code}
                  loading={verifyOTPResponse.isLoading}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-11.75">
              <p className="text-grey-300 font-arial text-base">
                Didn’t receive it?{" "}
                {postAuthResponse.isLoading ? (
                  <Spin />
                ) : (
                  <span
                    className="font-bold text-black-100 underline cursor-pointer"
                    onClick={() =>
                      onResendOtp(
                        stateUserId,
                        isForgotPassword
                          ? { isForgotPasswordOtp: true }
                          : { isSignupPasswordOtp: true },
                      )
                    }
                  >
                    Resend Code
                  </span>
                )}
              </p>
            </div>
            <p
              className="text-base font-bold text-black-100 text-center mt-11.75 underline cursor-pointer"
              onClick={() => router.back()}
            >
              Change email address
            </p>

            <div className="mt-[132px] flex justify-between items-center">
              <p
                className={otpLayoutBottom}
                onClick={() => handleRoute("terms-and-condition")}
              >
                Terms and condition
              </p>
              <p
                className={otpLayoutBottom}
                onClick={() => handleRoute("support")}
              >
                Support
              </p>
              <p
                className={otpLayoutBottom}
                onClick={() => handleRoute("privacy-policy")}
              >
                Privacy Policy
              </p>
            </div>
          </Form>
        </>
      </LayoutAuth>
    </>
  );
};

export default VerifyOtp;
