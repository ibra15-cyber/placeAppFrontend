import React from "react";
import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
// import LinkContainer from "react-bootstrap/LinkContainer";
import { LinkContainer } from "react-router-bootstrap";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`sidebar ${isOpen ? "active" : ""}`}
      style={{ alignItems: "center" }}
    >
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      {/* <button onClick={toggleSidebar}>
        <i className="fas fa-times"></i>
        Close Sidebar
      </button> */}
    </div>
  );
}

export default Sidebar;
