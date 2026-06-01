// // OTPInput.js
// import React, { useEffect, useState } from "react";
// import "./otp.css";
// import "./forgotPassword.css";
// import tcs_logo from "../../images/TCS Pace_White.png";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import login_image from "../../images/Mask Group 1.png";
// import register_image from "../../images/Rectangle 101.png";
// import Spinner from "react-bootstrap/Spinner";

// const OTPInput = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   let location = useLocation();
//   let navigate = useNavigate();
//   const { isSignUp = null } = location.state;
//   const [error, setError] = useState("");

//   const [email, setEmail] = useState("");
//   const [empid, setEmpid] = useState("");

//   const [otp, setOtp] = useState(new Array(6).fill(""));

//   useEffect(() => {
//     const { email, empid } = location.state;
//     setEmail(email);
//     setEmpid(empid);
//   }, []);

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false;

//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//     // Focus next input
//     if (element.nextSibling) {
//       element.nextSibling.focus();
//     }
//   };

//   async function handleSubmit(e) {
//     setIsLoading(true);
//     e.preventDefault();
//     const enteredOtp = parseInt(otp.join(""), 10);
//     const payload = {
//       empid: empid,
//       user_otp: enteredOtp,
//     };
//     const jsonPayload = JSON.stringify(payload);

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: jsonPayload,
//     };

//     try {
//       const response = await fetch(
//         `http://52.22.173.61/api/${
//           isSignUp
//             ? "api/auth/new/verify"
//             : "api/auth/password/reset/verify-otp"
//         }`,
//         requestOptions
//       );
//       if (response.status === 201) {
//         const jsonResponse = await response.json();
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000);
//         {
//           isSignUp
//             ? navigate("/signupconfirm")
//             : navigate("/confirmpassword", {
//                 state: { token: jsonResponse.token },
//               });
//         }
//       } else {
//         const jsonResponse = await response.json();

//         throw new Error(jsonResponse.message);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   }

//   async function resendOTP(event) {
//     setIsLoading(true);
//     event.preventDefault();

//     const payload = { email: email, empid: empid };

//     const jsonPayload = JSON.stringify(payload);

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: jsonPayload,
//     };

//     try {
//       const response = await fetch(
//         `http://52.22.173.61/api/${
//           isSignUp ? "api/auth/otp/resend" : "api/auth/password/reset/request"
//         }`,
//         requestOptions
//       );

//       if (response.status === 201) {
//         const jsonResponse = await response.json();
//         setTimeout(() => {
//           setIsLoading(false);
//           setError("OTP has been Resent");
//         }, 1000);

//         setTimeout(() => {
//           setError("");
//         }, 3000);
//       } else {
//         const jsonResponse = await response.json();

//         throw new Error(jsonResponse.message);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   }

//   return (
//     <>
//       <img
//         className="background-container"
//         src={isSignUp ? register_image : login_image}
//         alt="Login"
//       />
//       <div className="forget-container">
//         <div className="login-left">
//           <img src={tcs_logo} alt="TCS_Logo" style={{ padding: 20 }} />
//           <div className="pace-text">
//             <h1 className="pace-h1">Welcome</h1>
//             <h1 className="pace-h1"> to Pace Playlist</h1>
//             <h3 className="pace-h3">
//               Your one-stop platform to book any Pace Port event
//             </h3>
//           </div>
//         </div>
//         {isLoading ? (
//           <div
//             style={{
//               width: "100%",
//               height: "100vh",
//               top: 0,
//               position: "fixed",
//               justifyContent: "center",
//               display: "flex",
//               alignItems: "center",
//               zIndex: 1,
//               backgroundColor: "rgba(247, 238, 243, 0.32)",
//               gap: "20px",
//             }}
//           >
//             <button className="spinner-button" disabled>
//               <Spinner
//                 animation="border"
//                 style={{
//                   color: "white",
//                   opacity: 10,
//                   width: "20px",
//                   height: "20px",
//                 }}
//               />
//               <span className="spinner-span">Please wait...</span>
//             </button>

//             {/* <span style={{ color: "white" }}>Uploading,</span> */}
//           </div>
//         ) : (
//           ""
//         )}

//         <form className="otp-form" onSubmit={handleSubmit}>
//           <h3 className="forget-title">
//             {" "}
//             {isSignUp ? "Two Factor Authentication" : "Enter OTP"}
//           </h3>
//           <span className="forget-text">
//             A 6-digit OTP is sent to your TCS email address The code is valid
//             for 10 minutes
//           </span>

//           <label className="otp-label">Enter OTP</label>
//           <div className="otp-container">
//             {otp.map((data, index) => {
//               return (
//                 <input
//                   className="otp-input"
//                   type="text"
//                   name="otp"
//                   maxLength="1"
//                   key={index}
//                   value={data}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onFocus={(e) => e.target.select()}
//                   autoFocus={index === 0}
//                 />
//               );
//             })}
//           </div>
//           <Link
//             state={{ isSignUp: isSignUp }}
//             className="clear-Link"
//             onClick={() => setOtp(new Array(6).fill(""))}
//           >
//             CLEAR
//           </Link>

//           {error && <div className="otp-message">{error}</div>}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             {isSignUp ? (
//               <Button className="sign-button" type="submit">
//                 Verify and Proceed
//               </Button>
//             ) : (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   marginLeft: "30px",
//                   marginTop: "50px",
//                   gap: "30px",
//                 }}
//               >
//                 <button
//                   className="forget-back"
//                   onClick={() => navigate("/forgotpassword")}
//                 >
//                   Back
//                 </button>
//                 <button className="forgot-button" type="submit">
//                   Verify and Proceed{" "}
//                 </button>{" "}
//               </div>
//             )}
//             <span className="OTP-span">
//               Didn't receive?{" "}
//               <Link className="OTP-Link" onClick={resendOTP}>
//                 RESEND OTP
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default OTPInput;

// OTPInput.js
import React, { useEffect, useState } from "react";
import "./otp.css";
import "./forgotPassword.css";
import tcs_logo from "../../images/TCS Pace_White.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import login_image from "../../images/Mask Group 1.png";
import register_image from "../../images/Rectangle 101.png";
import Spinner from "react-bootstrap/Spinner";

const API_BASE_URL = "http://52.22.173.61/api";

const OTPInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isSignUp = false, email: stateEmail = "", empid: stateEmpid = "" } =
    location.state || {};

  const [email, setEmail] = useState(stateEmail);
  const [empid, setEmpid] = useState(stateEmpid);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    if (!stateEmail) {
      navigate(isSignUp ? "/" : "/forgotpassword");
      return;
    }

    setEmail(stateEmail);
    setEmpid(stateEmpid);
  }, [stateEmail, stateEmpid, isSignUp, navigate]);

  const showMessage = (text, success = false) => {
    setMessage(text);
    setIsSuccessMessage(success);

    if (success) {
      setTimeout(() => {
        setMessage("");
        setIsSuccessMessage(false);
      }, 3000);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const updatedOtp = otp.map((digit, idx) =>
      idx === index ? element.value : digit
    );

    setOtp(updatedOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    showMessage("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      showMessage("Please enter a valid 6-digit OTP");
      return;
    }

    const payload = {
      email,
      otp: enteredOtp,
    };

    try {
      setIsLoading(true);

      const endpoint = isSignUp
        ? "/api/auth/verify-registration-otp"
        : "/api/auth/verify-otp";

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        if (isSignUp) {
          navigate("/signupconfirm");
        } else {
          navigate("/confirmpassword", {
            state: { email },
          });
        }

        return;
      }

      throw new Error(jsonResponse.message || "OTP verification failed");
    } catch (error) {
      showMessage(error.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOTP(event) {
    event.preventDefault();
    showMessage("");

    if (!email) {
      showMessage("Email is missing. Please start again.");
      return;
    }

    try {
      setIsLoading(true);

      const endpoint = isSignUp
        ? "/api/auth/resend-registration-otp"
        : "/api/auth/forgot-password";

      const payload = {
        email,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setOtp(new Array(6).fill(""));
        showMessage("OTP has been resent successfully", true);

        console.log("Resend OTP response:", jsonResponse);

        return;
      }

      throw new Error(jsonResponse.message || "Failed to resend OTP");
    } catch (error) {
      showMessage(error.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <img
        className="background-container"
        src={isSignUp ? register_image : login_image}
        alt="Login"
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

        <form className="otp-form" onSubmit={handleSubmit}>
          <h3 className="forget-title">
            {isSignUp ? "Two Factor Authentication" : "Enter OTP"}
          </h3>

          <span className="forget-text">
            A 6-digit OTP is sent to your TCS email address. The code is valid
            for 10 minutes.
          </span>

          <label className="otp-label">Enter OTP</label>

          <div className="otp-container">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-input"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  autoFocus={index === 0}
                />
              );
            })}
          </div>

          <Link
            className="clear-Link"
            onClick={() => setOtp(new Array(6).fill(""))}
          >
            CLEAR
          </Link>

          {message && (
            <div
              className="otp-message"
              style={{
                color: isSuccessMessage ? "green" : "red",
              }}
            >
              {message}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isSignUp ? (
              <Button className="sign-button" type="submit" disabled={isLoading}>
                Verify and Proceed
              </Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "30px",
                  marginTop: "50px",
                  gap: "30px",
                }}
              >
                <button
                  className="forget-back"
                  type="button"
                  onClick={() => navigate("/forgotpassword")}
                  disabled={isLoading}
                >
                  Back
                </button>

                <button
                  className="forgot-button"
                  type="submit"
                  disabled={isLoading}
                >
                  Verify and Proceed
                </button>
              </div>
            )}

            <span className="OTP-span">
              Didn't receive?{" "}
              <Link className="OTP-Link" onClick={resendOTP}>
                RESEND OTP
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default OTPInput;