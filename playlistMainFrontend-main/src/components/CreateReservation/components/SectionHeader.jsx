import React from "react";
import "../styles/SessionHeader.css";

export default function SessionHeader({ header, spacingS }) {
  return (
    <div className="playlist-header-row">
      <span className="playlist-header-title">{header}</span>
      <button className="playlist-button">Add to Playlist</button>
    </div>
  );
}


