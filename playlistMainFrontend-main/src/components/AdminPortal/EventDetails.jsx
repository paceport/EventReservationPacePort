import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./eventDetails.css";

function EventDetails() {
  const [eventData, setEventData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { eventID } = location.state || {};
  useEffect(() => {
    if (eventID) {
      const jwtToken = localStorage.getItem("accessToken");

      const url = `http://localhost:4000/api/event/${eventID}`;

      fetch(url, {
        headers: new Headers({
          Authorization: jwtToken,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setEventData(data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the event details:",
            error
          );
        });
    }
  }, [eventID]);
  if (!eventData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("/sidebar");
  };

  return (
    <div className="event-details">
      <button onClick={handleBack} className="back-button-event">
        ◀
      </button>

      <h1>Event Details</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div className="event-field">
          <label>ID:</label>
          <span>{eventData.id}</span>
        </div>
        <div className="event-field">
          <label>Published:</label>
          <span
            style={{
              color: eventData.published === "Pending" ? "blue" : "red",
            }}
          >
            {eventData.published}
          </span>
        </div>
      </div>
      <div className="event-field">
        <label>Title:</label>
        <span>{eventData.title}</span>
      </div>
      <div className="event-field">
        <label>User ID:</label>
        <span>{eventData.user_id}</span>
      </div>
      <div className="event-field">
        <label>Submitted Date:</label>
        <span>{new Date(eventData.submitted_date).toLocaleString()}</span>
      </div>
      <div className="event-field">
        <label>Organizer:</label>
        <span>
          {eventData.user_name} ({eventData.email})
        </span>
      </div>
      <div className="event-field">
        <label>Category Type:</label>
        <span>{eventData.category_type}</span>
      </div>
      <div className="event-field">
        <label>Start Date and Time:</label>
        <span>{new Date(eventData.start_datetime).toLocaleString()}</span>
      </div>
      <div className="event-field">
        <label>End Date and Time:</label>
        <span>{new Date(eventData.end_datetime).toLocaleString()}</span>
      </div>
      <div className="event-field">
        <label>Location:</label>
        <span>{eventData.location}</span>
      </div>
      <div className="event-field">
        <label>Participants:</label>
        <ul>
          {eventData.participants.map((participant, index) => (
            <li key={index}>
              {participant.customer} - {participant.designation}
            </li>
          ))}
        </ul>
      </div>
      <div className="event-field">
        <label>Food Service:</label>
        <ul>
          <li>Breakfast: {eventData.food_service.breakfast ? "Yes" : "No"}</li>
          <li>Lunch: {eventData.food_service.lunch ? "Yes" : "No"}</li>
          <li>Veg: {eventData.food_service.veg}</li>
          <li>Vegan: {eventData.food_service.vegan}</li>
          <li>Non-Veg: {eventData.food_service.non_veg}</li>
        </ul>
      </div>
      <div className="event-field">
        <label>Agenda:</label>
        <span>{eventData.agenda ? "Yes" : "No"}</span>
      </div>
      <div className="event-field">
        <label>MiFi Device:</label>
        <span>{eventData.mifi_device ? "Yes" : "No"}</span>
      </div>
      <div className="event-field">
        <label>Kramer Device:</label>
        <span>{eventData.kramer_device ? "Yes" : "No"}</span>
      </div>
      <div className="event-field">
        <label>Remarks:</label>
        <span>{eventData.remarks || "None"}</span>
      </div>
    </div>
  );
}

export default EventDetails;


