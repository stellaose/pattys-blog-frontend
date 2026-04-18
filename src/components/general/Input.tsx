import React from "react";
import { Form, Input, InputProps } from "antd";
import { Rule } from "antd/es/form";
import { RiEyeCloseLine } from "react-icons/ri";

type AppInputProps = InputProps & {
  name: string;
  label: React.ReactNode;
  placeholder: string;
  type?: "text" | "password" | "email" | "tel";
  rules?: Rule[];
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
};

export const CustomInput: React.FC<AppInputProps> = ({
  name,
  placeholder,
  rules,
  type = "text",
  label,
  onChange,
  required = false,
  ...inputRest
}) => {
  const className = "!h-[60px] text-base";

  return (
    <Form.Item name={name} label={label} rules={rules} required={required}>
      {type === "text" || type === "email" || type === "tel" ? (
        <Input
          {...inputRest}
          placeholder={placeholder}
          type={type}
          className={className}
          onChange={onChange}
        />
      ) : (
        <Input.Password
          {...inputRest}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          iconRender={(visible) =>
            visible ? (
              <RiEyeCloseLine size={24} />
            ) : (
              <RiEyeCloseLine size={24} />
            )
          }
        />
      )}
    </Form.Item>
  );
};
