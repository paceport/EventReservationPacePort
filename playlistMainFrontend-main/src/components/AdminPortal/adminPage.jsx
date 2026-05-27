import React, { useState, useEffect } from "react";
import "./admin.css";
import { Searchicon } from "../Icons.js";
import Tableview from "../Reservation/TableView/Tableview.jsx";
import eventIcon from "../../images/EventsBlack.svg";
import ToggleSwitch from "../Toggle/ToggleSwitch.jsx";
import runningMan from "../../images/blackWalk.svg";
import workshopIcon from "../../images/Workshop.svg";
import EventCalendar from "./Calendar.jsx";
import { Coloums2 } from "../Reservation/TableView/TableData.js";
import "react-big-calendar/lib/css/react-big-calendar.css";

const ReservationsHeader = () => {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("USER");

  const fetchUserRole = async () => {
    const currentEmpId = JSON.parse(localStorage.getItem("user")).empid;

    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:4000/api/user/current/${currentEmpId}`,
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
      } else {
        let newRole = await response.json();
        setRole(newRole.role);
        if (newRole.role === "ADMIN") {
          await fetchData();
        } else {
          alert("You don't have access to this webpage.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:4000/api/event/all",
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
      } else {
        let postData = await response.json();
        setData(postData.reverse());
      }
    } catch (error) {
      alert("You are not a valid user. Please login again.");
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const eventsData = data.filter((item) => item.category_type === "Event");
  const workshopsData = data.filter(
    (item) => item.category_type === "Workshop"
  );
  const experienceToursData = data.filter(
    (item) => item.category_type === "Experience Tour"
  );
  const meetingsData = data.filter((item) => item.category_type === "Meeting");

  function handleChange() {
    setChecked(!checked);
  }
  return (
    <>
      <div className="reservations-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1>
            Reservations -
            {!checked ? (
              <span className="highlight">Table View</span>
            ) : (
              <span className="highlight">Calendar View</span>
            )}
          </h1>
          |
          <div className="view-toggle">
            {!checked ? (
              <span style={{ color: "white" }}>Table</span>
            ) : (
              <span style={{ color: "#A6A6A6" }}>Table</span>
            )}
            <ToggleSwitch onChange={handleChange} checked={checked} />
            {!checked ? (
              <span style={{ color: "#A6A6A6" }}>Calendar</span>
            ) : (
              <span style={{ color: "white" }}>Calendar</span>
            )}
          </div>
        </div>
        <div className="actions">
          <button className="search-btn">
            <Searchicon />
          </button>
          <button className="cart-btn">🛒</button>
        </div>
      </div>
      {!checked ? (
        <div className="admin-table">
          <div className="section-table">
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
              }}
            >
              <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
              <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
                Events
              </h4>
            </div>
            <Tableview data={eventsData} columns={Coloums2} />
          </div>

          <div className="section-table">
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <img src={workshopIcon} alt="Event" style={{ width: "20px" }} />
              <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
                Workshop
              </h4>
            </div>
            <Tableview data={workshopsData} columns={Coloums2} />
          </div>

          <div className="section-table">
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <img
                src={runningMan}
                alt="Event"
                style={{ width: "20px", color: "black" }}
              />
              <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
                Experience Tours
              </h4>
            </div>
            <Tableview data={experienceToursData} columns={Coloums2} />
          </div>
          <div className="section-table">
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <img src={eventIcon} alt="Event" style={{ width: "20px" }} />
              <h4 style={{ padding: "10px 0px 0px 10px", color: "black" }}>
                Meetings
              </h4>
            </div>
            <Tableview data={meetingsData} columns={Coloums2} />
          </div>
        </div>
      ) : (
        <EventCalendar events={data} />
      )}
    </>
  );
};

export default ReservationsHeader;


