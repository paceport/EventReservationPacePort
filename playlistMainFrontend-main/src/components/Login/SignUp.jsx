import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function SignUp({ setIsLoading }) {
  let navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmpIdChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
      setEmpId(value);
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z ]*$/.test(value)) {
      setName(value);
    }
  };
  const handleSignUp = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsLoading(false);
      setError("Passwords do not match");
      return;
    }
    setError("");

    const payload = {
      empid: empId,
      name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    const jsonPayload = JSON.stringify(payload);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonPayload,
    };

    try {
      const response = await fetch(
        "http://52.22.173.61/api/api/auth/signup",
        requestOptions
      );

      if (response.status === 201) {
        const jsonResponse = await response.json();
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
        navigate("/otp", {
          state: { isSignUp: true, email: email, empid: empId },
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
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignUp}>
        <div className="signup-group-2">
          <div className="signup-group">
            <label htmlFor="empId">Employee Id</label>
            <input
              type="text"
              id="employeeId"
              value={empId}
              maxLength={10}
              onChange={handleEmpIdChange}
              required
            />
          </div>
          <div className="signup-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </div>
        <div className="signup-group">
          <label htmlFor="email">TCS Email Address</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="submit-button" type="submit">
            Proceed
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;


