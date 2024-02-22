import { apiURL } from "./constants";
import { NavigateFunction } from "react-router-dom";

/**
 * Asynchronously checks if the current user is authenticated by sending a request to the server.
 * This function relies on HTTP-only cookies sent with the request for server-side session validation.
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
    return false;
  }
}

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
 * Retrieves the CSRF token from document cookies, necessary for making state-changing requests to the server.
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
 * Asynchronously logs out the current user by instructing the server to end the session.
 * This action is secured by utilizing HTTP-only cookies for session identification and optional CSRF protection.
 *
 * @param {NavigateFunction} navigate - A function from React Router for programmatically navigating the user.
 * @returns {Promise<void>} A promise that resolves when the logout process has been completed.
 */
export async function handleLogout(navigate: NavigateFunction): Promise<void> {
  try {
    await fetch(`${apiURL}auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
