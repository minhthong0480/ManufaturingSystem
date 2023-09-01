import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "redux";

const PrivateRoute = () => {
  // const username = useSelector(state => state.auth.username);
  // return username ? <Outlet /> : <Navigate to="/login" />;
  return  <Outlet/>
};

export default PrivateRoute;
