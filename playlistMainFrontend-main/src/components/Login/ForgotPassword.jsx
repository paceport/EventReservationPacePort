import React, { useState } from "react";
import "./forgotPassword.css";
import tcs_logo from "../../images/TCS Pace_White.png";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { API_BASE_URL } from "../../config/apiConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = { email };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let jsonResponse = {};
      try {
        jsonResponse = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        navigate("/otp", {
          state: {
            isSignUp: false,
            email,
            empid: jsonResponse.employee_id || jsonResponse.empid || "",
          },
        });

        return;
      }

      throw new Error(jsonResponse.message || "Failed to send OTP");
    } catch (error) {
      setError(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
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

        {isLoading && (
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
          </div>
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
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>

              <button className="forgot-button" type="submit" disabled={isLoading}>
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;