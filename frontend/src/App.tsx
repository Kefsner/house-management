import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";

// import Home from "./pages/Home/Home";
// import Finances from "./pages/Finances/Financess";

// import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth url="/auth" />} />
        
        {/* <Route path="/" element={<Home url="/" />} />
        <Route path="/finances" element={<Finances url="/finances" />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
