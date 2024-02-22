import React from "react";
import "./Header.css";

// Define the type for each navigation link
interface NavLink {
  label: string;
  path?: string; // Optional because a link might not always navigate to a new path (could be a button)
  onClick?: () => void; // Optional onClick handler
}

// Define the props expected by the Header component
interface HeaderProps {
  navLinks: NavLink[]; // Array of NavLink objects
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  return (
    <header>
      <div className="header-title">
        <img src="/logo.png" alt="House Management Logo" id="header-logo" />
        <h1>House Management</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label} className="nav-link">
              <a href={link.path || "#"} onClick={link.onClick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
