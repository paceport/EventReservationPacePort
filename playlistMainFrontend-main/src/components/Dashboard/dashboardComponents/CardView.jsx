import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../dashboardStyles/List.css";
import {
  MdOutlineEvent,
  MdOutlineMenuBook,
  MdDirectionsWalk,
  MdLocationPin,
} from "react-icons/md";
import { MeetingIcon, ExperienceTourIcon } from "../../Icons";

const color = {
  Event: "#DF653A",
  "Experience Tour": "#F0B34F",
  Workshop: "#6DB657",
  Meeting: "#E41165",
};

const eventIcon = {
  Event: <MdOutlineEvent size={24} style={{ float: "right" }} />,
  Workshop: <MdOutlineMenuBook size={24} style={{ float: "right" }} />,
  "Experience Tour": (
    <ExperienceTourIcon size={24} style={{ float: "right" }} />
  ),
  Meeting: <MeetingIcon size={24} style={{ float: "right" }} />,
};

const renderIcon = (key) => {
  return eventIcon[key];
};

function formattedDate(ISODate) {
  const date = new Date(ISODate);
  const year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const newDate = year + "-" + month + "-" + dt;
  return newDate;
}

function calculateTimeDifferenceFormatted(isoTimeStamp1, isoTimeStamp2) {
  const date1 = new Date(isoTimeStamp1);
  const date2 = new Date(isoTimeStamp2);

  const differenceInMilliseconds = date2.getTime() - date1.getTime();

  let differenceInHours = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  );
  let differenceInMinutes = Math.round(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (differenceInMinutes === 60) {
    differenceInHours++;
    differenceInMinutes = 0;
  }

  let formattedDifference = "";
  if (differenceInHours > 0) {
    formattedDifference += `${differenceInHours} hour${
      differenceInHours > 1 ? "s" : ""
    }`;
  }
  if (differenceInMinutes > 0) {
    if (formattedDifference.length > 0) {
      formattedDifference += " ";
    }
    formattedDifference += `${differenceInMinutes} min${
      differenceInMinutes > 1 ? "s" : ""
    }`;
  }
  if (formattedDifference.length === 0) {
    formattedDifference = "0 mins";
  }

  return formattedDifference;
}
export default function CardView({ event, index }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    setUser(currentUser);
  }, []);

  return (
    <Card
      key={index}
      className="grid-item"
      style={{
        display: "flex",
        width: "220px",
        borderRadius: "12px",
        height: "130px",
      }}
    >
      <Card.Body>
        <Card.Subtitle
          style={{
            color: color[event.category_type],
            fontSize: "13px",
            fontFamily: "Calibri",
            letterSpacing: "0.3px",
            fontWeight: "bold",
          }}
          className="mb-1"
        >
          {event.category_type}
          {renderIcon(event.category_type)}
        </Card.Subtitle>
        <Card.Title
          style={{
            color: "black",
            fontSize: "13px",
            fontFamily: "Segoe UI",
            letterSpacing: "0.3px",
          }}
        >
          {" "}
          {event.title}{" "}
        </Card.Title>
        <Card.Text
          style={{
            color: "#7F7F7F",
            fontSize: "11px",
            fontFamily: "Segoe UI",
            fontWeight: "500",
            letterSpacing: "0.3px",
          }}
        >
          <MdLocationPin size={16} color={"#FF7979"} /> {event.location}
          <br />
          <br />
          <span style={{ color: "#1E1E1B", fontFamily: "Calibri" }}>
            {formattedDate(event.start_datetime)} |{" "}
            {calculateTimeDifferenceFormatted(
              event.start_datetime,
              event.end_datetime
            )}{" "}
          </span>
          {event.user_id === user.empid ? (
            <Link
              className="card-link"
              style={{
                float: "right",
                color: "#4E84C4",
                fontWeight: "500",
                fontSize: "13px",
              }}
              to={"reservation/new"}
              state={{ isEditMode: true, event: event }}
            >
              Edit
            </Link>
          ) : (
            ""
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


