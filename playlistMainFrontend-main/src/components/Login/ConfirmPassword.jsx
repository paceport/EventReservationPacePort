import React, { useState } from "react";
import "./confirmPassword.css";
import "./forgotPassword.css";
import tcs_logo from "../../images/TCS Pace_White.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmPassword() {
  let location = useLocation();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const { token } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const payload = {
      new_password: password,
      confirm_new_password: confirmPassword,
    };
    const jsonPayload = JSON.stringify(payload);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: location.state.token,
      },
      body: jsonPayload,
    };
    try {
      const response = await fetch(
        "http://52.22.173.61/api/api/auth/password/reset/update",
        requestOptions
      );
      if (response.status === 200) {
        const jsonResponse = await response.json();

        alert("Password has been changed");
        navigate("/");
      } else {
        const jsonResponse = await response.json();

        throw new Error(jsonResponse.message);
      }
    } catch (error) {
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

        <div className="password-change-container">
          <form onSubmit={handleSubmit} className="password-change-form">
            <h2>Enter New Password</h2>
            {/* <p>
              Your new password should be different from previously used
              passwords
            </p> */}
            <div className="input-group">
              <label className="confirm-password-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="confirm-password-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-btn">
              Continue to Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


