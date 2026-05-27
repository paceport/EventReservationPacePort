import React, { useState } from "react";
import "./forgotPassword.css";
import tcs_logo from "../../images/TCS Pace_White.png";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const payload = { email: email };
    const jsonPayload = JSON.stringify(payload);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonPayload,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/password/reset/request",
        requestOptions
      );
      if (response.status === 201) {
        setIsLoading(false);
        const jsonResponse = await response.json();
        const empid = jsonResponse.employee_id;
        navigate("/otp", {
          state: { isSignUp: false, email: email, empid: empid },
        });
      } else {
        const jsonResponse = await response.json();
        throw new Error(jsonResponse.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="background-container"></div>
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

        <div className="forgot-password-container">
          <h3 className="forget-title">Forgot Password</h3>
          <span className="forget-text">
            Enter your TCS email address associated with your account
          </span>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <label htmlFor="email">TCS Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {error && <div className="forget-error">{error}</div>}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <button
                className="forget-back"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>
              <button className="forgot-button">Proceed</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;


