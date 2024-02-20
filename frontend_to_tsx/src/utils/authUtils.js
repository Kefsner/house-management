import { jwtDecode } from "jwt-decode";
import { apiURL } from "./constants";

export function getCsrfToken() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === "csrftoken") {
      return value;
    }
  }
  return "";
}

export function isAuthenticated() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }
  catch (exception) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log(exception);
  }
}

export async function handleLogout(navigate) {
    try {
      const apiEndpoint = "auth/logout/";
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
      });
      const responseData = await response.json();  
      if (response.status === 200 || response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        navigate("/auth");
      }
      else if (
        response.status === 400 ||
        response.status === 500
      ) {
        console.log(responseData.message);
      }
    }
    catch (exception) {
        console.log(exception);
    }
  }