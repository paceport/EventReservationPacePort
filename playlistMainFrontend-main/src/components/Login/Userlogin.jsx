import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { API_BASE_URL } from "../../config/apiConfig";

export default function Userlogin({ setIsLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    if (email && password) {
      const payload = {
        email: email,
        password: password,
      };

      const jsonPayload = JSON.stringify(payload);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonPayload,
      };
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, requestOptions);

        if (response.status === 200) {
          setIsLoading(false);
          const jsonResponse = await response.json();
          await login(jsonResponse.token);
          // localStorage.setItem("accessToken", jsonResponse.token);
          setError("");
          // navigate("/sidebar");
        } else {
          const jsonResponse = await response.json();

          throw new Error(jsonResponse.message);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <form className="login-group" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">TCS Email Address</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link className="forgot-password" to="/forgotpassword">
          Forgot Password?
        </Link>
        {error && <div className="login-message">{error}</div>}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="button-login" type="submit">
          Proceed to Dashboard
        </button>
      </div>
    </form>
  );
}


