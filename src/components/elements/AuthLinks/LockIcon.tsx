import React from "react";
import { IoLockClosed } from "react-icons/io5";
import { otpIconTile, otpIconTileInner } from "#/styles/auth";

export const LockIcon = () => {
  return (
    <div className={otpIconTile}>
      <div className={otpIconTileInner}>
        <IoLockClosed size={30} color="#ffffff" />
      </div>
    </div>
  );
};
