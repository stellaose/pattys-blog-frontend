import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import VerifyOtp from "#/app/auth/verify-otp/page";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore } from "#test/utils/render";

// - The form's submit button, looked up by its visible label
const submitButton = () =>
  screen.getByRole("button", { name: /verify e-mail/i });

// + Typing into the first OTP box; antd moves focus through the other boxes
const typeCode = async (code: string) => {
  await userEvent.type(screen.getByLabelText("OTP Input 1"), code);
};

describe("Verify OTP page", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // ! Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("verifies the sign-up code and sends the user to login", async () => {
    resetStore({ userId: "user-1" });
    sessionStorage.setItem("email", "ada@example.com");
    // = Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/verify-email": { body: { message: "E-mail verified" } },
    });
    renderWithProviders(<VerifyOtp />);

    await typeCode("123456");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // < Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/auth/login"),
    );
    // ? The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({ email: "ada@example.com", code: 123456 });
    expect(sessionStorage.getItem("email")).toBeNull();
  });

  it("verifies a forgot-password code and sends the user to reset password", async () => {
    // > Forgot-password flow: the store says which user is resetting
    resetStore({ userId: "user-1", isForgotPassword: true });
    // @ Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/verify-forget-password": {
        body: { message: "Code verified", user: { userId: "user-1" } },
      },
    });
    renderWithProviders(<VerifyOtp />);

    await typeCode("654321");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // ` Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/auth/reset-password"),
    );
    // $ The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({ userId: "user-1", code: 654321 });
  });

  it("shows the backend error for a wrong code", async () => {
    resetStore({ userId: "user-1" });
    sessionStorage.setItem("email", "ada@example.com");
    // % Fake a failing backend reply
    mockApi({
      "POST /auth/verify-email": {
        status: 400,
        body: { message: "Invalid or expired code" },
      },
    });
    renderWithProviders(<VerifyOtp />);

    await typeCode("000000");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // * Submit the form
    await userEvent.click(submitButton());

    expect(
      await screen.findByText("Invalid or expired code"),
    ).toBeInTheDocument();
    // @ A failed request must not move the user on
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("resends the sign-up code", async () => {
    resetStore({ userId: "user-1" });
    // ' Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/resend-otp/user-1": {
        body: { message: "Code resent", user: { userId: "user-1" } },
      },
    });
    renderWithProviders(<VerifyOtp />);

    await userEvent.click(screen.getByText("Resend Code"));

    expect(await screen.findByText("Code resent")).toBeInTheDocument();
    // > The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({ isSignupPasswordOtp: true });
  });

  it("goes back to change the e-mail address", async () => {
    resetStore();
    renderWithProviders(<VerifyOtp />);

    await userEvent.click(screen.getByText("Change email address"));

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
