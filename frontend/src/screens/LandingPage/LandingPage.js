import React from "react";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import "./style.scss";
import logo from "../../images/Note.png";
import LoginPage from "../LoginPage/LoginPage";
const LandingPage = ({ login }) => {
  return (
    <div className="main-landing-page">
      <div className="landing-page">
        <div className="left">
          <img src={logo} className="logo-img" />
          <h1>
            Welcome to <span>Note-Keeper</span>
          </h1>
          <p>One place to keep all your notes safe</p>
        </div>
        <div className="right">
          {login == "true" ? <LoginPage /> : <RegistrationPage />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
