import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./components/pages/Auth/Auth";
import Home from "./components/pages/Home/Home";
import Finances from "./components/pages/Finances/Finances";
import Categories from "./components/pages/Finances/Categories";
import ShopList from "./components/pages/ShopList/ShopList";
import NotFound from "./components/pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/finances/categories" element={<Categories />} />
        <Route path="/shoplist" element={<ShopList />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
