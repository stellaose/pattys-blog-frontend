import React from "react";
import { Facebook, Google } from ".";

export const PlatformLogin = () => {
  return (
    <div className="flex items-center mt-10 justify-center gap-x-4">
      <Google />
      <Facebook />
    </div>
  );
};
