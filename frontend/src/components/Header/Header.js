import React,{useEffect} from "react";
import {
  Container,
  Navbar,
  NavDropdown,
  Form,
  Nav,
  Button,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const logOutHandler = () => {
    dispatch(logout());
    navigate('/')
  };
    useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Note Zipper</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav navbarScroll>
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <NavDropdown title="Ankita" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
