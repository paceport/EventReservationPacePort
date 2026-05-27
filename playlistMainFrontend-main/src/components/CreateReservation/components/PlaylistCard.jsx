import { useEffect } from "react";
import { CardText } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function PlaylistCard({ event, index, onClick }) {
  return (
    <Card
      key={index}
      style={{
        width: "100%",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 18px #00000029",
        border: "1px solid #DDDDDD",
        marginBottom: "20px",
      }}
    >
      <Card.Body style={{ padding: "12px 12px 0px 12px", marginBottom: 0 }}>
        <Card.Title
          style={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Calibri",
            letterSpacing: "0.53px",
            margin: 0,
          }}
        >
          {event.sessionname}
        </Card.Title>
        <CardText
          style={{
            fontSize: 14,
            color: "#7F7F7F",
            margin: 0,
            fontFamily: "Calibri",
            letterSpacing: "0.53px",
          }}
        >
          {event.empname}
        </CardText>
        <div style={{ float: "right" }}>
          <button onClick={onClick} style={{ background: "none" }}>
            ✕
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 100,
            marginTop: 10,
          }}
        >
          <CardText
            style={{
              fontSize: 14,
              color: "#DD5041",
              margin: 0,
              fontFamily: "Calibri",
              letterSpacing: "0.53px",
            }}
          >
            {event.overviewduration} mins
          </CardText>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PlaylistCard;


