import React from "react";
import banner from "../background.png";
//import SearchBar from "./SearchBar";
import { MdAdd } from "react-icons/md";
import "../dashboardStyles/Banner.css";
import CardView from "./CardView";
import { green } from "@mui/material/colors";
import { AddIcon } from "../../Icons";
import eventData from "../Event_data.json";
import { useEffect, useState } from "react";
import "../dashboardStyles/List.css";
import plusIcon from "../../../images/addSign.png";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/apiConfig";

export default function Banner() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_BASE_URL}/api/event/all`,
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
        //navigate("/");
      } else {
        let postData = await response.json();
        setEvents(postData.reverse());
      }
    } catch (error) {
      alert("You are not a valid user. Please login again.");
      //navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [checked, setChecked] = useState(true);

  function handleClick() {
    return navigate("/sidebar/reservation");
  }

  return (
    <div className="image-overlay-container">
      <img
        className="background-banner-container"
        src={banner}
        alt="placeholder"
      />
      <div className="overlay-content">
        <div className="overlay-title">
          <h3
            style={{
              float: "left",
              fontSize: "20px",
              letterSpacing: "1px",
              fontWeight: "500",
            }}
          >
            My Active Reservations
          </h3>
        </div>
        <div className="overlay-button">
          <img
            src={plusIcon}
            style={{ width: "30px", height: "30px" }}
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="overlay-card">
        <div className="grid">
          {events.map((event, index) => (
            <CardView event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


