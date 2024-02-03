import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, handleLogout } from "../../utils/authUtils";

import Header from "./partials/Header";

export default function Layout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);

  const onLogout = () => {
    handleLogout(navigate);
  };

  return (
    <>
      <Header
        navLinks={[
          { label: "Home", onClick: () => navigate("/") },
          { label: "Profile", onClick: () => navigate("/profile") },
          { label: "Config", onClick: () => navigate("/config") },
          { label: "Logout", onClick: onLogout },
        ]}
      />
      <main className="layout-content">{children}</main>
    </>
  );
}
