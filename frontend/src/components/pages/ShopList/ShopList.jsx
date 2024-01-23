import React from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";

import "./ShopList.css";

export default function ShopList() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="shoplist">
        <h1>ShopList</h1>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </Layout>
  );
}
