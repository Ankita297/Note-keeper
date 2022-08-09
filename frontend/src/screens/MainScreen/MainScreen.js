import { Container } from "@mui/system";
import React from "react";
import "./style.scss";
const MainScreen = ({ title, children }) => {
  return (
    <Container>
      <div className="main-screen">
        <div className="title">{title}</div>

        <div className="main-body">{children}</div>
      </div>
    </Container>
  );
};

export default MainScreen;
