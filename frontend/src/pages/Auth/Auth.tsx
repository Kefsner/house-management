import React from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import AuthForm from "./components/AuthForm";
import "./Auth.scss";

/**
 * The Auth component renders the authentication form and handles user redirection based on their authentication status.
 * Utilizes the useAuthCheck hook to check the user's authentication status and redirect accordingly.
 */
export default function Auth(props: AuthProps) {
  useAuthCheck(props.url);
  return (
    <div className="bg-image">
      <div className="content-container">
        <img src="/logo.png" alt="Logo" id="login-logo" />
        <AuthForm />
      </div>
    </div>
  );
}


/**
 * Props for the Auth component.
 */
interface AuthProps {
  url: string; // The current URL path the user is attempting to access, used for redirection after successful authentication.
}