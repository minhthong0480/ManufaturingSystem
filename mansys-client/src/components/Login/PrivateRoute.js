import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const username = useSelector(state => state.auth != null ?  state.auth.username : null);
  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
