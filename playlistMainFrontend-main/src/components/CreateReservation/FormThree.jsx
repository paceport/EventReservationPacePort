import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FoodService from "./components/FoodService";
import AgentSerice from "./components/AgentSerice";
import MiFiService from "./components/MiFiService";
import KramerService from "./components/KramerService";
import "./styles/FormThree.css";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import alertIcon from "../../images/Announcement.png";
import { API_BASE_URL } from "../../config/apiConfig";


export default function FormThree({
  setFormThreeData,
  setActiveStep,
  initialLogisticsData,
}) {
  const navigate = useNavigate();
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState();
  const [mifi, setMifi] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [agent, setAgent] = useState(false);
  const [kramer, setKramer] = useState(false);
  const [nonVeg, setNonVeg] = useState(0);
  const [Vegan, setVegan] = useState(0);
  const [Veg, setVeg] = useState(0);
  const [foodService, setFoodService] = useState(false);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    async function getLogisticsById(id) {
      try {
        const jwtToken = localStorage.getItem("accessToken");

        const response = await fetch(
          `${API_BASE_URL}/api/event/getLogistics/${id}`,
          {
            headers: new Headers({
              Authorization: jwtToken,
            }),
          }
        );
        const data = await response.json();
        if (
          data.food_service.veg > 0 ||
          data.food_service.vegan > 0 ||
          data.food_service.non_veg > 0 ||
          data.food_service.breakfast === true ||
          data.food_service.lunch === true
        ) {
          setFoodService(true);
        }

        if (data.food_service) {
          setBreakfast(data.food_service.breakfast || false);
          setLunch(data.food_service.lunch || false);
          setVeg(data.food_service.veg || 0);
          setVegan(data.food_service.vegan || 0);
          setNonVeg(data.food_service.non_veg || 0);
        }

        setMifi(data.mifi_device);
        setAgent(data.agenda);
        setKramer(data.kramer_device);
        setRemarks(data.remarks);
      } catch (error) {}
    }

    if (initialLogisticsData && initialLogisticsData.logistics_id) {
      getLogisticsById(initialLogisticsData.logistics_id);
    }
  }, [initialLogisticsData]);

  useEffect(() => {
    togglePopup();
  }, [agent, kramer, mifi, foodService]);

  function togglePopup() {
    if (
      foodService === true ||
      lunch === true ||
      breakfast === true ||
      mifi === true ||
      agent === true ||
      kramer === true
    ) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
    }
  }
  const handleToggleMifi = () => {
    setMifi(!mifi);
  };

  const handleToggleKramer = () => {
    setKramer(!kramer);
  };

  function handleToggleAgent() {
    setAgent(!agent);
  }
  function handleFoodToggle() {
    setFoodService(!foodService);
  }
  const handleNonVegChange = (count) => {
    setNonVeg(count);
  };

  const handleLunch = (value) => {
    setLunch(value);
  };
  const handleBreakfast = (value) => {
    setBreakfast(value);
  };
  const handleVegChange = (count) => {
    setVeg(count);
  };

  const handleVeganChange = (count) => {
    setVegan(count);
  };

  function handleSubmit() {
    const logisticsData = {
      foodService,
      agent,
      mifi,
      kramer,
      breakfast,
      lunch,
      nonVeg,
      Veg,
      Vegan,
      remarks,
    };

    sendDatatoParent(logisticsData);
  }

  function sendDatatoParent(logisticsData) {
    const logistics = {
      logistics: logisticsData,
    };
    setFormThreeData(logistics);
  }

  function handleBack() {
    setActiveStep(1);
  }
  const total = nonVeg + Veg + Vegan;

  return (
    <div>
      <Header type="Logistics" />
      <div className="event-logistics">
        <div className="FoodService">
          <FoodService
            setNV={handleNonVegChange}
            nonVeg={nonVeg}
            Veg={Veg}
            Vegan={Vegan}
            lunch={lunch}
            breakfast={breakfast}
            setV={handleVegChange}
            setVn={handleVeganChange}
            setLunch={handleLunch}
            setBreakfast={handleBreakfast}
            foodService={foodService}
            handleFoodToggle={handleFoodToggle}
          />
        </div>
        <Divider
          sx={{ opacity: 1.0, bgcolor: "#F2F2F2", borderBottomWidth: 2 }}
        />
        <div>
          <AgentSerice handleAngentToggle={handleToggleAgent} agent={agent} />
        </div>
        <Divider
          sx={{ opacity: 5.0, bgcolor: "#F2F2F2", borderBottomWidth: 2 }}
        />
        <div>
          <MiFiService handleToggleMifi={handleToggleMifi} mifi={mifi} />
        </div>
        <Divider
          sx={{ opacity: 5.0, bgcolor: "#F2F2F2", borderBottomWidth: 2 }}
        />
        <div>
          <KramerService
            handleToggleKramer={handleToggleKramer}
            kramer={kramer}
          />
        </div>
        <Divider
          sx={{ opacity: 5.0, bgcolor: "#F2F2F2", borderBottomWidth: 2 }}
        />
      </div>

      {showPopUp && (
        <div className="PopUp-Section">
          <div className="pop-up-section">
            <img
              src={alertIcon}
              alt=""
              style={{ width: "50px", height: "50px", marginLeft: "1.5rem" }}
            />
            <span className="pop-up-title">
              Based on your selection, an auto-generated mail will be triggered
              to the respective departments to make necessary arrangements.
            </span>
          </div>
          <textarea
            className="pop-up-textArea"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Please mention any allergies, food preferences, or the number of Kramer/MiFi devices needed."
          ></textarea>
        </div>
      )}
      <div className="button-form">
        <button className="draft-button">Save as Draft</button>
        <div className="back-proceed-buttons">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="proceed-button" onClick={handleSubmit}>
            Procced
          </button>
        </div>
      </div>
    </div>
  );
}


