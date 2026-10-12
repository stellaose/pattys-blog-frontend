/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "#store/hook";
import {
  setAllAppKeys,
  usePatchDataMutation,
  usePutDataMutation,
} from "#/store";
import { globalApi } from "#/store/api";
import { useNotify } from "#/components/general";
import { endpoints } from "#/model/endpoints";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.app);

  const { Notify } = useNotify();

  const [patchData, patchResponse] = usePatchDataMutation();
  const [putData, putResponse] = usePutDataMutation();

  const onUpdateProfile = useCallback(async () => {
    try {
      const response: any = await patchData({
        patchUrl: endpoints.user.updateProfile,
        request: {
          userId: state.userId,
          first_name: state.request?.first_name,
          last_name: state.request?.last_name,
          user_name: state.request?.user_name,
          phone_number: state.request?.phone_number,
          gender: state.request?.gender,
          bio: state.request?.bio,
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
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, patchData]);

  const onUpdatePassword = useCallback(async () => {
    try {
      const response: any = await putData({
        putUrl: endpoints.user.updatePassword.replace(":userId", state.userId),
        request: {
          password: state.request?.current_password,
          newPassword: state.request?.password,
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
        return true;
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, putData]);

  return {
    onUpdateProfile,
    onUpdatePassword,
    patchResponse,
    putResponse,
  };
};
