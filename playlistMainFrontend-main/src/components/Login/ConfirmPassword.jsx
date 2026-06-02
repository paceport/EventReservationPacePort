import React, { useState } from "react";
import "./confirmPassword.css";
import "./forgotPassword.css";
import tcs_logo from "../../images/TCS Pace_White.png";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/apiConfig";

export default function ConfirmPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const email = location.state?.email || "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Email is missing. Please start forgot password again.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/confirm-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword: password,
        }),
      });

      const responseText = await response.text();

      let jsonResponse = {};
      try {
        jsonResponse = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        alert("Password has been changed successfully");
        navigate("/");
        return;
      }

      throw new Error(jsonResponse.message || "Password reset failed");
    } catch (error) {
      setError(error.message || "Password reset failed");
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

            <div className="input-group">
              <label className="confirm-password-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="confirm-password-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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