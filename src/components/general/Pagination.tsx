import React from "react";
import { Pagination as AntPagination } from "antd";

type PaginationProps = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
  className = "flex justify-center mt-8",
}) => {
  if (total <= pageSize) return null;

  return (
    <div className={className}>
      <AntPagination
        simple
        current={current}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={onChange}
      />
    </div>
  );
};
