import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InvitationCard from "./InvitationCard";
import "../dashboardStyles/Body.css";
import { useEffect, useState } from "react";
import { DotIcon } from "../../Icons";

function TabCard() {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://52.22.173.61/api/api/event/all",
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        console.log("Response Status", response.status);
      } else {
        let postData = await response.json();
        setEvents(postData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsToday = events.filter((event) => {
    const eventDate = new Date(event.start_datetime);
    return eventDate.setHours(0, 0, 0, 0) === today.getTime();
  });

  const eventsUpcoming = events.filter((event) => {
    const eventDate = new Date(event.start_datetime);
    return eventDate > today;
  });

  const eventsPast = events.filter((event) => {
    const eventDate = new Date(event.start_datetime);
    return eventDate < today;
  });

  return (
    <div>
      <Tabs
        defaultActiveKey="Today"
        id="uncontrolled-tab-example"
        className="tabs "
        justify
        style={{ width: "60%", color: "black", borderBlock: "none" }}
      >
        <Tab className="tab nav-link" eventKey="Today" title={<div>Today</div>}>
          {/* <div
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              backgroundColor: " #F2F2F2",
            }}
          > */}
          {/* <div style={{ fontWeight: "bolder" }}>
              <DotIcon
                style={{
                  fontSize: "23px",
                  color: "#4BEE61",
                  paddingRight: "10px",
                }}
              />
              You have one meeting scheduled today at 3pm
            </div> */}
          {/* <div style={{ color: "#7F7F7F", fontSize: "12px" }}>
              starting in
              <span style={{ color: "#7A1C2C", fontWeight: "bold" }}>
                03 hrs 25min 10s{" "}
              </span>
              <div
                style={{
                  display: "inline-block",
                  color: "maroon",
                  paddingRight: "2",
                }}
              >
                03 hrs 25min 10s
              </div>
            </div> */}

          <div className="grid">
            {eventsToday.length > 0 ? (
              eventsToday.map((event, index) => (
                <InvitationCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <span>There are no events today.</span>
            )}
          </div>
          {/* </div> */}
        </Tab>
        <Tab className="tab" eventKey="Upcoming" title={<div>Upcoming</div>}>
          <div className="grid" style={{ marginLeft: "50px" }}>
            {eventsUpcoming.length > 0 ? (
              eventsUpcoming.map((event, index) => (
                <InvitationCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <span>There are no upcoming events.</span>
            )}
          </div>
        </Tab>

        <Tab className="tab" eventKey="Past" title={<div>Past</div>}>
          <div className="grid" style={{ marginLeft: "50px" }}>
            {eventsPast.length > 0 ? (
              eventsPast.map((event, index) => (
                <InvitationCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <span>There are no past events.</span>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabCard;


