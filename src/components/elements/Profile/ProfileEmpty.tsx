import React from "react";
import { profileEmpty } from "#/styles/profile";
import { sectionText } from "#/styles/home";

type Props = {
  title: string;
  text: string;
  children?: React.ReactNode;
};

export const ProfileEmpty: React.FC<Props> = ({ title, text, children }) => {
  return (
    <div className={profileEmpty}>
      <h3 className="text-20 font-lora font-bold text-black-200">{title}</h3>
      <p className={`${sectionText} !text-sm max-w-[380px]`}>{text}</p>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};
