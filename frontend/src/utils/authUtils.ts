import { jwtDecode } from "jwt-decode";
import { apiURL } from "./constants";
import { NavigateFunction } from "react-router-dom";

/**
 * Interface representing the expected structure of a decoded JWT token
 */
interface IDecodedToken {
  /**
   * The expiration time of the token as a Unix timestamp (number of seconds since the Unix Epoch).
   * This field is optional as not all JWT tokens may include an `exp` claim.
   */
  exp?: number;
}

/**
 * Checks if the current user is authenticated based on the presence and validity of a JWT token stored in localStorage.
 *
 * @returns {boolean} `true` if the user is authenticated (i.e., a valid token exists and has not expired), otherwise `false`.
 */
export function isAuthenticated(): boolean {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // If no token is found, return false indicating the user is not authenticated
  if (!token) {
    return false;
  }

  // Decode the token to access its payload, specifically looking for the `exp` field
  const decodedToken = jwtDecode<IDecodedToken>(token);

  // Check if the `exp` field exists and the token has not yet expired
  if (!decodedToken.exp || decodedToken.exp * 1000 <= Date.now()) {
    // If `exp` does not exist or the token is expired, return false
    return false;
  }

  // If the token exists and is not expired, return true indicating the user is authenticated
  return true;
}

/**
 * Retrieves the CSRF token from document cookies.
 *
 * This function parses the cookies present in the document and attempts to find
 * the CSRF token used for securing requests against cross-site request forgery attacks.
 * The CSRF token is typically set by the server in a cookie and must be included in
 * requests that perform state-changing operations.
 *
 * @returns {string} The CSRF token if found.
 * @throws {Error} If the CSRF token is not found in the cookies.
 */
export function getCsrfToken(): string {
  // Retrieve the document's cookies and split them into individual cookies
  const cookies = document.cookie.split("; ");

  // Attempt to find the cookie that contains the CSRF token
  const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));

  // If the CSRF cookie is not found, throw an error indicating the token is missing
  if (!csrfCookie) {
    throw new Error("CSRF token not found in cookies.");
  }

  // Extract the CSRF token from the cookie
  const csrfToken = csrfCookie.split("=")[1];

  // Return the CSRF token
  return csrfToken;
}

/**
 * Asynchronously handles the user logout process.
 * 
 * This function performs several key actions to securely log out the user:
 * 1. It makes a POST request to the backend logout endpoint.
 * 2. It clears the user's session data from localStorage, including tokens and user identifiers.
 * 3. It navigates the user to the authentication page.
 * 
 * @param {NavigateFunction} navigate - The navigation function provided by React Router v6 to programmatically navigate the user.
 * @returns {Promise<void>} A promise that resolves when the logout process has completed. The promise does not return any value.
 */
export async function handleLogout(navigate: NavigateFunction): Promise<void> {
  try {
    // Define the API endpoint for the logout operation.
    const apiEndpoint: string = `auth/logout/`;
    
    // Perform the logout request to the server.
    const response: Response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "POST", // Use POST method for the logout request.
      headers: {
        "Content-Type": "application/json", // Indicate that the request body format is JSON.
        "X-CSRFToken": getCsrfToken(), // Include the CSRF token for security.
      },
    });
  } catch (error) {
    // Log any errors that occur during the fetch operation to the console.
    console.error(error);
  } finally {
    // Regardless of the logout request's outcome, clear session-related data from localStorage.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // Navigate the user to the authentication page ("/auth").
    navigate("/auth");
  }
}
