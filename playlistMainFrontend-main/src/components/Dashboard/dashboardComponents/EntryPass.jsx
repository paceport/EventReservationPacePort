// import "../dashboardStyles/EntryPass.css";
// import Barcode from "react-barcode";
// import Card from "react-bootstrap/Card";
// import { MdLocationPin } from "react-icons/md";
// import eventData from "../EntryPass_data.json";
// import * as React from "react";
// import { useEffect, useState } from "react";
// import Divider from "@mui/material/Divider";
// import { BsArrowsFullscreen } from "react-icons/bs";

// const color = {
//   Event: "#DF653A",
//   Experience_tour: "#F0B34F",
//   Workshop: "#6DB657",
// };

// export default function EntryPassView() {
//   const [events, setEvents] = useState([]);
//   useEffect(() => {
//     setEvents(eventData);
//   }, []);

//   return (
//     <div className="entry-pass-container">
//       <h2 className="section-header">My Entry Passes</h2>

//       <div className="eventpass-row">
//         {events.map((event, index) => (
//           <div className="event-list">
//             <div>
//               <Card
//                 key={index}
//                 className="event-card"
//                 style={{ borderRadius: 8, background: color[event.Type] }}
//               >
//                 <Card.Body>
//                   <Card.Subtitle className="mb-2 ">
//                     <div>
//                       {event.event_type}
//                       <BsArrowsFullscreen style={{ float: "right" }} />
//                     </div>
//                   </Card.Subtitle>
//                   <Card.Title style={{ color: "white", fontSize: 15 }}>
//                     {event.Title}
//                   </Card.Title>
//                   <Card.Text style={{ fontSize: 13 }}>
//                     <div>
//                       <MdLocationPin size={18} /> {event.location}
//                     </div>
//                     <br />
//                     <div style={{ float: "left", fontSize: 13 }}>
//                       <div className="header">Date</div>
//                       <div style={{ color: "white" }}>{event.date}</div>
//                     </div>
//                     <div style={{ float: "right", fontSize: 13 }}>
//                       <div className="header">Time</div>
//                       <div style={{ color: "white" }}>
//                         {event.start_time} - {event.end_time}
//                       </div>
//                     </div>
//                   </Card.Text>
//                   <br />
//                   <br />
//                   <Divider color="black" />
//                   <Barcode
//                     value="barcode-example"
//                     displayValue="false"
//                     width={1}
//                     height={40}
//                     marginLeft={15}
//                     marginTop={20}
//                     background={color[event.Type]}
//                   />
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import "../dashboardStyles/EntryPass.css";
import Barcode from "react-barcode";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdLocationPin } from "react-icons/md";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import { BsArrowsFullscreen } from "react-icons/bs";
import html2canvas from "html2canvas";
import {
  API_BASE_URL,
  SESSION_API_BASE_URL,
  SESSION_API_KEY,
} from "../../../config/apiConfig";

const passColors = ["#DF653A", "#F0B34F", "#6DB657", "#2E86AB"];

function safeJsonParse(value) {
  if (!value || typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeArray(value) {
  const parsedValue = safeJsonParse(value);

  if (!parsedValue) {
    return [];
  }

  if (Array.isArray(parsedValue)) {
    return parsedValue;
  }

  if (typeof parsedValue === "object" && Array.isArray(parsedValue.events)) {
    return parsedValue.events;
  }

  if (typeof parsedValue === "string") {
    return parsedValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function extractSessionIds(event) {
  const possibleSessionValues = [
    event?.agenda?.events,
    event?.agenda_events,
    event?.events,
    event?.event_ids,
    event?.session_ids,
    event?.sessions,
    event?.logistics?.agenda?.events,
  ];

  for (const value of possibleSessionValues) {
    const normalized = normalizeArray(value);

    if (normalized.length > 0) {
      return normalized
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            return item.sessionid || item.session_id || item.id;
          }

          return item;
        })
        .filter(Boolean)
        .map(String);
    }
  }

  return [];
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sanitizeFileName(value) {
  return String(value || "entry-pass")
    .replace(/[^a-z0-9-_]/gi, "_")
    .toLowerCase();
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function unwrapEventResponse(responseJson, fallbackEvent) {
  return responseJson?.data || responseJson?.event || responseJson || fallbackEvent;
}

export default function EntryPassView() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const passRefs = useRef({});

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        setLoading(true);
        setError("");

        const jwtToken = localStorage.getItem("accessToken");
        const currentUser = getStoredUser();
        const currentEmpId = currentUser?.empid || currentUser?.id;

        const [eventsResponse, sessionsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/event/all`, {
            headers: {
              Authorization: jwtToken || "",
            },
          }),
          fetch(SESSION_API_BASE_URL, {
            headers: {
              "x-api-key": SESSION_API_KEY,
            },
          }),
        ]);

        const eventsData = await eventsResponse.json();
        const sessionsData = await sessionsResponse.json();

        if (!eventsResponse.ok) {
          throw new Error(
            eventsData?.message || "Failed to fetch reservation events"
          );
        }

        if (!sessionsResponse.ok) {
          throw new Error(
            sessionsData?.message || "Failed to fetch uploaded sessions"
          );
        }

        const rawEvents = Array.isArray(eventsData)
          ? eventsData
          : eventsData?.data || eventsData?.events || [];

        const uploadedSessions = Array.isArray(sessionsData) ? sessionsData : [];

        const sessionMap = new Map(
          uploadedSessions.map((session) => [String(session.sessionid), session])
        );

        const userEvents = rawEvents.filter((event) => {
          if (!currentEmpId) {
            return true;
          }

          return String(event.user_id) === String(currentEmpId);
        });

        const eventsWithDetails = await Promise.all(
          userEvents.map(async (event) => {
            try {
              const detailResponse = await fetch(
                `${API_BASE_URL}/api/event/${event.id}`,
                {
                  headers: {
                    Authorization: jwtToken || "",
                  },
                }
              );

              if (!detailResponse.ok) {
                return event;
              }

              const detailJson = await detailResponse.json();

              return {
                ...event,
                ...unwrapEventResponse(detailJson, event),
              };
            } catch {
              return event;
            }
          })
        );

        const generatedPasses = [];

        eventsWithDetails.forEach((event) => {
          const sessionIds = extractSessionIds(event);

          sessionIds.forEach((sessionId) => {
            const session = sessionMap.get(String(sessionId));

            generatedPasses.push({
              passId: `${event.id}-${sessionId}`,
              eventId: event.id,
              eventTitle: event.title || "Reservation",
              eventType: event.category_type || "Event",
              location: event.location || "N/A",
              startDateTime: event.start_datetime,
              endDateTime: event.end_datetime,
              sessionId,
              sessionName: session?.sessionname || `Session ${sessionId}`,
              sessionCategory: session?.overviewcategory || "Session",
              sessionDuration: session?.overviewduration || "",
              participants: event.participants || [],
            });
          });
        });

        setPasses(generatedPasses);
      } catch (err) {
        console.error("Failed to load entry passes:", err);
        setError(err.message || "Failed to load entry passes");
        setPasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPasses();
  }, []);

  const handleDownloadPass = async (pass) => {
    const passElement = passRefs.current[pass.passId];

    if (!passElement) {
      return;
    }

    const canvas = await html2canvas(passElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = `${sanitizeFileName(pass.eventTitle)}-${sanitizeFileName(
      pass.sessionName
    )}-pass.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="entry-pass-container">
      <h2 className="section-header">My Entry Passes</h2>

      {loading && <div style={{ padding: "1rem" }}>Loading entry passes...</div>}

      {!loading && error && (
        <div style={{ color: "red", padding: "1rem" }}>{error}</div>
      )}

      {!loading && !error && passes.length === 0 && (
        <div style={{ padding: "1rem" }}>
          No entry passes found. Book a reservation with selected sessions to
          generate downloadable passes.
        </div>
      )}

      <div className="eventpass-row">
        {passes.map((pass, index) => {
          const backgroundColor = passColors[index % passColors.length];

          const barcodeValue = `PASS-${pass.eventId}-${pass.sessionId}`;

          return (
            <div className="event-list" key={pass.passId}>
              <div>
                <Card
                  ref={(element) => {
                    passRefs.current[pass.passId] = element;
                  }}
                  className="event-card generated-pass-card"
                  style={{
                    borderRadius: 8,
                    background: backgroundColor,
                    overflow: "hidden",
                  }}
                >
                  <Card.Body>
                    <Card.Subtitle className="mb-2">
                      <div>
                        {pass.eventType}
                        <BsArrowsFullscreen style={{ float: "right" }} />
                      </div>
                    </Card.Subtitle>

                    <Card.Title style={{ color: "white", fontSize: 15 }}>
                      {pass.eventTitle}
                    </Card.Title>

                    <div style={{ fontSize: 13 }}>
                      <div>
                        <MdLocationPin size={18} /> {pass.location}
                      </div>

                      <br />

                      <div style={{ color: "white", fontSize: 14 }}>
                        {pass.sessionName}
                      </div>

                      <div style={{ color: "white", fontSize: 12 }}>
                        {pass.sessionCategory}
                        {pass.sessionDuration
                          ? ` • ${pass.sessionDuration} mins`
                          : ""}
                      </div>

                      <br />

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 13 }}>
                          <div className="header">Date</div>
                          <div style={{ color: "white" }}>
                            {formatDate(pass.startDateTime)}
                          </div>
                        </div>

                        <div style={{ fontSize: 13, textAlign: "right" }}>
                          <div className="header">Time</div>
                          <div style={{ color: "white" }}>
                            {formatTime(pass.startDateTime)} -{" "}
                            {formatTime(pass.endDateTime)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />

                    <Divider color="black" />

                    <div
                      style={{
                        marginTop: "12px",
                        width: "100%",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Barcode
                        value={barcodeValue}
                        displayValue={false}
                        width={1}
                        height={40}
                        margin={0}
                        background={backgroundColor}
                      />
                    </div>
                  </Card.Body>
                </Card>

                <Button
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    maxWidth: "240px",
                  }}
                  onClick={() => handleDownloadPass(pass)}
                >
                  Download Pass
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}