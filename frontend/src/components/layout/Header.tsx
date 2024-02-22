import React from "react";
import "./Header.css";

/**
 * A component that renders the application's header, including the logo and navigation links.
 * 
 * @param {HeaderProps} props - The props passed to the Header component.
 */
export default function Header(props: HeaderProps) {
  return (
    <header>
      <div className="header-title">
        <img src="/logo.png" alt="House Management Logo" id="header-logo" />
        <h1>House Management</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {props.navLinks.map((link, index) => (
            <li key={index} className="nav-link">
              <a href={link.path || "#"} onClick={link.onClick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


/**
 * Defines the structure for each navigation link in the header.
 */
interface NavLink {
  label: string; // The text label for the navigation link.
  path?: string; // The optional path to navigate to when the link is clicked.
  onClick?: () => void; // An optional click handler for the link.
}

/**
 * Defines the props expected by the Header component.
 */
interface HeaderProps {
  navLinks: NavLink[]; // An array of NavLink objects to be displayed in the header.
}