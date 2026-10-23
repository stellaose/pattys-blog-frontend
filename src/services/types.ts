import { ReactNode } from "react";

export interface ApiError {
  status: number;
  data: {
    message: string;
    name?: string;
  };
}

export type ErrorResponse = {
  response: {
    data: {
      message: string;
      error: string;
    };
  };
};

export type ChildrenProps = {
  children?: ReactNode;
  component?: any;
};

export type BlogParams = {
  keyword?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
};

export type LikeStatus = "like" | "dislike" | "none";