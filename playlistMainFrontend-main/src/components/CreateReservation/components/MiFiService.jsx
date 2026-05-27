import React from "react";
import ToggleSwitch from "../../Toggle/ToggleSwitch.jsx";

export default function MiFiService({ handleToggleMifi, mifi }) {
  return (
    <div>
      <div className="Agenda-servies-section">
        <span className="title-food">Mifi Device</span>
        <div>
          <ToggleSwitch onChange={handleToggleMifi} checked={mifi} />
        </div>
      </div>
    </div>
  );
}


