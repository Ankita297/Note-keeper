import React from "react";
import {
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import logo from "../../images/logo1.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { logout } from "../../action/userAction";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header">
      <Navbar>
        <Container>
          <Navbar.Brand
            href={userInfo ? "/mynotes" : "/login"}
            className="brand"
          >
            <img src={logo} /> Note-keeper
          </Navbar.Brand>

          {userInfo ? (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto nav-link">
                  <Nav.Link href="/mynotes">My Notes</Nav.Link>
                  <NavDropdown
                    title={userInfo.name}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Signup</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
