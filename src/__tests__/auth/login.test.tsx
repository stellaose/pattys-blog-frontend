import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import Login from "#/app/auth/login/page";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore, store } from "#test/utils/render";

// + User returned by the fake login response
const user = {
  userId: "user-1",
  first_name: "Ada",
  last_name: "Lovelace",
  user_name: "ada",
  email: "ada@example.com",
};

// % Types valid values into every field the test needs
const fillForm = async (email: string, password: string) => {
  await userEvent.type(
    screen.getByPlaceholderText("Enter email address"),
    email,
  );
  await userEvent.type(
    screen.getByPlaceholderText("Enter your password"),
    password,
  );
};

// # The form's submit button, looked up by its visible label
const submitButton = () => screen.getByRole("button", { name: /log in/i });

describe("Login page", () => {
  beforeEach(() => {
    // > Start every test logged out, with empty storage and fresh mocks
    resetStore();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // ? Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the form with the submit button disabled", () => {
    renderWithProviders(<Login />);

    expect(screen.getByText("Continue your journey")).toBeInTheDocument();
    expect(submitButton()).toBeDisabled();
  });

  it("enables the submit button once e-mail and password are filled", async () => {
    renderWithProviders(<Login />);

    await fillForm("ada@example.com", "Secret1!");

    // ! antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("logs the user in, stores the token and goes to the dashboard", async () => {
    // ~ Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/login": {
        body: { message: "Login successful", token: "jwt-token", user },
      },
    });
    renderWithProviders(<Login />);

    await fillForm("ada@example.com", "Secret1!");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // % Submit the form
    await userEvent.click(submitButton());

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard"),
    );
    expect(calls).toHaveLength(1);
    // The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({
      email: "ada@example.com",
      password: "Secret1!",
    });
    // * The token is kept for later API calls and the user is marked logged in
    expect(sessionStorage.getItem(`${process.env.NEXT_PUBLIC_TOKEN}`)).toBe(
      "jwt-token",
    );
    expect(store.getState().app.isLoggedIn).toBe(true);
    expect(store.getState().app.userId).toBe("user-1");
    expect(await screen.findByText("Login successful")).toBeInTheDocument();
  });

  it("shows the backend error and stays logged out when login fails", async () => {
    // ; Fake a failing backend reply
    mockApi({
      "POST /auth/login": {
        status: 401,
        body: { message: "Invalid email or password" },
      },
    });
    renderWithProviders(<Login />);

    await fillForm("ada@example.com", "Wrong1!x");
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // : Submit the form
    await userEvent.click(submitButton());

    expect(
      await screen.findByText("Invalid email or password"),
    ).toBeInTheDocument();
    // % A failed request must not move the user on
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(store.getState().app.isLoggedIn).toBe(false);
  });

  it("links to sign up and forgot password", async () => {
    renderWithProviders(<Login />);

    await userEvent.click(screen.getByText("Forgot your password?"));
    expect(mockRouter.push).toHaveBeenCalledWith("/auth/forgot-password");

    await userEvent.click(screen.getByText(/sign up/i));
    expect(mockRouter.push).toHaveBeenCalledWith("/auth/signup");
  });
});
