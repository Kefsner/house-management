import React from "react";

import Card from "../common/Card";

import "./Content.css";

export default function Content(props) {
  return (
    <main className="content">
        <Card className="finances-card" />
        <Card className="shopping-card" />
        <Card className="documents-card" />
        <Card className="calendar-card" />        
    </main>
  );
}
