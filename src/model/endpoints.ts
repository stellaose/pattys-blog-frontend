export const endpoints = {
  auth: {
    signup: "/user/auth/signup",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    verifyOtp: "/user/auth/verify-email",
    changePassword: "/auth/change-password",
    logout: "/auth/logout",
    resetPassword: "/auth/resetpassword",
  },
};

export const resendOtp = (userId: string) => `/user/auth/resend-otp/${userId}`;
