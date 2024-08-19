import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Debugging: log the decoded token
        setUserName(decoded.sub); // Ensure the correct field is accessed
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear token from local storage and reset user state
    localStorage.removeItem("token");
    setUserName(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "Gold" }}>
          <FontAwesomeIcon icon={faFilm} /> Movie Masala
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>
          {userName ? (
            <>
              <span
                className="navbar-text"
                style={{ color: "white", marginRight: "10px" }}
              >
                Hello, {userName}
              </span>
              <Button variant="outline-info" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="outline-info" className="me-2">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="outline-info">Register</Button>
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
