import { Fragment, React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/contract" color="inherit">
            Contract
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Navbar;
