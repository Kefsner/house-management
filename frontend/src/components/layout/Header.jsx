import React from "react";

import "./Header.css";

export default function Header({ navLinks }) {
  return (
    <header>
      <div className="header-title">
        <img src="/logo.png" alt="House Management Logo" id="header-logo" />
        <h1>House Management</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {navLinks.map((link) => {
            return (
              <li key={link.label} className="nav-link">
                <a href={link.path || "#"} onClick={link.onClick || null}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
