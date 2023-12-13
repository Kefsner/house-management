import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/utils";

import "./Home.css";

const apiURL = process.env.REACT_APP_API_URL;

function resetTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

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

      if (response.status === 200) {
        resetTokens();
        navigate("/auth");
      } else if (response.status === 400) {
        console.log("Bad Request");
      } else if (response.status === 401) {
        resetTokens();
        navigate("/auth");
      }
    }
    catch (exception) {
      console.log("Exception: ", exception);
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
