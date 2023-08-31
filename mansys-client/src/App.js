import Contact from "./components/Contract/Contract";
import ContractCreate from "./components/Contract/ContractCreate";
import Login from "./components/Login/Login";
import RegisterPage from "./components/RegisterPage";
import HeaderUI from "./components/HeaderUI";
import Homepage from "./components/Homepages";

import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Employee from "./components/Employee";
import Customer from "./components/Customer";
import PrivateRoute from "./components/Login/PrivateRoute";

function App() {
  const AppComponent = () => (
    <>
      <HeaderUI />

      <div style={{ marginTop: 80 }}>
        <Routes>
          <Route exact path="/contract" element={<Contact />} />
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/create_contract" element={<ContractCreate />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/customer" element={<Customer />} />
        </Routes>
      </div>
    </>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<AppComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
