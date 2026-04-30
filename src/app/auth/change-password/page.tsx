"use client";
import { LayoutAuth } from "#/components/layouts";
import React from "react";
import { Form, Col, Row } from "antd";
import { CustomInput } from "#/components/general";
import { SubmitButton } from "#/components/general";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  return (
    <>
      <LayoutAuth description="Send verification e-mail">
        <Form
          className="!mt-20 "
          requiredMark={false}
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={() => router.push("/auth/verify-otp")}
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
                  onChange={(e) => console.log(e)}
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
                    {
                      required: true,
                      message: "Confirm password is required",
                    },
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
                disabled={!values?.confirm_password || !values?.password}
              />
            </div>
          </div>
        </Form>
      </LayoutAuth>
    </>
  );
};

export default ChangePassword;
