import Contact from "./components/Contract/Contract";
import ContractCreate from "./components/Contract/ContractCreate";
import Login from "./components/Login/Login";
import RegisterPage from "./components/RegisterPage";
import HeaderUI from "./components/HeaderUI";
import Homepage from "./components/Homepages";
// import { ThemeContext } from 'context/ThemeContext';
import { ThemeContext } from './context/ThemeContext';

import { useEffect, useMemo, useState } from 'react';
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Employee from "./components/Employee";
import Customer from "./components/Customer";
import Products from "./components/Products";
import PrivateRoute from "./components/Login/PrivateRoute";
import MaterialForm from "./Materials/MaterialTable";
import { Layout, Spin } from "antd";
/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import ContractEdit from "./components/Contract/ContractEdit";
import Inventory from "./components/Inventory/Inventory";
import DeliveryNoteEdit from "./components/Inventory/DeliveryNoteEdit";
const { Content, Footer } = Layout;

function App() {
  const [themeText, setThemeText] = useState('light');
  const [loading, setLoading] = useState(false);
  const preferences = useMemo(
    () => ({
      setLoading,

    }),
    [
      setLoading,
    ]
  );
  const AppComponent = () => (

    <Layout style={{ minHeight: "100vh" }}>
      <HeaderUI />
      <Content style={{ padding: "1rem" }}>
        <Routes>
          <Route exact path="/contracts" element={<Contact />} />
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/create_contract" element={<ContractCreate />} />
          <Route exact path="/edit_contract/:id" element={<ContractEdit />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/customer" element={<Customer />} />
          <Route exact path="/material" element={<MaterialForm />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/delivery_note/:id" element={<DeliveryNoteEdit />} />
        </Routes>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        PHUONG HAI JSC ©2023 Created by NGUYEN HUNG DUNG
      </Footer>
    </Layout>
  );
  return (
    <ThemeContext.Provider value={preferences}>
      <Spin spinning={loading} tip="Đang tải..." indicator={<LoadingOutlined spin />} size="large"
        style={{ position: "fixed", marginTop: "15%" }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<RegisterPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<AppComponent />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Spin>
    </ThemeContext.Provider>
  );
}

export default App;
