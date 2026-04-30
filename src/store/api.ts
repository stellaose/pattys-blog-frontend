import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { State } from "#model/state";
import { FORM_METHODS, BASE_URL } from "#/config";
import { handleLogout } from "./utils/logout";
const baseUrl = BASE_URL;

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    if (endpoint === "getJobConfig" || endpoint === "uploadDoc") return headers;

    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem(`${process.env.NEXT_PUBLIC_TOKEN}`);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    postAuth: builder.mutation({
      query: (data: State.App) => {
        return {
          url: data.url,
          method: FORM_METHODS.POST,
          body: data.request,
        };
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refreshtoken",
        method: "GET",
        headers: {
          Authorization: `Bearer: ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }),
    }),
  }),
});

export const baseQueryWithReauth =
  (baseQuery: BaseQueryType): BaseQueryType =>
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    const status = result?.error?.status;
    const errorData: any = result?.error?.data;

    const isTokenExpired =
      status === 401 ||
      (status === 500 && errorData?.data?.name === "TokenExpiredError") ||
      (status === 500 && errorData?.data?.name === "JsonWebTokenError");
    // NotifySessionExpired();
    if (isTokenExpired) {
      handleLogout();

      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    }

    return result;
  };
export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: baseQueryWithReauth(baseQuery),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["GetData"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: (data: any) => {
        return {
          url: data.getUrl,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        };
      },
      providesTags: ["GetData"],
    }),
    getDataConfig: builder.query({
      query: (data: any) => ({
        url: data.getUrl,
        params: data.params,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }),
      providesTags: ["GetData"],
    }),
    getJobConfig: builder.query({
      query: (data: any) => ({
        url: data.getUrl,
        params: data.params,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_TOKEN}`,
        },
        meta: { skipAuth: true },
      }),
    }),
    postData: builder.mutation({
      query: (data: any) => ({
        url: data.postUrl,
        method: FORM_METHODS.POST,
        body: data.request,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }),
    }),
    patchData: builder.mutation({
      query: (data: any) => ({
        url: data.patchUrl,
        method: FORM_METHODS.PATCH,
        body: data.request,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }),
    }),
    uploadDoc: builder.mutation({
      query: (data: any) => ({
        url: data.postUrl,
        method: FORM_METHODS.POST,
        body: data.request,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_TOKEN}`,
        },
        meta: { skipAuth: true },
      }),
    }),
    deleteData: builder.mutation({
      query: (data: any) => ({
        url: data.deleteUrl,
        body: data.request,
        method: FORM_METHODS.DELETE,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }),
      invalidatesTags: ["GetData"],
    }),
  }),
});

export const { usePostAuthMutation, useRefreshTokenMutation } = authApi;
export const {
  useGetDataQuery,
  useGetDataConfigQuery,
  useGetJobConfigQuery,
  usePostDataMutation,
  usePatchDataMutation,
  useDeleteDataMutation,
  useUploadDocMutation,
} = globalApi;
