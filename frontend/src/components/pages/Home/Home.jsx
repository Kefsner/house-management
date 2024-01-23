import React from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import Card from "../../common/Card";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="home">
        <Card
          className="finances-card"
          icon="icons/finances.svg"
          text="Finances"
          onClick={() => navigate("/finances")}
        />
        <Card
          className="shoplist-card"
          icon="icons/shoplist.svg"
          text="ShopList"
          onClick={() => navigate("/shoplist")}
        />
      </div>
    </Layout>
  );
}
