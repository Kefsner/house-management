import { jwtDecode } from "jwt-decode";

const apiURL = process.env.REACT_APP_API_URL;

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
  } catch (err) {
    console.log(err);
    localStorage.removeItem("accessToken");
    return false;
  }
}

export function logErrorToServer(error, info = null) {
  console.log(error, info);
}

export async function handleLogout(navigate) {
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

    if (
      response.status === 200 ||
      response.status === 400 ||
      response.status === 401
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/auth");
    } else if (response.status === 500) {
      logErrorToServer(responseData, "Home.jsx");
    }
  } catch (exception) {
    logErrorToServer(exception, "Exception in Home.jsx");
  }
}
