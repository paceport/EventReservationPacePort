import React from "react";
import banner from "../background.png";
import "../styles/reservationBanner.css";

export default function Banner({ type }) {
  return (
    <div className="image-overlay-container">
      <img
        src={banner}
        alt="placeholder"
        style={{ height: "200px", paddingTop: "10px" }}
      />
      <div className="overlay-content">
        <div className="overlay-title">
          <h4 style={{ float: "left" }}>{type} Reservation</h4>
        </div>
        {/* <div className="overlay-button"> 
                   <StepperWrapper/>
                </div> */}
      </div>
    </div>
  );
}


