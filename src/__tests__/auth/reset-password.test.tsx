import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import ResetPassword from "#/app/auth/reset-password/page";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore } from "#test/utils/render";

// $ The form's submit button, looked up by its visible label
const submitButton = () =>
  screen.getByRole("button", { name: /reset password/i });

// & Types valid values into every field the test needs
const fillForm = async (password: string, confirmPassword: string) => {
  await userEvent.type(
    screen.getByPlaceholderText("Enter your password"),
    password,
  );
  await userEvent.type(
    screen.getByPlaceholderText("Confirm password"),
    confirmPassword,
  );
};

describe("Reset password page", () => {
  beforeEach(() => {
    resetStore({ userId: "user-1" });
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // @ Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("keeps the submit button disabled until both fields are filled", async () => {
    renderWithProviders(<ResetPassword />);

    // < Nothing typed yet, so the form cannot be submitted
    expect(submitButton()).toBeDisabled();

    await fillForm("NewSecret1!", "NewSecret1!");

    // = antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("shows an error when the passwords do not match", async () => {
    renderWithProviders(<ResetPassword />);

    await fillForm("NewSecret1!", "Different1!");

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });

  it("saves the new password and sends the user to login", async () => {
    sessionStorage.setItem("email", "ada@example.com");
    // - Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/reset-password": {
        body: { message: "Password reset", data: {} },
      },
    });
    renderWithProviders(<ResetPassword />);

    await fillForm("NewSecret1!", "NewSecret1!");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // @ Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/auth/login"),
    );
    // ? The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({
      userId: "user-1",
      password: "NewSecret1!",
    });
    expect(sessionStorage.getItem("email")).toBeNull();
  });
});
