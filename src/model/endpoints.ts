export const endpoints = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    verifyOtp: "/auth/verify-email",
    changePassword: "/auth/change-password",
    logout: "/auth/logout",
    resetPassword: "/auth/resetpassword",
    resendOtp: "/auth/resend-otp/:userId",
    logoutAll: "/auth/logout",
  },
  user: {
    profile: "/auth/my-profile",
  },
};
