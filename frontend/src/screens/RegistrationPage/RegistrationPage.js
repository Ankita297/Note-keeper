import React, { useState, useEffect } from "react";
import { Card, CardContent, unstable_composeClasses } from "@mui/material";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { USER_REGISTER_REQUEST } from "../../constants/userConstants";
import { register } from "../../action/userAction";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Password do not match ");
    } else {
      setMessage(null);
      dispatch(register(name, email, password, pic));
      navigate("/mynotes");
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    } else {
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
    }
  };

  return (
    <div className="registration-page">
      <div className="card-box">
        {error && <ErrorMessage severity="error">{error}</ErrorMessage>}
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
        {loading && <Loading />}
        <CardContent>
          <h3 className="text-center">Sign up</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group
              className="mb-1"
              controlId="formBasicEmail"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <Form.Label>Name </Form.Label>
              <Form.Control type="name" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicName">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
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

            <Form.Group className="mb-1" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
            {picMessage && (
              <ErrorMessage severity="error">{picMessage}</ErrorMessage>
            )}
            <Form.Group
              controlId="formfile"
              type="image/png"
              className="mb-3"
              onChange={(e) => postDetails(e.target.files[0])}
            >
              <Form.Label>upload profile picture </Form.Label>
              <Form.Control type="file" className="mb-1" />
            </Form.Group>
            <Button
              variant="contained"
              type="submit"
              className="sumbit-btn mt-2"
            >
              Register
            </Button>
          </Form>
          <Link className="link" to="/login">
            Already a user ?{" "}
          </Link>
        </CardContent>
      </div>
    </div>
  );
};

export default RegistrationPage;
