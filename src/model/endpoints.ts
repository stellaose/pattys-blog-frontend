export const endpoints = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    verifyOtp: "/auth/verify-email",
    verifyForgotPasswordOtp: "/auth/verify-forget-password",
    changePassword: "/auth/change-password",
    logout: "/auth/logout",
    resetPassword: "/auth/reset-password",
    resendOtp: "/auth/resend-otp/:userId",
    logoutAll: "/auth/logout",
  },
  user: {
    profile: "/auth/my-profile",
    updateProfile: "/auth/update-me",
    updatePassword: "/auth/change-password/:userId",
  },
  blog: {
    all: "/blog/all",
    myBlogs: "/blog/my-blogs",
    create: "/blog/create",
    edit: "/blog/edit/:blogId",
    likeStatus: "/blog/status/:blogId",
    delete: "/blog/delete/:blogId",
  },
  review: {
    all: "/review/:blogId",
    create: "/review/:blogId",
    delete: "/review/:reviewId",
  },
};
