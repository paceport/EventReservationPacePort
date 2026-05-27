import React from "react";
import tcs_logo from "../../images/TCS Pace_White.png";
import register_image from "../../images/Rectangle 101.png";
import success_imgae from "../../images/T.png";
import "./confirm.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUpConfirm() {
  let navigate = useNavigate();

  function handleSubmit() {
    navigate("/");
  }
  return (
    <>
      <div className="background-container"></div>
      <img
        className="background-container"
        src={register_image}
        alt="Register"
      />
      <div className="forget-container">
        <div className="login-left">
          <img src={tcs_logo} alt="TCS_Logo" style={{ padding: 20 }} />
          <div className="pace-text">
            <h1 className="pace-h1">Welcome</h1>
            <h1 className="pace-h1"> to Pace Playlist</h1>
            <h3 className="pace-h3">
              Your one-stop platform to book any Pace Port event
            </h3>
          </div>
        </div>

        <div className="success-container">
          <img
            src={success_imgae}
            alt="Success"
            style={{ width: "100px", height: "100px" }}
          />
          <h2 className="success-h2">Congratulations</h2>
          <span className="success-span">
            You have successfully created your login credentials
          </span>
          <Button className="success-button" onClick={handleSubmit}>
            Continue to Login
          </Button>
        </div>
      </div>
    </>
  );
}


