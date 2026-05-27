import React, { useEffect, useState } from "react";
import { LocationIcon, WorkShopIcon, ExperienceTourIcon } from "../Icons.js";

import {
  ListDate,
  ListInfo,
  ListItem,
  ListLocation,
  ListTitle,
  Progress,
  ProgressBar,
  ListIcon,
  DropdownButton,
  Container,
  CardHeader,
  CardBody,
  MainDiv,
  HorizontalList,
  CardItems,
  CardView,
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
  Slider,
  SliderContainer,
  Remarks,
} from "./Feedback";
import { DropdownIcon, DropupIcon } from "../Icons";
import calenderSVG from "../../images/Calendar.svg";
const eventIcon = {
  Design_Thinking_Workshop: (
    <WorkShopIcon style={{ fontSize: "30px", color: "#EBAF4D" }} />
  ),
  ExperienceTour: (
    <ExperienceTourIcon style={{ fontSize: "30px", color: "#6DB657" }} />
  ),
};

const renderIcon = (key) => {
  return eventIcon[key];
};

export default function DropdownList({
  review,
  details,
  idx,
  index,
  onProgressChange,
}) {
  const [show, setShow] = useState(false);
  const [optedOutDetails, setOptedOutDetails] = useState(
    details.map(() => false)
  );
  const [remarksFilled, setRemarksFilled] = useState(details.map(() => false));
  const [slidersMoved, setSlidersMoved] = useState(details.map(() => false));
  const [progress, setProgress] = useState(review.progress);

  const handleRemarksChange = (detailIdx, value) => {
    //   if (optedOutDetails[detailIdx]) return;
    const newRemarksFilled = [...remarksFilled];
    newRemarksFilled[detailIdx] = value.trim() !== "";
    setRemarksFilled(newRemarksFilled);
    updateProgress();
  };

  const handleSliderChange = (detailIdx, value) => {
    //if (optedOutDetails[detailIdx]) return;
    const newSlidersMoved = [...slidersMoved];
    newSlidersMoved[detailIdx] = value > 0;
    setSlidersMoved(newSlidersMoved);
    updateProgress();
  };

  useEffect(() => {
    updateProgress();
  }, [slidersMoved, remarksFilled, optedOutDetails]);

  const updateProgress = () => {
    const totalActions = details.length * 2;
    const completedActions =
      remarksFilled.filter(Boolean).length +
      slidersMoved.filter(Boolean).length;

    const optedOutCalculations = details.length * 1;
    const optedActions = optedOutDetails.filter(Boolean).length;

    //const newProgress = (completedActions / totalActions)  * 100;
    //setProgress(newProgress);
    const newProgress =
      (completedActions / totalActions + optedActions / optedOutCalculations) *
      100;
    setProgress(newProgress);

    // if(optedOutDetails[idx]){
    //   setProgress(newProgress2);
    // } else{
    //          setProgress()
    // }

    if (onProgressChange) {
      onProgressChange(newProgress);
    }
  };

  const handleCheckboxChange = (detailIdx, checked) => {
    const newOptedOutDetails = optedOutDetails.map((item, idx) =>
      idx === detailIdx ? checked : item
    );
    setOptedOutDetails(newOptedOutDetails);
    updateProgress();
  };

  return (
    <MainDiv>
      <HorizontalList>
        <ListItem key={index}>
          <ListInfo>
            <ListIcon style={{ height: "100%" }}>
              {renderIcon(review.title)}
            </ListIcon>
            <ListTitle>{review.title}</ListTitle>
            <ListLocation>
              {<LocationIcon style={{ color: "#FF7979", fontSize: "14px" }} />}
              {review.location}
            </ListLocation>
            <ListDate>
              <img
                src={calenderSVG}
                alt="Calender"
                style={{ width: "22px", height: "22px", marginRight: "5px" }}
              />
              {review.date}
            </ListDate>
          </ListInfo>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ProgressBar>
              <Progress percent={progress} />
            </ProgressBar>
            <div
              style={{
                color: "#7F7F7F",
                paddingRight: "10px",
                fontSize: "12px",
              }}
            >
              {review.progress.toFixed(0)}% Complete |{" "}
            </div>
            <DropdownButton onClick={() => setShow(!show)}>
              {show ? <DropupIcon /> : <DropdownIcon />}
            </DropdownButton>
          </div>
        </ListItem>
      </HorizontalList>

      {show ? (
        <Container>
          <CardView>
            {details.map((detail, idx) => (
              //  <CardItems key={idx}  style={{ backgroundColor: optedOutDetails[idx] ? '#D3D3D3' : 'white',
              //   pointerEvents: optedOutDetails[idx] ? 'none' : 'auto'
              //   }}>
              <CardItems>
                <CardHeader>
                  {detail.title}
                  {detail.icon}
                </CardHeader>

                <CardBody
                  key={idx}
                  style={{
                    backgroundColor: optedOutDetails[idx] ? " grey " : "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: "1",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      0
                    </span>
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      1
                    </span>
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      2
                    </span>
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      3
                    </span>
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      4
                    </span>
                    <span style={{ fontSize: "13px", color: "#4E84C4" }}>
                      5
                    </span>
                  </div>
                  <SliderContainer>
                    <Slider
                      onChange={(e) =>
                        handleSliderChange(idx, parseInt(e.target.value))
                      }
                      style={{
                        pointerEvents: optedOutDetails[idx] ? "none" : "auto",
                      }}
                    />
                  </SliderContainer>
                  <span
                    style={{
                      float: "left",
                      fontSize: "10px",
                      color: "#A6A6A6",
                    }}
                  >
                    Low
                  </span>
                  <span
                    style={{
                      float: "right",
                      fontSize: "10px",
                      color: "#A6A6A6",
                    }}
                  >
                    High
                  </span>
                  <Remarks
                    placeholder="Remarks *"
                    onChange={(e) => handleRemarksChange(idx, e.target.value)}
                    style={{
                      background: optedOutDetails[idx] ? "#FFFFFFD6" : "white",
                      pointerEvents: optedOutDetails[idx] ? "none" : "auto",
                    }}
                  />
                  <CheckboxContainer>
                    <Checkbox
                      style={{
                        boxShadow: "inset 0px 2px 2px #00000029",
                        width: "12px",
                        height: "12px",
                      }}
                      onChange={(e) =>
                        handleCheckboxChange(idx, e.target.checked)
                      }
                      checked={optedOutDetails[idx]}
                    />
                    <CheckboxLabel>Opt not to review</CheckboxLabel>
                  </CheckboxContainer>
                </CardBody>
              </CardItems>
            ))}
          </CardView>

          <CheckboxContainer
            style={{ display: "inline-block", padding: "15px", width: "100%" }}
          >
            <Checkbox
              style={{
                boxShadow: "inset 0px 3px 6px #00000029",
                width: "15px",
                height: "15px",
                overflow: "visible",
                border: "0.2px solid #A6A6A6",
              }}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel style={{ marginLeft: "10px" }}>
              Opt not to review for all
            </CheckboxLabel>
            <button
              style={{
                width: "70px",
                height: "30px",
                borderRadius: "15px",
                float: "right",
                fontSize: "12px",
                padding: "0",
              }}
              onClick={() => setShow(!show)}
            >
              Done
            </button>
          </CheckboxContainer>
        </Container>
      ) : (
        <Container style={{ display: "none" }}></Container>
      )}
    </MainDiv>
  );
}


