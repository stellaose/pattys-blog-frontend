import React from "react";
import { Button as AntdBtn, ButtonProps } from "antd";

type BtnProps = ButtonProps & {
  title: React.ReactNode;
  bgVariant: "primary" | "secondary" | "cancel" | "reject" | "success";
  className: string;
};

export const SubmitButton: React.FC<BtnProps> = ({
  title,
  bgVariant,
  className,
  ...btnRest
}) => {
  return (
    <>
      <AntdBtn
        {...btnRest}
        className={`${bgVariant === "primary" ? "!bg-orange !border-orange !text-white disabled:!bg-orange-disabled disabled:!border-orange-disabled" : bgVariant === "secondary" ? "!bg-lemon !border-lemon !text-black disabled:!border-lemon-disabled disabled:!bg-lemon-disabled" : bgVariant === "reject" ? "!bg-red !text-white !border-red" : bgVariant === "success" ? "!bg-green !text-white !border-green" : "!bg-transparent !text-black !border-black"} ${className} !h-15 !rounded-lg transition transform duration-300 hover:scale-105 !font-bold`}
        htmlType="submit"
      >
        {title}
      </AntdBtn>
    </>
  );
};
