/**
 * Unit tests for the antd form rules in utils/messages: the password strength
 * pattern, the Nigerian phone number pattern and the confirm-password check.
 */
import {
  confirmPasswordRule,
  passwordRule,
  phoneNumberRule,
} from "#/utils/messages";

// The regex patterns are the second rule in each array (the first is "required")
const passwordPattern = (passwordRule[1] as { pattern: RegExp }).pattern;
const phonePattern = (phoneNumberRule[1] as { pattern: RegExp }).pattern;

describe("passwordRule", () => {
  it("accepts a password with upper, lower, number and special characters", () => {
    expect(passwordPattern.test("Secret1!")).toBe(true);
    expect(passwordPattern.test("Another.Pass9")).toBe(true);
  });

  it.each([
    ["shorter than 8 characters", "Se1!a"],
    ["no uppercase letter", "secret1!"],
    ["no lowercase letter", "SECRET1!"],
    ["no number", "Secret!!"],
    ["no special character", "Secret12"],
  ])("rejects a password with %s", (_, password) => {
    expect(passwordPattern.test(password)).toBe(false);
  });
});

describe("phoneNumberRule", () => {
  it.each(["07012345678", "08012345678", "09012345678"])(
    "accepts %s",
    (phone) => {
      expect(phonePattern.test(phone)).toBe(true);
    },
  );

  it.each(["06012345678", "0801234"])("rejects %s", (phone) => {
    expect(phonePattern.test(phone)).toBe(false);
  });
});

describe("confirmPasswordRule", () => {
  // Builds the antd validator with a given value in the "password" field
  const validator = (password: string) =>
    (confirmPasswordRule[1] as any)({ getFieldValue: () => password })
      .validator;

  it("passes when both passwords match", async () => {
    await expect(validator("Secret1!")(null, "Secret1!")).resolves.toBe(
      undefined,
    );
  });

  it("fails when the passwords differ", async () => {
    await expect(validator("Secret1!")(null, "Secret2!")).rejects.toThrow(
      "Passwords do not match",
    );
  });

  // Empty confirmation is left to the "required" rule
  it("passes while the confirmation is still empty", async () => {
    await expect(validator("Secret1!")(null, "")).resolves.toBe(undefined);
  });
});
