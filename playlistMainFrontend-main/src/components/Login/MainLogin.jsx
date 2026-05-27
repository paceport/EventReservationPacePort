import React, { useState } from "react";
import "./mainLogin.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import tcs_logo from "../../images/TCS Pace_White.png";
import login from "../../images/Mask Group 1.png";
import register from "../../images/Rectangle 101.png";
import SignUp from "./SignUp";
import Userlogin from "./Userlogin";
import Spinner from "react-bootstrap/Spinner";

export default function MainLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState("login");
  return (
    <>
      <img
        className="background-container"
        src={activeScreen === "login" ? login : register}
        alt="login"
      />
      <div className="login-main">
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
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              top: 0,
              position: "fixed",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "rgba(247, 238, 243, 0.32)",
              gap: "20px",
            }}
          >
            <button className="spinner-button" disabled>
              <Spinner
                animation="border"
                style={{
                  color: "white",
                  opacity: 10,
                  width: "20px",
                  height: "20px",
                }}
              />
              <span className="spinner-span">Please wait...</span>
            </button>

            {/* <span style={{ color: "white" }}>Uploading,</span> */}
          </div>
        ) : (
          ""
        )}
        <div className="login-right">
          <div className="tabs-container">
            <Tabs
              defaultActiveKey="login"
              id="Login-tabs"
              activeKey={activeScreen}
              onSelect={(key) => setActiveScreen(key)}
              justify
            >
              <Tab eventKey="register" title="Register">
                <SignUp setIsLoading={setIsLoading} />
              </Tab>
              <Tab eventKey="login" title="Login">
                <Userlogin setIsLoading={setIsLoading} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}


