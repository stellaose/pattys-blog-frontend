/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "#store/hook";
import {
  setAllAppKeys,
  usePostAuthMutation,
  usePostDataMutation,
} from "#/store";
import { useNotify } from "#/components/general";
import { endpoints, resendOtp } from "#/model/endpoints";
import { useRouter } from "next/navigation";
import { handleLogout } from "#/store/utils/logout";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.app);

  const { Notify } = useNotify();
  const router = useRouter();
  const [postAuth, postAuthResponse] = usePostAuthMutation();

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
          sessionStorage.setItem("userId", response?.data?.user?.userId ?? "");

          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
            }),
          );

          router.push("/auth/verify-otp");
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error) {
      Notify("Something went wrong. Please try later", false);
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
    } catch (error) {
      Notify("Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onResendOtp = useCallback(
    async (userId: string, isOtp: boolean) => {
      try {
        const response: any = await postAuth({
          ...state,
          url: resendOtp(userId),
          request: {
            isSignupPasswordOtp: isOtp,
          },
        });
        if (response && "data" in response) {
          if ("data" in response.data) {
            Notify(response?.data?.message, true);
          }
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error) {
        Notify("Something went wrong. Please try later", false);
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

      const user = response?.data?.data?.user;
      if (response && "data" in response) {
        if ("data" in response.data) {
          Notify(response?.data?.message, true);

          sessionStorage.setItem(
            `${process.env.NEXT_PUBLIC_TOKEN}`,
            response?.data?.data?.token,
          );
          dispatch(
            setAllAppKeys({
              ...state,
              request: undefined,
              isLoggedIn: true,
              userId: response?.data?.user?.userId,
            }),
          );
        }
      } else {
        Notify(response?.error?.data?.message, false);
      }
    } catch (error) {
      Notify("Something went wrong. Please try later", false);
    }
  }, [Notify, state, postAuth]);

  const onForgotPassword = useCallback(
    async (setVerificationModal?: any, setForgotModal?: any) => {
      try {
        const response: any = await postAuth({
          ...state,
          url: endpoints.auth.forgotPassword,
          request: {
            email: state.request.email,
            ispasswordreset: true,
          },
        });

        if (response && "data" in response) {
          if ("data" in response.data) {
            sessionStorage.setItem("email", state.request.email);

            Notify(response?.data?.message, true);
            setForgotModal(false);
            setVerificationModal(true);

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
      } catch (error) {
        Notify("Something went wrong. Please try later", false);
      }
    },
    [Notify, state, postAuth],
  );

  const changePassword = useCallback(
    async (payload: object | any) => {
      try {
        const response: any = await postData({
          ...state,
          postUrl: endpoints.auth.changePassword,
          request: payload,
        });

        if (response && "data" in response) {
          if ("data" in response?.data) {
            Notify(response?.data?.message, true);

            handleLogout();
          }
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error) {
        Notify("Something went wrong. Please try later", false);
      }
    },
    [Notify, state, postData, router],
  );

  const onResetPassword = useCallback(
    async (setVerificationModal?: any) => {
      try {
        const response: any = await postData({
          ...state,
          postUrl: endpoints.auth.resetPassword,
          request: {
            password: state.request.password,
            confirmpassword: state.request.confirmpassword,
          },
        });

        if (response && "data" in response) {
          if ("data" in response.data) {
            Notify(response?.data?.message, true);
            sessionStorage.clear();
            dispatch(
              setAllAppKeys({
                ...state,
                request: undefined,
              }),
            );
            setVerificationModal(false);
          }
        } else {
          Notify(response?.error?.data?.message, false);
        }
      } catch (error) {
        Notify("Something went wrong. Please try later", false);
      }
    },
    [Notify, state, postData],
  );

  const onLogout = useCallback(async () => {
    sessionStorage.clear();
    handleLogout();
  }, []);

  return {
    onSignup,
    onLogin,
    onVerifyOTP,
    postAuthResponse,
    postResponse,
    onLogout,
    onForgotPassword,
    changePassword,
    onResetPassword,
    onResendOtp,
  };
};
