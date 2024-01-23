import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, handleLogout } from '../../utils/utils';

import Header from './Header';
import Sidebar from './Sidebar';

import './Layout.css';

export default function Layout({ children }) {
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
    <div className='layout-container'>
        <Header
            navLinks={[
                { label: "Finances", path: "/finances" },
                { label: "ShopList", path: "/shoplist" },
                { label: "Logout", onClick: onLogout },
            ]}
        />
        <Sidebar
            username={localStorage.getItem("username")}
        />
      <main className='layout-content'>{children}</main>
    </div>
  );
};