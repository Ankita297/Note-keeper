import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./style.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const navigate=useNavigate()

  useEffect(() => {

    if(userInfo){
      navigate("/mynotes")
    }
   
  }, [navigate,userInfo])
  

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div>
      <MainScreen title={"LOGIN"}>
        <Container>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <div className="loginContainer">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New Customer ?<Link to="/register">Register Here</Link>
              </Col>
            </Row>
          </div>
        </Container>
      </MainScreen>
    </div>
  );
};

export default LoginPage;
