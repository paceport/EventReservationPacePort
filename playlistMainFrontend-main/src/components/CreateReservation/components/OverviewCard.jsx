import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../styles/cardOverview.css";
import checkmark from "../../../images/Tick.svg";
function OverviewCard({ event, index, onClick, selectedEvents }) {
  return (
    <div>
      <Card key={index} className="card-overview">
        <div className="header-card">
          <Card.Img src={event.overviewimageurl} className="card-image" />
          {selectedEvents && (
            <div className="selected-card">
              <img src={checkmark} alt="checked" />
            </div>
          )}
          {!selectedEvents && (
            <button onClick={onClick} className="select-card">
              {" "}
              <img src={checkmark} alt="checked" />
            </button>
          )}
        </div>
        <Card.Body className="body-card">
          <Card.Title className="title-card">{event.sessionname}</Card.Title>
          <Card.Text className="text-card">{event.empname}</Card.Text>
          <Card.Text className="detailed-card-text">
            {event.overviewtext}
          </Card.Text>
          <div className="bottom-section">
            <Card.Text className="card-duration">
              {event.overviewduration} mins
            </Card.Text>
            <span className="card-details-link">Details</span>
            {/* <Link className="card-details-link">Details</Link> */}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OverviewCard;


