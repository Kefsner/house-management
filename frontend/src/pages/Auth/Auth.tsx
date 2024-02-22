import React from "react";

import useAuthCheck from "../../hooks/useAuthCheck";

import AuthForm from "./AuthForm";

import "./Auth.css";

// Define the shape of props expected by the Auth component.
interface AuthProps {
  // The URL where the authentication process is handled or redirected.
  url: string;
}

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
