import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, handleLogout } from "../../utils/utils";

import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";

import "./Home.css";

export default function ShopList() {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout(navigate);
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/auth");
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <Header
                navLinks={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Finances", path: "/finances" },
                    { label: "ShopList", path: "/shoplist" },
                    { label: "Documents", path: "/documents" },
                    { label: "Tasks", path: "/tasks" },
                    { label: "Logout", onClick: onLogout },
                ]}
            />
            <Sidebar
                username={localStorage.getItem("username")}
            />
            <Content />
        </div>
    );
}