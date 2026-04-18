"use client";
import { AuthLayout } from "#components/layouts";
import React from "react";
import { Logo, LoginImg } from "#assets/images";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <AuthLayout image={LoginImg}>
        <>
          <div>
            <div className="flex flex-col justify-center items-center pt-[56px] gap-y-5">
              <Image src={Logo} alt="" className="h-[50px] w-auto" />
              <p>Welcome to Pattys. This is going to be a fun ride! 😉</p>
            </div>
            
            
            
            <div>
              <div >
                
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Login;
