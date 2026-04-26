import React from "react";
import Image from "next/image";
import { Loader } from "#assets/svg";

const Loading = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <Image src={Loader} alt="" className="m-auto" loading="eager" />
    </div>
  );
};

export default Loading;
