"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { otpLayoutBottom } from "#/styles/auth";

export const AuthLinks = () => {
  const router = useRouter();

  return (
    <div className="mt-16 flex justify-between items-center">
      <p
        className={otpLayoutBottom}
        onClick={() => router.push("terms-and-condition")}
      >
        Terms and condition
      </p>
      <p className={otpLayoutBottom} onClick={() => router.push("support")}>
        Support
      </p>
      <p
        className={otpLayoutBottom}
        onClick={() => router.push("privacy-policy")}
      >
        Privacy Policy
      </p>
    </div>
  );
};
