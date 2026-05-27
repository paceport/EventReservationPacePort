import React from "react";
import "./styles/successScreen.css";
import success from "../../images/Success BG.png";
import success_imgae from "../../images/T.png";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
export default function NewBooking({ eventID }) {
  let navigate = useNavigate();
  const location = useLocation();

  function handleSubmit() {
    navigate("/sidebar");
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="success-background-container"></div>

      <div className="success-screen-container">
        <img
          src={success_imgae}
          alt="Success"
          style={{ width: "150px", height: "150px" }}
        />
        {/* <h2 className="success-title-h2">Success</h2> */}
        <h2 className="success-title-h2">Workshop Reservation</h2>
        {/* <h2 className="success-reservation-h2">Workshop Reservation </h2> */}
        <h2 className="success-reservation-h2">
          Your {location.state.name} Reservation is successfully submitted
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
          }}
        >
          <span className="reservation-id">Reservation ID: </span>
          <span className="reservation-id-value"> {eventID}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          <span className="success-reservation-span">
            We will let you know when it is completed.
          </span>
          {/* <span className="success-reservation-span">
            Entry Passes (in-person participation) and Invitation links (joining
            remote)
          </span>
          <span className="success-reservation-span">
            have been sent to respective stakeholders{" "}
          </span> */}
        </div>
        <Button className="success-button" onClick={handleSubmit}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}


