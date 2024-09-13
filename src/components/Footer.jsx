import React from "react";
import { Button } from "react-bootstrap";

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#821722",
        marginTop: "50px",
        minHeight: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        All right reserved
      </div>
    </div>
  );
}

export default Footer;
