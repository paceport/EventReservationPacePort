import React from "react";
import Card from "react-bootstrap/Card";
import "../ListView/List.css";
import { DotIcon, LocationIcon } from "../../Icons.js";
import { Link } from "react-router-dom";

const color = {
  Event: "#DF653A",
  ExperienceTour: "#DF653A",
  Workshop: "#F0B34F",
};

const eventIcon = {
  Event: (
    <DotIcon style={{ float: "right", fontSize: "13px", color: "#4BEE61" }} />
  ),
  Workshop: (
    <DotIcon style={{ float: "right", fontSize: "13px", color: "#FF1900" }} />
  ),
  ExperienceTour: (
    <DotIcon style={{ float: "right", fontSize: "13px", color: "#4BEE61" }} />
  ),
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
  return (
    <Card
      key={index}
      className="grid-item"
      style={{ display: "flex", width: "250px", borderRadius: "12px" }}
    >
      <Card.Body style={{ padding: "10px", width: "100%" }}>
        <Card.Subtitle
          style={{
            color: color[event.type],
            paddingBottom: "10px",
            fontSize: "13px",
          }}
          className="mb-2"
        >
          {event.category_type}
          <Card.Text
            style={{
              float: "right",
              paddingLeft: "30px",
              color: "#A6A6A6",
              display: "flex",
              gap: "10px",
            }}
          >
            {/* {renderIcon(event.category_type)} */}
            {event.id}
          </Card.Text>
        </Card.Subtitle>
        <Card.Title style={{ color: "black", fontSize: "15px" }}>
          {event.title}{" "}
        </Card.Title>
        <Card.Text style={{ color: "#A1A1A1", fontSize: "12px" }}>
          <LocationIcon style={{ color: "#FF7979", fontSize: "12px" }} />{" "}
          {event.location}
          <br />
          {formattedDate(event.start_datetime)} |{" "}
          {calculateTimeDifferenceFormatted(
            event.start_datetime,
            event.end_datetime
          )}
          <br />
          <Link
            to={`/sidebar/eventDetails`}
            state={{ eventID: event.id }}
            class="card-link"
            style={{ float: "right", color: "blue" }}
          >
            Details
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


