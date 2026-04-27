"use client";
import { LayoutAuth } from "#/components/layouts";
import React from "react";
import { Form, Row, Col } from "antd";
import { SubmitButton } from "#/components/elements";
import { useRouter } from "next/navigation";
import { CustomInput } from "#components/general";

const ForgotPassword = () => {
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
          onFinish={() => router.push("/verify-otp")}
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
                  onChange={(e) => console.log(e)}
                />
              </Col>
            </Row>

            <div className="pb-16 mt-7">
              <SubmitButton
                title="Send OTP"
                bgVariant="secondary"
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

export default ForgotPassword;
