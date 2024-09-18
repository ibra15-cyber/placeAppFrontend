import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Profile from "../screens/Profile";
import { Store } from "../../StoreProvider";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { userLoggedIn } = state;

  const [expand, setExpand] = useState("md");

  const signOutHandler = () => {
    // localStorage.removeItem("userLoggedIn");
    // setUserLogin(null);
    dispatch({ type: "LOG_OUT" });
    localStorage.setItem("userLoggedIn", null);
    navigate("/auth");
  };

  return (
    <Navbar
      // data-bs-theme="dark"
      style={{
        backgroundColor: "#821722",
        // width: "inherit",
      }}
      expand={expand}
      // fixed="top"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifySelf: "center",
          marginLeft: "18%",
        }}
      >
        <div
          style={{
            display: "inline-flex",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="dark"
              onClick={toggleSidebar}
              style={{
                border: "1px solid white",
                marginRight: "10px",
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>
          <div>
            <Navbar.Brand
              href="/"
              className="text-white font"
              style={{ marginRight: "150px" }}
            >
              <h1>Your place</h1>
            </Navbar.Brand>
          </div>
        </div>
        <div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Navbar.Collapse>
            <div style={{ display: "flex", fontSize: "11px" }}>
              <Nav
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {userLoggedIn ? (
                  <>
                    <Nav.Link
                      href="/"
                      style={{
                        border: "1px solid white",
                        width: "100px",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      ALL PLACES
                    </Nav.Link>
                    {/* <Nav.Link href="/update">UPDATE</Nav.Link> */}
                    <Nav.Link
                      as={Link}
                      to="/add"
                      style={{
                        border: "1px solid white",
                        margin: "0 5px",
                        minWidth: "100px",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      ADD PLACE
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    {" "}
                    <Nav.Link
                      href="/"
                      style={{
                        border: "1px solid white",
                        width: "100px",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      ALL PLACES
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/auth"
                      style={{
                        border: "1px solid white",
                        margin: "0 5px",
                        width: "100px",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                    >
                      SIGN IN
                    </Nav.Link>
                  </>
                )}

                <Form
                  className="d-flex"
                  style={{
                    // marginLeft: %",
                    width: "150px",
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "white",
                      color: "white",
                      // width: "20px",
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </Form>

                {userLoggedIn && (
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {/* <FontAwesomeIcon icon={faUserCircle} size="2x" />{" "} */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={userLoggedIn.image}
                        alt="user image"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      />
                    </div>
                    <NavDropdown
                      title={userLoggedIn.name}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <LinkContainer to={`/profile/${userLoggedIn._id}`}>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      {userLoggedIn.isAdmin && (
                        <LinkContainer to={`/profile/`}>
                          <NavDropdown.Item>User Profiles</NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <NavDropdown.Item href="#action4"> </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={signOutHandler}>
                        signout{" "}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
