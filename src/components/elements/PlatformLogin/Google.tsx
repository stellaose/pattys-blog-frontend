import React from "react";
import { BiLogoGoogle } from "react-icons/bi";

export const Google = () => {
  return (
    <div className="flex items-center gap-x-4 w-full justify-center border rounded-lg border-white-150 h-12.25 cursor-pointer transition transform duration-300 hover:scale-105">
      <BiLogoGoogle size={20} /> <span className="text-black-200 text-xs">Google</span>
    </div>
  );
};
