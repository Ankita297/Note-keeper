import React from "react";
import { Container } from "react-bootstrap";
import './MainScreen.css'
const MainScreen = ({ title, children }) => {
  return (
    <div>
      <Container>
        <div className="intro-txt-heading">{title}</div>
        <hr />
        <div className="main-body">{children}</div>
      </Container>
    </div>
  );
};

export default MainScreen;
