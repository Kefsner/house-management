import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";

import Home from "./pages/Home/Home";
import Finances from "./pages/Finances/Finances";

import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth url="/auth" />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/finances" element={<Finances url="/finances" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
