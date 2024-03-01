import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";
import Card from "./partials/Card";

import "./Home.css";

export default function Home(props: HomeProps) {
  useAuthCheck(props.url);

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
        <Card
          className="categories-card"
          icon="/icons/categories.svg"
          text="Categories"
          onClick={() => navigate("/categories")}
        />
      </div>
    </Layout>
  );
}

interface HomeProps {
  url: string;
}