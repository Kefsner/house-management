import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, refreshAccessToken } from "../apiUtils/auth";

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
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async (): Promise<void> => {
      let authenticated: boolean = await isAuthenticated();
      if (!authenticated) {
        await refreshAccessToken();
        authenticated = await isAuthenticated();
      }
      if (authenticated) {
        navigate(sessionStorage.getItem("nextPath") || "/");
      } else {
        navigate("/auth");
      }
    };
    if (url !== "/auth") {
      sessionStorage.setItem("nextPath", url);
    }
    checkAuthStatus();
  }, [navigate, url]);
}
