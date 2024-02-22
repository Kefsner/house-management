import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, refreshAccessToken } from "../utils/authUtils";

/**
 * A custom React hook to ensure user authentication status and handle redirections appropriately.
 * This hook checks if the user is currently authenticated. If the user is not authenticated,
 * they are redirected to the login page, and the intended destination URL is stored for post-login redirection.
 * Conversely, if the user is already authenticated and tries to access the login page,
 * they are redirected to either a previously attempted URL (if any) or the homepage.
 *
 * @param {string} url - The current URL path the user is attempting to access.
 */
export default function useAuthCheck(url: string): void {
  const navigate = useNavigate(); // Hook from react-router-dom for programmable navigation

  useEffect(() => {
    // Define an asynchronous function to check the authentication status of the user
    const checkAuthStatus = async (): Promise<void> => {
      try {
        // Await the resolution of isAuthenticated to determine if the user is authenticated
        let authenticated: boolean = await isAuthenticated();
        
        if (!authenticated) {
          // If the user is not authenticated, attempt to refresh the access token
          await refreshAccessToken();
          authenticated = await isAuthenticated();
        }
        
        if (authenticated) {
          // If the user is authenticated, redirect them to the previously attempted URL or the homepage
          navigate(sessionStorage.getItem("nextPath") || "/");
          sessionStorage.removeItem("nextPath"); // Clean up the stored URL as it's no longer needed
        } else {
          // If the user is not authenticated, store the current URL for redirection after login
          sessionStorage.setItem("nextPath", url);
          navigate("/auth"); // Redirect the user to the login page
        }
      } catch (error) {
        // Log any errors that occur during the authentication check process
        console.error("Error checking authentication status:", error);
      }
    };

    // Invoke the checkAuthStatus function
    checkAuthStatus();
  }, [navigate, url]); // Re-run this effect if `navigate` or `url` changes
}
