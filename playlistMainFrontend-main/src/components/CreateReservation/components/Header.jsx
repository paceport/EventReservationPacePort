import React from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({ type }) {
  const navigate = useNavigate();

  return (
    <div className="header-form">
      <span className="header-title">{type}</span>
      <div className="header-buttons">
        <button
          className="cancel-button"
          onClick={() => navigate("/sidebar/reservation")}
        >
          CANCEL
        </button>
        <button className="drafttitle-button">SAVE AS DRAFT</button>
      </div>
    </div>
  );
}


