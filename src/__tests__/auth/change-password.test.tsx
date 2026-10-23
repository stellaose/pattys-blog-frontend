import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import ChangePassword from "#/app/auth/change-password/page";
import { mockRouter } from "#test/mocks/navigation";
import { renderWithProviders, resetStore } from "#test/utils/render";

// ? The form's submit button, looked up by its visible label
const submitButton = () =>
  screen.getByRole("button", { name: /change password/i });

describe("Change password page", () => {
  beforeEach(() => {
    // ! Changing a password is done while logged in
    resetStore({ userId: "user-1", isLoggedIn: true });
    jest.clearAllMocks();
  });

  it("keeps the submit button disabled until both fields are filled", async () => {
    renderWithProviders(<ChangePassword />);

    // @ Nothing typed yet, so the form cannot be submitted
    expect(submitButton()).toBeDisabled();

    await userEvent.type(
      screen.getByPlaceholderText("Enter your password"),
      "NewSecret1!",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Confirm password"),
      "NewSecret1!",
    );

    // # antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  // + Check if it shows an error when passwords do not match
  it("shows an error when the passwords do not match", async () => {
    renderWithProviders(<ChangePassword />);

    await userEvent.type(
      screen.getByPlaceholderText("Enter your password"),
      "NewSecret1!",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Confirm password"),
      "Different1!",
    );

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });

  it("goes back from the page", async () => {
    renderWithProviders(<ChangePassword />);

    await userEvent.click(screen.getByText("Go back"));

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
