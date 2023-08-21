import Contact from "./components/Contract";
import ContractCreate from "./components/ContractCreate";
import Login from "./components/Login/Login";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable.js";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import CreateContractForm from "./forms/ContractCreateForm";
import HeaderUI from "./components/HeaderUI";
import Homepage from "./components/Homepages";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <HeaderUI />

      <Routes>
        <Route exact path="/contract" element={<Contact />} />
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/create_contract" element={<ContractCreate />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/employee" element={<EmployeeTable />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;