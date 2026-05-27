import React, { useState } from "react";
import ToggleSwitch from "../../Toggle/ToggleSwitch.jsx";

export default function KramerService({ handleToggleKramer, kramer }) {
  return (
    <div>
      <div className="Agenda-servies-section">
        <span className="title-food">Kramer Device</span>
        <div>
          <ToggleSwitch onChange={handleToggleKramer} checked={kramer} />
        </div>
      </div>
    </div>
  );
}


