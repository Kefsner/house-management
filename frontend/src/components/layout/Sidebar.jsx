import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";

import "./Sidebar.css";

export default function Sidebar(props) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-main">
        <Card
          className="sidebar-main-card"
          icon="/icons/home.svg"
          text="Home"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="sidebar-footer">
        <Card
          className="sidebar-user-card"
          icon="/icons/user.svg"
          text={props.username}
          onClick={() => navigate("/profile")}
        />
        <Card
          className="sidebar-config-card"
          icon="/icons/gear.svg"
          text="Config"
          onClick={() => navigate("/config")}
        />
      </div>
    </aside>
  );
}
