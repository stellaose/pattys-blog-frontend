import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import ForgotPassword from "#/app/auth/forgot-password/page";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore, store } from "#test/utils/render";

//  ! The form's submit button, looked up by its visible label
const submitButton = () => screen.getByRole("button", { name: /send otp/i });

describe("Forgot password page", () => {
  beforeEach(() => {
    // > Start every test logged out, with empty storage and fresh mocks
    resetStore();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // < Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("keeps the submit button disabled until an e-mail is entered", async () => {
    renderWithProviders(<ForgotPassword />);

    // # Nothing typed yet, so the form cannot be submitted
    expect(submitButton()).toBeDisabled();

    await userEvent.type(
      screen.getByPlaceholderText("Enter email address"),
      "ada@example.com",
    );

    //  ^ antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("sends the code and moves on to verification in forgot-password mode", async () => {
    // & Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/forgot-password": {
        body: { message: "Code sent", data: { userId: "user-1" } },
      },
    });
    renderWithProviders(<ForgotPassword />);

    await userEvent.type(
      screen.getByPlaceholderText("Enter email address"),
      "ada@example.com",
    );
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // ` Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/auth/verify-otp"),
    );
    //  * The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({ email: "ada@example.com" });
    expect(sessionStorage.getItem("email")).toBe("ada@example.com");
    expect(store.getState().app.isForgotPassword).toBe(true);
    expect(store.getState().app.userId).toBe("user-1");
  });

  it("shows the backend error for an unknown e-mail", async () => {
    // @ Fake a failing backend reply
    mockApi({
      "POST /auth/forgot-password": {
        status: 404,
        body: { message: "User not found" },
      },
    });
    renderWithProviders(<ForgotPassword />);

    await userEvent.type(
      screen.getByPlaceholderText("Enter email address"),
      "nobody@example.com",
    );
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // ! Submit the form
    await userEvent.click(submitButton());

    expect(await screen.findByText("User not found")).toBeInTheDocument();
    // +  A failed request must not move the user on
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("links back to the login page", async () => {
    renderWithProviders(<ForgotPassword />);

    await userEvent.click(screen.getByText("Back to login"));

    expect(mockRouter.push).toHaveBeenCalledWith("/auth/login");
  });
});
