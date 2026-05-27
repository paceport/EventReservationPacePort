import * as React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { MdLocationPin } from "react-icons/md";
import "../dashboardStyles/Invitation.css";
import { MdOutlineEvent } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdDirectionsWalk } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import Avatars from "../dashboardComponents/Avatars";

const color = {
  Event: "#DF653A",
  "Experience Tour": "#F0B34F",
  Workshop: "#6DB657",
  Meeting: "#E41165",
};

const eventIcon = {
  Event: <MdOutlineEvent size={24} style={{ float: "right" }} />,
  Workshop: <MdOutlineMenuBook size={24} style={{ float: "right" }} />,
  Experience_tour: <MdDirectionsWalk size={24} style={{ float: "right" }} />,
};

const renderIcon = (key) => {
  return eventIcon[key];
};

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

function InvitationCard({ event, index }) {
  return (
    <div style={{ paddingTop: 10 }}>
      <Card key={index} className="grid-item">
        <Card.Body>
          <Card.Subtitle
            style={{
              color: color[event.category_type],
              fontSize: "13px",
              fontWeight: "500",
              letterSpacing: "0.3px",
            }}
            className="mb-2"
          >
            {event.category_type}
            <div style={{ float: "right", color: "gray" }}>{event.id}</div>
          </Card.Subtitle>
          <Card.Title
            style={{
              fontFamily: "Segoe UI",
              fontSize: "13px",
              fontWeight: "500",
              letterSpacing: "0.3px",
            }}
          >
            {event.title}{" "}
          </Card.Title>
          <Card.Text
            style={{
              fontSize: "11px",
              color: "#A1A1A1",
              fontFamily: "Segoe UI",
              fontWeight: "500",
              letterSpacing: "0.3px",
            }}
          >
            <MdLocationPin size={16} color={"#FF7979"} /> {event.location}
            <br />
            <MdCalendarMonth size={16} /> {formattedDate(event.start_datetime)}{" "}
            - {formattedDate(event.end_datetime)}
            <br />
            <span
              style={{
                color: "#1E1E1B",
                fontFamily: "Calibri",
                fontWeight: "bold",
              }}
            >
              {" "}
              Duration:{" "}
              {calculateTimeDifferenceFormatted(
                event.start_datetime,
                event.end_datetime
              )}{" "}
            </span>
            <br />
            {/* <div style={{ float: "left" }}>
                <Avatars />
              </div> */}
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
    </div>
  );
}

export default InvitationCard;


