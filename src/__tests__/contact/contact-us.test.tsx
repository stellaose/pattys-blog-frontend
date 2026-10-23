/**
 * Contact us page integration tests.
 *
 * The form posts to POST /contact; the backend saves the message and e-mails
 * it to the team inbox.
 */
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import ContactUs from "#/app/contact-us/page";
import { mockApi } from "#test/utils/api";
import { renderWithProviders, resetStore } from "#test/utils/render";
import { userEvent } from "#test/utils/user";

// The form's submit button, looked up by its visible label
const submitButton = () =>
  screen.getByRole("button", { name: /send message/i });

// Types valid values into every field the test needs
const fillForm = async () => {
  await userEvent.type(
    screen.getByPlaceholderText("Enter your full name"),
    "Ada Obi",
  );
  await userEvent.type(
    screen.getByPlaceholderText("Enter email address"),
    "ada@example.com",
  );
  // antd Select renders its options in a popup: open it, then pick a topic
  await userEvent.click(screen.getByRole("combobox"));
  const options = await screen.findAllByText("Feedback");
  await userEvent.click(options[options.length - 1]);
  await userEvent.type(
    screen.getByPlaceholderText("How can we help?"),
    "Loving Pattys so far.",
  );
};

describe("Contact us page", () => {
  // The contact page works logged out, so start every test logged out
  beforeEach(() => {
    resetStore();
  });

  // Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("keeps the submit button disabled until the form is filled", async () => {
    renderWithProviders(<ContactUs />);

    // Nothing typed yet, so the form cannot be submitted
    expect(submitButton()).toBeDisabled();

    await fillForm();

    // antd updates watched values asynchronously, hence waitFor
    await waitFor(() => expect(submitButton()).toBeEnabled());
  });

  it("sends the message to the contact endpoint and clears the form", async () => {
    // Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /contact": {
        status: 201,
        body: {
          message: "Thanks for reaching out, we will get back to you soon",
        },
      },
    });
    renderWithProviders(<ContactUs />);

    await fillForm();
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // Submit the form
    await userEvent.click(submitButton());

    // The success message from the backend is shown as a notification
    expect(
      await screen.findByText(
        "Thanks for reaching out, we will get back to you soon",
      ),
    ).toBeInTheDocument();
    // The API should receive exactly what the user entered
    expect(calls[0].body).toEqual({
      name: "Ada Obi",
      email: "ada@example.com",
      topic: "Feedback",
      message: "Loving Pattys so far.",
    });
    // A successful send clears the form
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Enter your full name")).toHaveValue(
        "",
      ),
    );
  });

  it("shows the backend error and keeps what was typed", async () => {
    // Fake a failing backend reply
    mockApi({
      "POST /contact": {
        status: 422,
        body: { message: "email must be a valid email" },
      },
    });
    renderWithProviders(<ContactUs />);

    await fillForm();
    await waitFor(() => expect(submitButton()).toBeEnabled());
    // Submit the form
    await userEvent.click(submitButton());

    // useNotify capitalises the first letter, so match case-insensitively
    expect(
      await screen.findByText(/email must be a valid email/i),
    ).toBeInTheDocument();
    // A failed send keeps what the visitor typed so they can retry
    expect(screen.getByPlaceholderText("Enter your full name")).toHaveValue(
      "Ada Obi",
    );
  });
});
