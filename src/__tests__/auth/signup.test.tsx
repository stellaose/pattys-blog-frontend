import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import Signup from "#/app/auth/signup/page";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore, store } from "#test/utils/render";

// # The form's submit button, looked up by its visible label
const submitButton = () =>
  screen.getByRole("button", { name: /create account/i });

// % antd Select renders its options in a popup, so open it and click one
const chooseGender = async (label: string) => {
  await userEvent.click(screen.getByRole("combobox"));
  const options = await screen.findAllByText(label);
  await userEvent.click(options[options.length - 1]);
};

// ^ Types valid values into every field the test needs
const fillForm = async ({
  password = "Secret1!",
  confirmPassword = "Secret1!",
} = {}) => {
  await userEvent.type(screen.getByPlaceholderText("Enter first name"), "Ada");
  await userEvent.type(
    screen.getByPlaceholderText("Enter last name"),
    "Lovelace",
  );
  await userEvent.type(screen.getByPlaceholderText("Enter username"), "ada");
  // & The phone field is controlled from the form's watched value, which lags
  // behind fast synthetic typing, so enter the number in one change
  await userEvent.click(screen.getByPlaceholderText("Phone Number"));
  await userEvent.paste("08012345678");
  await userEvent.type(
    screen.getByPlaceholderText("Enter email address"),
    "ada@example.com",
  );
  await chooseGender("Female");
  await userEvent.type(
    screen.getByPlaceholderText("Enter your password"),
    password,
  );
  await userEvent.type(
    screen.getByPlaceholderText("Confirm password"),
    confirmPassword,
  );
};

describe("Signup page", () => {
  beforeEach(() => {
    // & Start every test logged out, with empty storage and fresh mocks
    resetStore();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // * Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("keeps the submit button disabled until every required field is filled", async () => {
    renderWithProviders(<Signup />);

    // _ Nothing typed yet, so the form cannot be submitted
    expect(submitButton()).toBeDisabled();

    await fillForm();

    // = antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("shows an error when the passwords do not match", async () => {
    renderWithProviders(<Signup />);

    await fillForm({ confirmPassword: "Different1!" });

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
  });

  it("shows the password rules when the password is too weak", async () => {
    renderWithProviders(<Signup />);

    await userEvent.type(
      screen.getByPlaceholderText("Enter your password"),
      "weak",
    );

    expect(
      await screen.findByText(/password must contain at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it("creates the account and moves on to e-mail verification", async () => {
    // ' Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/signup": {
        body: {
          message: "Account created, check your e-mail",
          user: { userId: "user-1" },
        },
      },
    });
    renderWithProviders(<Signup />);

    await fillForm();
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // ; Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/auth/verify-otp"),
    );
    // ! The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({
      first_name: "Ada",
      last_name: "Lovelace",
      user_name: "ada",
      email: "ada@example.com",
      password: "Secret1!",
      phone_number: "08012345678",
      gender: "female",
    });
    expect(sessionStorage.getItem("email")).toBe("ada@example.com");
    expect(store.getState().app.userId).toBe("user-1");
  });

  it("shows the backend error when sign up fails", async () => {
    // # Fake a failing backend reply
    mockApi({
      "POST /auth/signup": {
        status: 409,
        body: { message: "E-mail already exists" },
      },
    });
    renderWithProviders(<Signup />);

    await fillForm();
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // @ Submit the form
    await userEvent.click(submitButton());

    expect(
      await screen.findByText("E-mail already exists"),
    ).toBeInTheDocument();
    // - A failed request must not move the user on
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("links to the login page", async () => {
    renderWithProviders(<Signup />);

    await userEvent.click(screen.getByText("Login"));

    expect(mockRouter.push).toHaveBeenCalledWith("/auth/login");
  });
});
