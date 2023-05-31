import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link className="nav-link active" to="/">
        Home
      </Link>
      <Link className="nav-link active" to="/contractdetail">
        ContractDetail
      </Link>
    </>
  );
}

export default Navbar;
