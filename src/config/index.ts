'use client'
export const PROD = "development" as "development" | "production";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const FORM_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
