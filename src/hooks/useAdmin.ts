/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetDataQuery, setAppKey } from "#/store";
import { useNotify } from "#components/general";
import { useAppDispatch } from "#store/hook";
import { endpoints } from "#model/endpoints";

export const useGetLoggedInUser = (isLoggedIn: boolean) => {
  const dispatch = useAppDispatch();

  const { Notify } = useNotify();

  const { data, isLoading, refetch, error, isError } = useGetDataQuery(
    {
      getUrl: endpoints.user.profile,
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
        "Something went wrong while fetching admin details.";

      if ("data" in error) {
        Notify(errorMessage, false);
      }
      return;
    }

    if (data?.user) {
      dispatch(setAppKey({ key: "user", value: data.user }));
    }
  }, [data, error, isError, isLoggedIn, Notify]);

  return { refetch, isLoading, data:data?.user };
};
