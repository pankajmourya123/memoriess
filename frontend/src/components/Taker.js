import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
function Taker() {
  const auth=localStorage.getItem("user")
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <Navbar className="navbar">
        <Container>
          <Nav>
            <h1 className="heading">Memories</h1>

            {auth ? (
              <div className="nav-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHo25cuYxoYCDuybTUi1n1NLUKUQYNPth1A&usqp=CAU"
                  alt="image"
                  id="img-h"
                />
                <Link to="/take" className="link link-0 ">
                  Home
                </Link>
                <Link to="/main" className="link link-0">
                  Memories
                </Link>
               
                <Link onClick={logout} to="/" className="link link-1">
                  Logout <span id="log"></span>
                </Link>
                       
              </div>
            ) : (
              <div className="nav-first">
                <Link to="/signup" className="link">
                  Sign-up
                </Link>
                <Link to="/" className="link">
                  Login
                </Link>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Taker;
