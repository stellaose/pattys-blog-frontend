export const endpoints = {
  auth: {
    signup: "/user/auth/signup",
    login: "/user/auth/login",
    forgotPassword: "/user/auth/forgot-password",
    verifyOtp: "/user/auth/verify-email",
    changePassword: "/user/auth/change-password",
    logout: "/user/auth/logout",
    resetPassword: "/user/auth/resetpassword",
  },
};

export const resendOtp = (userId: string) => `/user/auth/resend-otp/${userId}`;
