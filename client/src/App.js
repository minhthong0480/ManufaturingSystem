import ContactDetail from "./components/ContractDetail";
import Navbar from "./components/Navbar";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route exact path="/contractdetail" element={<ContactDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
