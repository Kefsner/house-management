import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, logErrorToServer } from "../../utils/utils";

import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";

import "./Home.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiURL}auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth");
      } else if (response.status === 400 || response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth");
      } else if (response.status === 500) {
        logErrorToServer(responseData, "Home.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in Home.jsx");
    }
  };

  return (
    <div className="home-container">
      <Header
        navLinks={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Finances", path: "/finances" },
          { label: "ShopList", path: "/shoplist" },
          { label: "Documents", path: "/documents" },
          { label: "Tasks", path: "/tasks" },
          { label: "Logout", onClick: handleLogout },
        ]}      
      />
      <Sidebar
        username={localStorage.getItem("username")}
      />
      <Content />
    </div>
  );
}
