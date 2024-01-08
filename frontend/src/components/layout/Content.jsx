import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";

import "./Content.css";

export default function Content(props) {
  const navigate = useNavigate();
  return (
    <main className="content">
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
        <Card
          className="documents-card"
          icon="icons/documents.svg"
          text="Documents"
          onClick={() => navigate("/documents")}
        />
        <Card
          className="calendar-card"
          icon="icons/calendar.svg"
          text="Calendar"
          onClick={() => navigate("/calendar")}
        />
    </main>
  );
}