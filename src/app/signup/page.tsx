"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import SignupImg from "#assets/images/signup.jpg";

const Signup = () => {
  return (
    <>
      <AuthLayout image={SignupImg}>
        <div></div>
      </AuthLayout>
    </>
  );
};

export default Signup;
