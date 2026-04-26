import React from "react";
import Image from "next/image";
import { Loader } from "#assets/svg";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image src={Loader} alt="" className="" loading="eager"/>
    </div>
  );
};

export default Loading;
