import React from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Card from "./partials/Card";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div id="home-page">
        <Card
          className="finances-card"
          icon="/icons/finances.svg"
          text="Finances"
          onClick={() => navigate("/finances")}
        />
      </div>
    </Layout>
  );
}
