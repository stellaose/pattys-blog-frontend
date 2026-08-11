/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "#store/hook";
import {
  setAllAppKeys,
  usePostAuthMutation,
  usePostDataMutation,
  usePutDataMutation,
} from "#/store";
import { useNotify } from "#/components/general";
import { endpoints } from "#/model/endpoints";
import { useRouter } from "next/navigation";
import { handleLogout } from "#/store/utils/logout";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.app);

  const { Notify } = useNotify();
  const router = useRouter();
  const [postAuth, postAuthResponse] = usePostAuthMutation();
  const [putData, putResponse] = usePutDataMutation();

  const [postData, postResponse] = usePostDataMutation();

  const onSignup = useCallback(async () => {
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.signup,
        request: {
          first_name: state.request.first_name,
          last_name: state.request.last_name,
          user_name: state.request.user_name,
          email: state.request.email,
          password: state.request.password,
          phone_number: state.request.phone_number,
          gender: state.request.gender,
          bio: state.request.bio,
        },
      });

      if (response && "data" in response) {
        if ("user" in response.data) {
          Notify(response?.data?.message, true);
          sessionStorage.setItem("email", state.request.email ?? "");

          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
              userId: response?.data?.user?.userId,
            }),
          );

          router.push("/auth/verify-otp");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onVerifyOTP = useCallback(async () => {
    const email = sessionStorage.getItem("email");
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.verifyOtp,
        request: {
          email: email,
          code: Number(state.request.code),
        },
      });

      if (response && "data" in response) {
        Notify(response?.data?.message, true);
        sessionStorage.removeItem("email");
        dispatch(
          setAllAppKeys({
            ...state,
            request: undefined,
          }),
        );

        router.push("/auth/login");
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onResendOtp = useCallback(
    async (userId: string, payload: any) => {
      try {
        const response: any = await postAuth({
          ...state,
          url: endpoints.auth.resendOtp.replace(":userId", userId),
          request: payload,
        });
        if (response && "data" in response) {
          if ("user" in response.data) {
            console.log(response?.data?.message);
            Notify(response?.data?.message, true);

            dispatch(
              setAllAppKeys({
                ...state,
                request: undefined,
              }),
            );
          }
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
    [Notify, state, postAuth],
  );

  const onLogin = useCallback(async () => {
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.login,
        request: {
          email: state.request.email,
          password: state.request.password,
        },
      });

      if (response && "data" in response) {
        if ("user" in response.data) {
          Notify(response?.data?.message, true);

          sessionStorage.setItem(
            `${process.env.NEXT_PUBLIC_TOKEN}`,
            response?.data?.token,
          );
          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
              isLoggedIn: true,
              userId: response?.data?.user?.userId,
              user: response?.data?.user,
            }),
          );

          router.push("/");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onForgotPassword = useCallback(async () => {
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.forgotPassword,
        request: {
          email: state.request.email,
        },
      });

      if (response && "data" in response) {
        if ("data" in response.data) {
          sessionStorage.setItem("email", state.request.email);

          Notify(response?.data?.message, true);

          dispatch(
            setAllAppKeys({
              ...state,
              userId: response?.data?.data?.userId,
              isForgotPassword: true,
              request: undefined,
            }),
          );

          router.push("/auth/verify-otp");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onVerifyForgotPasswordOTP = useCallback(async () => {
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.verifyForgotPasswordOtp,
        request: {
          userId: state.userId,
          code: Number(state.request.code),
        },
      });

      if (response && "data" in response) {
        if ("user" in response.data) {
          Notify(response?.data?.message, true);
          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
              isForgotPassword: false,
            }),
          );
          router.push("/auth/reset-password");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onChangePassword = useCallback(async () => {
    try {
      const response: any = await putData({
        ...state,
        postUrl: endpoints.auth.changePassword,
        request: {
          userId: state.userId,
          password: state.request.password,
        },
      });

      if (response && "data" in response) {
        if ("data" in response?.data) {
          Notify(response?.data?.message, true);

          handleLogout();
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, putData, router]);

  const onResetPassword = useCallback(async () => {
    try {
      const response: any = await postAuth({
        ...state,
        url: endpoints.auth.resetPassword,
        request: {
          userId: state.userId,
          password: state.request.password,
        },
      });

      if (response && "data" in response) {
        if ("data" in response.data || "user" in response.data) {
          Notify(response?.data?.message, true);
          sessionStorage.clear();
          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
            }),
          );
          router.push("/auth/login");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onLogout = useCallback(async () => {
    try {
      const response: any = await postData({
        ...state,
        postUrl: endpoints.auth.logout,
      });

      if (response && "data" in response) {
        sessionStorage.clear();
        handleLogout();
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error: any) {
      Notify(error?.message || "Something went wrong. Please try later", false);
    }
  }, [postData]);

  return {
    onSignup,
    onLogin,
    onVerifyOTP,
    postAuthResponse,
    postResponse,
    putResponse,
    onLogout,
    onForgotPassword,
    onChangePassword,
    onResetPassword,
    onResendOtp,
    onVerifyForgotPasswordOTP,
  };
};
