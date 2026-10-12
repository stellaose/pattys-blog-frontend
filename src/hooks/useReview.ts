/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "#store/hook";
import {
  setAllAppKeys,
  useDeleteDataMutation,
  useGetDataQuery,
  usePostDataMutation,
} from "#/store";
import { globalApi } from "#/store/api";
import { useNotify } from "#/components/general";
import { endpoints } from "#/model/endpoints";

export const useGetBlogReviews = (blogId: string | undefined) => {
  const { Notify } = useNotify();

  const { data, isLoading, isFetching, refetch, error, isError } =
    useGetDataQuery(
      {
        getUrl: endpoints.review.all.replace(":blogId", blogId ?? ""),
      },
      {
        skip: !blogId,
      },
    );

  useEffect(() => {
    if (!blogId) return;

    if (isError) {
      const errorMessage =
        (error as any)?.data?.message ||
        (error as any)?.message ||
        "Something went wrong while fetching comments.";

      if ("data" in error) {
        Notify(errorMessage, false);
      }
    }
  }, [error, isError, blogId]);

  return { refetch, isLoading, isFetching, reviews: data?.review ?? [] };
};

export const useReview = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.app);

  const { Notify } = useNotify();

  const [postData, postResponse] = usePostDataMutation();
  const [deleteData, deleteResponse] = useDeleteDataMutation();

  const onCreateReview = useCallback(
    async (blogId: string, review?: string) => {
      try {
        const response: any = await postData({
          postUrl: endpoints.review.create.replace(":blogId", blogId),
          request: {
            review: review ?? state.request?.review,
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
          dispatch(globalApi.util.invalidateTags(["GetData"]));
          return true;
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
    [Notify, state, postData],
  );

  const onDeleteReview = useCallback(
    async (reviewId: string) => {
      try {
        const response: any = await deleteData({
          deleteUrl: endpoints.review.delete.replace(":reviewId", reviewId),
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
    onCreateReview,
    onDeleteReview,
    postResponse,
    deleteResponse,
  };
};
