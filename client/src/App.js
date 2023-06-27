import Contact from "./components/Contract";
import ContractCreate from "./components/ContractCreate";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import CreateContractForm from "./forms/ContractCreateForm";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route exact path="/contract" element={<Contact />} />
        <Route exact path="/create_contract" element={<ContractCreate />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
