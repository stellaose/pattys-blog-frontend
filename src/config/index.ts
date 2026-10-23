"use client";
export const PROD = process.env.NEXT_PUBLIC_NODE_ENV;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// export const BASE_URL = "https://pattys-blog-backend.onrender.com/api/v1";

export const FORM_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
