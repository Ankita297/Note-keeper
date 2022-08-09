import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/ErrorMessage";
import "./style.scss";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/userAction";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email, password));
  };
  return (
    <div className="login-page">
      <div className="card-box">
        {error && <Error severity="error">{error}</Error>}
        {loading && <Loading />}
        <CardContent>
          <h3 className="text-center">Login </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="contained"
              type="submit"
              className="sumbit-btn mt-2"
            >
              Login
            </Button>
          </Form>
          <Link to="/register" className="link">
            New User ?{" "}
          </Link>
        </CardContent>
      </div>
    </div>
  );
};

export default LoginPage;
