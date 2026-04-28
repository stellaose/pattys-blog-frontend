"use client";
import { AppLayouts } from "#components/layouts";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { MdOutlineError } from "react-icons/md";
const NotFound = () => {
  const router = useRouter();
  
  return (
    <AppLayouts>
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <div className="items-center flex flex-col gap-y-3">
          <MdOutlineError size={100} color="#969191" />
          <p className="text-base font-medium">Oh no!</p>
          <p className="text-base font-medium">You made a wrong turn</p>
          <Button
            htmlType="button"
            onClick={() => router.back()}
            className="!px-20 !h-12 !bg-grey-icon !border-grey-icon !text-white !text-base !font-bold transform transition duration-300 hover:scale-105"
          >
            Go back!
          </Button>
        </div>
      </div>
    </AppLayouts>
  );
};

export default NotFound;
