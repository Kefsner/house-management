import React from "react";
import { useNavigate } from "react-router-dom";

import { handleLogout } from "../../utils/authUtils";

import Header from "./Header";

/**
 * A layout component that wraps the main content of the application.
 * It includes a Header component with navigation links and provides a consistent structure
 * for different pages by rendering the `children` content passed to it.
 * 
 * Navigation links in the header allow for easy access to the Home, Profile, and Config pages,
 * and a logout function that navigates the user upon successful logout.
 * 
 * @param {LayoutProps} props The properties passed to the Layout component.
 */
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

/**
 * Defines the structure of the props expected by the Layout component.
 */
interface LayoutProps {
  children: React.ReactNode; // The content to be displayed within the layout.
}