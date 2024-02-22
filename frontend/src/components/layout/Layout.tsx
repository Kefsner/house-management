import React from "react";
import { useNavigate } from "react-router-dom";

import { handleLogout } from "../../utils/authUtils";

import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const navigate = useNavigate();

  return (
    <>
      <Header
        navLinks={[
          { label: "Home", onClick: () => navigate("/") },
          { label: "Profile", onClick: () => navigate("/profile") },
          { label: "Config", onClick: () => navigate("/config") },
          { label: "Logout", onClick: () => handleLogout(navigate) },
        ]}
      />
      <main className="layout-content">{props.children}</main>
    </>
  );
}
