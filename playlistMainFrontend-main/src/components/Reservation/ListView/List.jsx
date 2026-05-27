import * as React from "react";
import { useEffect, useState } from "react";
import "../ListView/List.css";
//import { DotIcon } from "../../Icons.js";
import CardView from "./CardView.jsx";
import eventIcon from "../../../images/EventsBlack.svg";

function TextExample({ data }) {
  const [events, setEvents] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [tours, setTours] = useState([]);
  const [meetings, setMeetings] = useState([]);
  //const [error, setError] = useState("");

  function listData() {
    let listOfEvents = [];
    let listOfWorkshop = [];
    let listOfTours = [];
    let listOfMeetings = [];

    if (data.message === 'relation "events" does not exist') {
      return null;
    } else {
      data.filter((item) => {
        if (item.category_type === "Event") {
          listOfEvents.push(item);
        } else if (item.category_type === "Workshop") {
          listOfWorkshop.push(item);
        } else if (item.category_type === "Experience Tour") {
          listOfTours.push(item);
        } else {
          listOfMeetings.push(item);
        }
      });
      setEvents(listOfEvents);
      setWorkshops(listOfWorkshop);
      setTours(listOfTours);
      setMeetings(listOfMeetings);
    }
  }

  useEffect(() => {
    listData();
  }, []);

  return (
    <div className="main">
      <div
        style={{
          display: "flex",
          flex: 1,
          // justifyContent: "space-between",
          marginLeft: "20px",
        }}
      >
        <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
        <h4 style={{ padding: "10px 0px 0px 10px" }}>Events</h4>
        {/* <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <span style={{ padding: "10px" }}>
            {
              <DotIcon
                style={{
                  paddingRight: "5px",
                  fontSize: "15px",
                  color: "#4BEE61",
                }}
              />
            }
            Active
          </span>
          <span style={{ padding: "10px" }}>
            {
              <DotIcon
                style={{
                  paddingRight: "5px",
                  fontSize: "15px",
                  color: "#FF1900",
                }}
              />
            }
            Expired
          </span>
        </div> */}
      </div>

      <div className="grid">
        {events.map((event, index) => (
          <CardView event={event} index={index} />
        ))}
      </div>
      <div>
        <div style={{ display: "flex", marginLeft: "20px" }}>
          <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
          <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
            Workshop
          </h4>
        </div>
        <div className="grid">
          {workshops.map((event, index) => (
            <CardView event={event} index={index} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "20px" }}>
        <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
        <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
          Experience Tour
        </h4>
      </div>
      <div className="grid">
        {tours.map((event, index) => (
          <CardView event={event} index={index} />
        ))}
      </div>
      <div style={{ display: "flex", marginLeft: "20px" }}>
        <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
        <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
          Meetings
        </h4>
      </div>
      <div className="grid">
        {meetings.map((event, index) => (
          <CardView event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TextExample;


