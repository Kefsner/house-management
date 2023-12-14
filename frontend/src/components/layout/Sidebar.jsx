import React from "react";

import Card from "../common/Card";

import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-main">
        <Card className="sidebar-main-card" />
      </div>
      <div className="sidebar-footer">
        <Card className="sidebar-user-card" handleLogout={props.handleLogout} />
        <Card className="sidebar-app-card" />
      </div>
    </aside>
  );
}
