import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./components/pages/Auth";
import Home from "./components/pages/Home";
import ShopList from "./components/pages/ShopList";
import NotFound from "./components/pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/shoplist" element={<ShopList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
