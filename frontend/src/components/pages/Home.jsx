import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, logErrorToServer } from "../../utils/utils";

import "./Home.css";

const apiURL = process.env.REACT_APP_API_URL;

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${apiURL}auth/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
        }
      );
      const responseData = await response.json();
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth");
      } else if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth");
      } else if (response.status === 500) {
        logErrorToServer(responseData, "Home.jsx");
      }
    }
    catch (exception) {
      logErrorToServer(exception, "Exception in Home.jsx");
    }
  };

  return (
    <div className="bg-image">
      <div className="content-container">
        <img src="/logo.png" alt="Logo" />
        <h1>Home</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="button-form"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
export default Home;
