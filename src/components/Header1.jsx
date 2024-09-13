import { Link } from "react-router-dom";
import NavLinks from "./Header";
// import Navbar from "react-bootstrap/Narbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";

function Header1() {
  return (
    <div style={{}}>
      <header style={{ backgroundColor: "#821722" }}>
        <NavLinks />
      </header>
    </div>
  );
}

export default Header1;
