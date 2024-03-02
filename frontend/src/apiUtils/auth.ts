import { apiURL } from "./constants";
import { NavigateFunction } from "react-router-dom";

/**
 * Checks if the current user is authenticated by sending a request to the server.
 * It uses the stored access token in localStorage to authenticate the request.
 * If the access token is not present, the user is considered not authenticated.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user is authenticated, otherwise `false`.
 */
export async function isAuthenticated(): Promise<boolean> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  try {
    const response = await fetch(`${apiURL}auth/status/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
}

/**
 * Attempts to refresh the user's access token by sending a POST request to the server.
 * This function relies on HTTP-only cookies sent with the request for server-side session validation.
 * On successful token refresh, the new access token is stored in localStorage.
 */
export async function refreshAccessToken(): Promise<void> {
  try {
    const response = await fetch(`${apiURL}auth/refresh/`, {
      method: "POST",
      credentials: "include", // Ensures cookies, such as session tokens, are included with the request.
    });
    if (!response.ok) {
      console.error("Failed to refresh access token:");
      return;
    }
    const responseData: { access: string } = await response.json();
    localStorage.setItem("accessToken", responseData.access);
  }
  catch (error) {
    console.error("Error refreshing access token:", error);
  }
}

/**
 * Retrieves the CSRF token from document cookies, which is necessary for making state-changing requests to the server.
 * The function searches for a cookie named "csrftoken" and returns its value.
 *
 * @returns {string} The CSRF token if found.
 * @throws {Error} If the CSRF token is not found in the cookies.
 */
export function getCsrfToken(): string {
  const cookies = document.cookie.split("; ");
  const csrfCookie = cookies.find(cookie => cookie.startsWith("csrftoken="));

  if (!csrfCookie) {
    throw new Error("CSRF token not found in cookies.");
  }

  return csrfCookie.split("=")[1];
}

/**
 * Logs out the current user by sending a POST request to the server to end the session.
 * This function also clears the access token from localStorage and navigates the user to the login page.
 * It utilizes HTTP-only cookies for session identification and optionally includes CSRF protection.
 *
 * @param {NavigateFunction} navigate - A function from React Router for programmatically navigating the user after logout.
 */
export async function handleLogout(navigate: NavigateFunction): Promise<void> {
  try {
    await fetch(`${apiURL}auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      credentials: "include",
    });
  } catch (error) {
    console.log("Error during logout:", error);
  } finally {
    localStorage.removeItem("accessToken");
    navigate("/auth");
  }
}
