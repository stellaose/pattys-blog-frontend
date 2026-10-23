import React from "react";
import Image from "next/image";
import { Skeleton } from "antd";
import { Loader as ImgLoader } from "#assets/svg";

export const Loader = () => {
  return (
    <>
      {" "}
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div>
          <Image src={ImgLoader} alt="" className="m-auto" loading="eager" />
          <p className="text-lg font-semibold text-center">Loading</p>
        </div>
      </div>
    </>
  );
};

type SkeletonLoaderProps = {
  count?: number;
  rows?: number;
  avatar?: boolean;
  className?: string;
  wrapperClassName?: string;
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  rows = 3,
  avatar = false,
  className,
  wrapperClassName,
}) => {
  const items = Array.from({ length: count }, (_, index) =>
    className ? (
      <div key={index} className={className}>
        <Skeleton active avatar={avatar} paragraph={{ rows }} />
      </div>
    ) : (
      <Skeleton key={index} active avatar={avatar} paragraph={{ rows }} />
    ),
  );

  if (!wrapperClassName) return <>{items}</>;

  return <div className={wrapperClassName}>{items}</div>;
};
