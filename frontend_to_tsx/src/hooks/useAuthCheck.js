import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

export default function useAuthCheck(url) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      sessionStorage.setItem("redirectURL", url);
      navigate("/auth");
    } else {
      if (url === "/auth") {
        navigate("/");
      }
    }
  }, [navigate, url]);
}
