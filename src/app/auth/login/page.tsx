"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import { Form, Col, Row } from "antd";
import { CustomInput } from "#components/general";
import { SubmitButton } from "#components/general";
import { Logo, LoginImg } from "#assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, useFieldRequest } from "#/hooks";
import { useAppSelector } from "#store/hook";

const Login = () => {
  const router = useRouter();
  const state = useAppSelector((state) => state.app);

  const { onLogin, postAuthResponse } = useAuth();

  const { setRequestField } = useFieldRequest();

  const [form] = Form.useForm();

  return (
    <>
      <AuthLayout image={LoginImg}>
        <>
          <div className="2lg:w-9/10 xxl:w-4/5 md:w-3/4 sm:w-4/5 w-9/10 !mx-auto h-full flex flex-col justify-center ">
            <div className="flex flex-col justify-center items-center pt-[56px] gap-y-5">
              <Image
                src={Logo}
                alt=""
                className="h-[50px] w-auto"
                loading="eager"
              />
              <p>Welcome back!</p>
            </div>

            <Form
              className="!mt-20 flex flex-col gap-y-8"
              requiredMark={false}
              layout="vertical"
              autoComplete="off"
              form={form}
              onFinish={onLogin}
            >
              <Row
                gutter={24}
                className="flex flex-col gap-y-2 justify-between items-center"
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
                <Col span={24}>
                  {" "}
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder="**********"
                    label={
                      <p className="text-base">
                        Password <span className="text-red">*</span>{" "}
                      </p>
                    }
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
              </Row>

              <div>
                <SubmitButton
                  title="Log in"
                  bgVariant="secondary"
                  className="!w-full"
                  loading={postAuthResponse.isLoading}
                  disabled={!state.request?.email || !state.request?.password}
                />
                <div className="flex justify-between items-center">
                  <p
                    className="italic mt-2 font-bold cursor-pointer hover:underline"
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot your password?
                  </p>
                  <p className="italic mt-2">
                    If you don&apos;t have an account, Please{" "}
                    <span
                      className="text-orange font-medium cursor-pointer hover:underline"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Signup
                    </span>
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Login;
