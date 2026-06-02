import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { ToggleLeftContainer } from "../Reservation/ReservationStyle";
import SearchBar from "../Searchbar/SearchBar.jsx";
import ButtonsRow from "./components/ButtonsRow.jsx";
import SessionHeader from "./components/SectionHeader.jsx";
import OverviewCard from "./components/OverviewCard.jsx";
import PlaylistCard from "./components/PlaylistCard.jsx";
import "./styles/FormTwo.css";
import likeIcon from "../../images/Like.svg";
import {
  SESSION_API_BASE_URL,
  SESSION_API_KEY,
} from "../../config/apiConfig";

const V1_API_URL = SESSION_API_BASE_URL;
const V1_API_KEY = SESSION_API_KEY;

export default function FormTwo({
  setFormTwoData,
  setActiveStep,
  initialEventIDs,
}) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedEventsID, setSelectedEventsID] = useState([]);
  const [uploadEvents, setUploadEvents] = useState([]);
  const [error, setError] = useState(null);
  const [addedShow, setAddedShow] = useState(false);
  const [removeShow, setRemoveShow] = useState(false);
  const [existingShow, setExistingShow] = useState(false);

  useEffect(() => {
    if (initialEventIDs && Array.isArray(initialEventIDs.events)) {
      setSelectedEventsID((prev) => [...prev, ...initialEventIDs.events]);
    }
  }, [initialEventIDs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(V1_API_URL, {
          headers: {
            "x-api-key": V1_API_KEY,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch uploaded sessions");
        }

        if (!Array.isArray(data)) {
          console.error("Expected array from V1 backend, received:", data);
          setUploadEvents([]);
          return;
        }

        setUploadEvents(data);

        const existingIds = Array.isArray(initialEventIDs?.events)
          ? initialEventIDs.events
          : [];

        const alreadySelectedEvents = data.filter((event) =>
          existingIds.includes(event.sessionid)
        );

        setSelectedEvents((prev) => [...prev, ...alreadySelectedEvents]);
      } catch (err) {
        console.error("Error fetching V1 sessions:", err);
        setError(err.message);
        setUploadEvents([]);
      }
    };

    fetchData();
  }, [initialEventIDs]);

  const handleClick = (event) => {
    if (!selectedEventsID.includes(event.sessionid)) {
      setSelectedEvents((prev) => [...prev, event]);
      setSelectedEventsID((prev) => [...prev, event.sessionid]);
      setAddedShow(true);
    } else {
      setExistingShow(true);
    }
  };

  const handleRemove = (event) => {
    setSelectedEvents((prev) =>
      prev.filter((e) => e.sessionid !== event.sessionid)
    );

    setSelectedEventsID((prev) =>
      prev.filter((id) => id !== event.sessionid)
    );

    setRemoveShow(true);
  };

  useEffect(() => {
    let timer;

    if (addedShow || existingShow || removeShow) {
      timer = setTimeout(() => {
        setAddedShow(false);
        setExistingShow(false);
        setRemoveShow(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [addedShow, existingShow, removeShow]);

  function handleSubmit() {
    setFormTwoData({
      Events: selectedEventsID,
    });

    setActiveStep(2);
  }

  function handleBack() {
    setActiveStep(0);
  }

  return (
    <div>
      <Header type="Compose Playlist" />

      <ToggleLeftContainer style={{ margin: "1.5rem" }}>
        <SearchBar />
      </ToggleLeftContainer>

      <div style={{ paddingLeft: "10px" }}>
        <ButtonsRow />
      </div>

      {error && (
        <div style={{ color: "red", margin: "1rem" }}>
          {error}
        </div>
      )}

      <div>
        <SessionHeader
          header="Contextual Engagements"
          spacingS={88}
          isSession={true}
        />
      </div>

      <div className="event-row">
        {uploadEvents.map((event, index) => (
          <div key={`contextual-${event.sessionid || index}`}>
            <OverviewCard
              event={event}
              index={index}
              onClick={() => handleClick(event)}
              selectedEvents={selectedEventsID.includes(event.sessionid)}
            />
          </div>
        ))}
      </div>

      <div>
        <SessionHeader header="Paceport Engagements" isSession={true} />
      </div>

      <div className="event-row">
        {uploadEvents.map((event, index) => (
          <OverviewCard
            key={`paceport-${event.sessionid || index}`}
            event={event}
            index={index}
            onClick={() => handleClick(event)}
            selectedEvents={selectedEventsID.includes(event.sessionid)}
          />
        ))}
      </div>

      <div>
        <SessionHeader header="My Playlist" isSession={false} />

        <div className="playlist-row">
          {selectedEvents.map((event, index) => (
            <PlaylistCard
              key={`playlist-${event.sessionid || index}`}
              event={event}
              index={index}
              onClick={() => handleRemove(event)}
            />
          ))}

          {selectedEvents.length === 0 && (
            <span className="no-item-playlist">
              No Items Added to the Playlist
            </span>
          )}
        </div>
      </div>

      <div className="button-form">
        <button className="draft-button">Save as Draft</button>

        <div className="back-proceed-buttons">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>

          <button className="proceed-button" onClick={handleSubmit}>
            Proceed
          </button>
        </div>
      </div>

      {addedShow && (
        <div className="floating-footer" style={{ backgroundColor: "#258E6C" }}>
          <div className="floating-section">
            <img
              src={likeIcon}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <span className="title-footer">
              Your selection is added to your Playlist. Scroll down to see
            </span>
          </div>

          <button className="close-button" onClick={() => setAddedShow(false)}>
            ✕
          </button>
        </div>
      )}

      {existingShow && (
        <div className="floating-footer" style={{ backgroundColor: "#d99000" }}>
          <span className="title-footer">
            This session is already in your Playlist.
          </span>

          <button className="close-button" onClick={() => setExistingShow(false)}>
            ✕
          </button>
        </div>
      )}

      {removeShow && (
        <div className="floating-footer" style={{ backgroundColor: "red" }}>
          <span className="title-footer">
            Your selection is removed from your Playlist.
          </span>

          <button
            className="close-button"
            style={{ color: "red" }}
            onClick={() => setRemoveShow(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}