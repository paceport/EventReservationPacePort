import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InvitationCard from "./InvitationCard";
import "../dashboardStyles/Body.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/apiConfig";

function TabCard() {
  const [events, setEvents] = useState([]);

  const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return "";
    }

    try {
      return JSON.parse(token);
    } catch {
      return token.replace(/^"|"$/g, "");
    }
  };

  const fetchData = async () => {
    try {
      const jwtToken = getAccessToken();
      const url = `${API_BASE_URL}/api/event/all`;

      console.log("Fetching events from:", url);

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: jwtToken,
        },
      });

      const responseText = await response.text();

      if (response.status === 401) {
        console.log("Unauthorized:", responseText);
        return;
      }

      if (!response.ok) {
        console.error("Failed to fetch events:", response.status, responseText);
        return;
      }

      try {
        const postData = JSON.parse(responseText);
        setEvents(Array.isArray(postData) ? postData : []);
      } catch (jsonError) {
        console.error("Event API did not return valid JSON.");
        console.error("Response was:", responseText);
        setEvents([]);
      }
    } catch (error) {
      console.error("TabCard fetchData error:", error);
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
        className="tabs"
        justify
        style={{ width: "60%", color: "black", borderBlock: "none" }}
      >
        <Tab className="tab nav-link" eventKey="Today" title={<div>Today</div>}>
          <div className="grid">
            {eventsToday.length > 0 ? (
              eventsToday.map((event, index) => (
                <InvitationCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <span>There are no events today.</span>
            )}
          </div>
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