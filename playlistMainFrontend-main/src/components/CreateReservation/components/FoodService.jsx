import React, { useState } from "react";
import "../styles/foodService.css";
import ToggleSwitch from "../../Toggle/ToggleSwitch.jsx";
import Checkbox from "@mui/material/Checkbox";
import { MdAdd } from "react-icons/md";
import { FaEquals } from "react-icons/fa";
import plusIcon from "../../../images/Plus.svg";
import { Divider } from "@mui/material";

export default function FoodService({
  setNV,
  nonVeg,
  Veg,
  Vegan,
  setV,
  lunch,
  breakfast,
  setVn,
  setLunch,
  setBreakfast,
  foodService,
  handleFoodToggle,
}) {
  const handleNonVegChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;

    setNV(value);
  };

  const handleVegChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setV(value);
  };

  const handleVeganChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setVn(value);
  };

  const total = nonVeg + Veg + Vegan;

  const handleChange = (event) => {
    setBreakfast(event.target.checked);
  };

  const lunchhandleChange = (event) => {
    setLunch(event.target.checked);
  };

  const label = "Food";

  return (
    <div>
      <div className="Food-servies-section">
        <span className="title-food">Food Service</span>
        <div>
          <ToggleSwitch checked={foodService} onChange={handleFoodToggle} />
        </div>
      </div>
      <div>
        {foodService && (
          <div className="dropdown">
            <div className="Breakfast-lunch-section">
              <div className="breakfast">
                <span className="title-breakfast">Breakfast</span>
                <Checkbox
                  checked={breakfast}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="lunch">
                <span className="title-breakfast">Lunch</span>

                <Checkbox
                  className="breakfast-checkbox"
                  checked={lunch}
                  onChange={lunchhandleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <Divider
              sx={{
                opacity: 5.0,
                bgcolor: "#A6A6A6",
                width: "1px",
                height: "120px",
                marginTop: "1.5rem",
                marginRight: "3.5rem",
              }}
            />
            <div className="food-selection">
              <div className="non-veg-section">
                <span className="title-workshop">Non-Veg</span>
                <input
                  className="non-veg-input"
                  placeholder="Count"
                  type="number"
                  value={nonVeg}
                  onChange={handleNonVegChange}
                />
              </div>
              <img src={plusIcon} alt="" className="Add-Sign" />
              <div className="non-veg-section">
                <span className="title-workshop">Veg</span>
                <input
                  className="non-veg-input"
                  placeholder="Count"
                  type="number"
                  value={Veg}
                  onChange={handleVegChange}
                />
              </div>
              <img src={plusIcon} alt="" className="Add-Sign" />
              <div className="non-veg-section">
                <span className="title-workshop">Vegan</span>
                <input
                  className="non-veg-input"
                  placeholder="Count"
                  type="number"
                  value={Vegan}
                  onChange={handleVeganChange}
                />
              </div>
              <FaEquals style={{ color: "#7F7F7F", marginTop: "25px" }} />
              <div className="non-veg-section">
                <span className="title-workshop">Total</span>
                <input
                  className="total-count-input"
                  placeholder="00"
                  type="number"
                  value={total}
                  InputProps={{ readOnly: true }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


