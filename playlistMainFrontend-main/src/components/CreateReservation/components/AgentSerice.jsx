import React from "react";
import ToggleSwitch from "../../Toggle/ToggleSwitch.jsx";

export default function AgentSerice({ agent, handleAngentToggle }) {
  return (
    <div>
      <div className="Agenda-servies-section">
        <span className="title-food">Agenda & Welcome Banner</span>
        <div>
          <ToggleSwitch onChange={handleAngentToggle} checked={agent} />
        </div>
      </div>

      {/* <div>
                    <div className="container">  
                        <div className="toggle-switch">  
                            <input  
                            type="checkbox"  
                            className="checkbox"  
                            id={label}  
                            checked={ASshow}  
                            onChange={handleChecked}  
                            />  
                            <label className="label" htmlFor={label}>  
                                <span className="inner" />  
                                <span className="switch" />  
                            </label>  
                        </div>  
                    </div>
                </div> */}
    </div>
  );
}


