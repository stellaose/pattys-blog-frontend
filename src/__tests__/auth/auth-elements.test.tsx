import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "#test/utils/user";
import { AuthLinks, PlatformLogin } from "#components/elements";
import { mockRouter } from "#test/mocks/navigation";

describe("AuthLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ! Each footer link should route to its page
  it.each([
    ["Terms and condition", "/terms-and-conditions"],
    ["Support", "/contact-us"],
    ["Privacy Policy", "/privacy-policy"],
  ])("opens %s", async (label, path) => {
    render(<AuthLinks />);

    await userEvent.click(screen.getByText(label));

    expect(mockRouter.push).toHaveBeenCalledWith(path);
  });
});

describe("PlatformLogin", () => {
  // ? The social buttons are display-only for now, so just check they render
  it("offers Google and Facebook sign in", () => {
    render(<PlatformLogin />);

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });
});
