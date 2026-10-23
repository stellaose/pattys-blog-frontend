import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { useAuth, useAuthGuard } from "#/hooks";
import { handleLogout } from "#/store/utils/logout";
import { mockRouter } from "#test/mocks/navigation";
import { mockApi } from "#test/utils/api";
import { Wrapper, resetStore, store } from "#test/utils/render";

// sessionStorage key the app stores the JWT under
const tokenKey = `${process.env.NEXT_PUBLIC_TOKEN}`;

describe("useAuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects logged-out visitors to login once the session has loaded", async () => {
    resetStore();

    const { result } = renderHook(() => useAuthGuard(), { wrapper: Wrapper });

    // ' Not allowed straight away; the redirect waits for redux-persist to load
    expect(result.current.isAllowed).toBe(false);
    await waitFor(() =>
      expect(mockRouter.replace).toHaveBeenCalledWith("/auth/login"),
    );
  });

  it("lets logged-in users through", async () => {
    resetStore({ isLoggedIn: true, userId: "user-1" });

    const { result } = renderHook(() => useAuthGuard(), { wrapper: Wrapper });

    // ;  Wait until the saved session has loaded, the point where the guard decides
    await waitFor(() =>
      expect((store.getState().app as any)._persist?.rehydrated).toBe(true),
    );
    expect(result.current.isAllowed).toBe(true);
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
});

describe("handleLogout", () => {
  it("clears the session and resets the user state", () => {
    resetStore({
      isLoggedIn: true,
      userId: "user-1",
      user: { userId: "user-1" },
    });
    sessionStorage.setItem(tokenKey, "jwt-token");

    // < Act: log out without calling the API
    handleLogout();

    expect(store.getState().app.isLoggedIn).toBe(false);
    expect(store.getState().app.userId).toBe("");
    expect(store.getState().app.user).toBeUndefined();
    expect(sessionStorage.getItem(tokenKey)).toBeNull();
  });
});

describe("useAuth onLogout", () => {
  beforeEach(() => {
    resetStore({ isLoggedIn: true, userId: "user-1" });
    sessionStorage.setItem(tokenKey, "jwt-token");
  });

  // @ Put the real fetch back after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("calls the logout endpoint with the token and logs the user out", async () => {
    // Fake the backend reply so no real request is made
    const calls = mockApi({
      "POST /auth/logout": { body: { message: "Logged out" } },
    });
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(() => result.current.onLogout());

    // ! The stored token is sent as a Bearer header
    expect(calls[0].headers.get("Authorization")).toBe("Bearer jwt-token");
    expect(store.getState().app.isLoggedIn).toBe(false);
    expect(sessionStorage.getItem(tokenKey)).toBeNull();
  });

  it("keeps the user logged in and shows the error when logout fails", async () => {
    // < Fake a failing backend reply
    mockApi({
      "POST /auth/logout": {
        status: 400,
        body: { message: "Could not log out" },
      },
    });
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(() => result.current.onLogout());

    expect(await screen.findByText("Could not log out")).toBeInTheDocument();
    expect(store.getState().app.isLoggedIn).toBe(true);
  });
});
