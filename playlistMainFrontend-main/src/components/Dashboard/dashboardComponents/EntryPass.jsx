import "../dashboardStyles/EntryPass.css";
import Barcode from "react-barcode";
import Card from "react-bootstrap/Card";
import { MdLocationPin } from "react-icons/md";
import eventData from "../EntryPass_data.json";
import * as React from "react";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { BsArrowsFullscreen } from "react-icons/bs";

const color = {
  Event: "#DF653A",
  Experience_tour: "#F0B34F",
  Workshop: "#6DB657",
};

export default function EntryPassView() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setEvents(eventData);
  }, []);

  return (
    <div className="entry-pass-container">
      <h2 className="section-header">My Entry Passes</h2>

      <div className="eventpass-row">
        {events.map((event, index) => (
          <div className="event-list">
            <div>
              <Card
                key={index}
                className="event-card"
                style={{ borderRadius: 8, background: color[event.Type] }}
              >
                <Card.Body>
                  <Card.Subtitle className="mb-2 ">
                    <div>
                      {event.event_type}
                      <BsArrowsFullscreen style={{ float: "right" }} />
                    </div>
                  </Card.Subtitle>
                  <Card.Title style={{ color: "white", fontSize: 15 }}>
                    {event.Title}
                  </Card.Title>
                  <Card.Text style={{ fontSize: 13 }}>
                    <div>
                      <MdLocationPin size={18} /> {event.location}
                    </div>
                    <br />
                    <div style={{ float: "left", fontSize: 13 }}>
                      <div className="header">Date</div>
                      <div style={{ color: "white" }}>{event.date}</div>
                    </div>
                    <div style={{ float: "right", fontSize: 13 }}>
                      <div className="header">Time</div>
                      <div style={{ color: "white" }}>
                        {event.start_time} - {event.end_time}
                      </div>
                    </div>
                  </Card.Text>
                  <br />
                  <br />
                  <Divider color="black" />
                  <Barcode
                    value="barcode-example"
                    displayValue="false"
                    width={1}
                    height={40}
                    marginLeft={15}
                    marginTop={20}
                    background={color[event.Type]}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


