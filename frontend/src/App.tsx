import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Finances from "./pages/Finances/Finances";
import Categories from "./pages/Categories/Categories";
import Accounts from "./pages/Accounts/Accounts";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

/**
 * The main App component that sets up the router and defines routes for the application.
 * 
 * Utilizes React Router to manage navigation between different parts of the application,
 * including the authentication page, home page, finances page, and a catch-all for not found routes.
 * Each route is associated with a specific component that renders the content for that path.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth url="/auth" />} />
        <Route path="/" element={<Home url="/" />} />
        <Route path="/finances" element={<Finances url="/finances" />} />

        <Route path="/categories" element={<Categories url="/categories" />} />
        <Route path="/accounts" element={<Accounts url="/accounts" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
