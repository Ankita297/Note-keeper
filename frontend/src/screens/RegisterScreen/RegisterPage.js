import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );


const navigate=useNavigate();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

useEffect(() => {
  if (userInfo) {
    navigate("/mynotes");
  }
}, [ userInfo]);

  const [password, setPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password != confirmpassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an Image");
    }

    setPicMessage(null);
    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "ankitapal");
      fetch("https://api.cloudinary.com/v1_1/ankitapal/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  return (
    <div>
      <MainScreen title={"REGISTER"}></MainScreen>
      <Container>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <div className="loginContainer">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
            </Form.Group>
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
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>{" "}
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group
              controlId="formFile"
              type="image/png"
              onChange={(e) => postDetails(e.target.files[0])}
              className="mb-3"
            >
              <Form.Label>upload profile picture </Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
