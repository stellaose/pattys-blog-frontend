/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "#store/hook";
import {
  setAllAppKeys,
  useDeleteDataMutation,
  useGetDataConfigQuery,
  usePatchDataMutation,
  usePostDataMutation,
} from "#/store";
import { globalApi } from "#/store/api";
import { useNotify } from "#/components/general";
import { endpoints } from "#/model/endpoints";

export type BlogParams = {
  keyword?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
};

export type LikeStatus = "like" | "dislike" | "none";

export const useGetBlogs = (isLoggedIn: boolean, params?: BlogParams) => {
  const { Notify } = useNotify();

  const { data, isLoading, isFetching, refetch, error, isError } =
    useGetDataConfigQuery(
      {
        getUrl: endpoints.blog.all,
        params,
      },
      {
        skip: !isLoggedIn,
      },
    );

  useEffect(() => {
    if (!isLoggedIn) return;

    if (isError) {
      const errorMessage =
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "Something went wrong while fetching blogs.";

      if ("data" in error) {
        Notify(errorMessage, false);
      }
    }
  }, [error, isError, isLoggedIn]);

  return {
    refetch,
    isLoading,
    isFetching,
    blogs: data?.blogs ?? [],
    pagination: data?.pagination,
  };
};

export const useGetMyBlogs = (isLoggedIn: boolean, params?: BlogParams) => {
  const { Notify } = useNotify();

  const { data, isLoading, isFetching, refetch, error, isError } =
    useGetDataConfigQuery(
      {
        getUrl: endpoints.blog.myBlogs,
        params,
      },
      {
        skip: !isLoggedIn,
      },
    );

  useEffect(() => {
    if (!isLoggedIn) return;

    if (isError) {
      const errorMessage =
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "Something went wrong while fetching your blogs.";

      if ("data" in error) {
        Notify(errorMessage, false);
      }
    }
  }, [error, isError, isLoggedIn]);

  return {
    refetch,
    isLoading,
    isFetching,
    blogs: data?.blog ?? [],
    pagination: data?.pagination,
  };
};

export const useBlog = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.app);

  const { Notify } = useNotify();

  const [postData, postResponse] = usePostDataMutation();
  const [patchData, patchResponse] = usePatchDataMutation();
  const [deleteData, deleteResponse] = useDeleteDataMutation();

  const refreshBlogs = () => {
    dispatch(globalApi.util.invalidateTags(["GetData"]));
  };

  const onCreateBlog = useCallback(async () => {
    try {
      const description = state.request?.description;

      const response: any = await postData({
        postUrl: endpoints.blog.create,
        request: {
          title: state.request?.title,
          category: state.request?.category,
          description: Array.isArray(description) ? description : [description],
        },
      });

      if (response && "data" in response) {
        Notify(response?.data?.message, true);
        dispatch(
          setAllAppKeys({
            ...state,
            request: undefined,
          }),
        );
        refreshBlogs();
        return true;
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postData]);

  const onEditBlog = useCallback(
    async (blogId: string) => {
      try {
        const description = state.request?.description;

        const response: any = await patchData({
          patchUrl: endpoints.blog.edit.replace(":blogId", blogId),
          request: {
            title: state.request?.title,
            category: state.request?.category,
            description:
              !description || Array.isArray(description)
                ? description
                : [description],
          },
        });

        if (response && "data" in response) {
          Notify(response?.data?.message, true);
          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
            }),
          );
          refreshBlogs();
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error: any) {
        Notify(
          error?.message || "Something went wrong. Please try later",
          false,
        );
      }
    },
    [Notify, state, patchData],
  );

  const onLikeDislikeBlog = useCallback(
    async (blogId: string, likeStatus: LikeStatus) => {
      try {
        const response: any = await patchData({
          patchUrl: endpoints.blog.likeStatus.replace(":blogId", blogId),
          request: {
            likeStatus,
          },
        });

        if (response && "data" in response) {
          refreshBlogs();
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error: any) {
        Notify(
          error?.message || "Something went wrong. Please try later",
          false,
        );
      }
    },
    [Notify, patchData],
  );

  const onDeleteBlog = useCallback(
    async (blogId: string) => {
      try {
        const response: any = await deleteData({
          deleteUrl: endpoints.blog.delete.replace(":blogId", blogId),
        });

        if (response && "data" in response) {
          Notify(response?.data?.message, true);
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error: any) {
        Notify(
          error?.message || "Something went wrong. Please try later",
          false,
        );
      }
    },
    [Notify, deleteData],
  );

  return {
    onCreateBlog,
    onEditBlog,
    onLikeDislikeBlog,
    onDeleteBlog,
    postResponse,
    patchResponse,
    deleteResponse,
  };
};
