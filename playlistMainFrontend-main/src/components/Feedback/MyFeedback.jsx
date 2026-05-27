import React, { useState } from "react";
import image from "../../images/feedback.png";
import { Main, ImageContainer, Heading } from "./Feedback.js";
import DropdownList from "./DropdownList.jsx";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../Dashboard/dashboardStyles/Body.css";
import foodSvg from "../../images/Food.svg";
import iTSvg from "../../images/IT.png";
import workShop from "../../images/Hackathon.svg";
import dtSvg from "../../images/DT Workshop.svg";
import ellipseSvg from "../../images/Ellipse 39.svg";

const reviews = [
  {
    title: "Design_Thinking_Workshop",
    location: "Eastend Hall",
    date: "Mar 12, 2024 | 10 AM - 4 PM",
    progress: 0,
  },
  {
    title: "ExperienceTour",
    location: "Innovation Space",
    date: "Mar 18, 2024 | 9 AM - 2 PM",
    progress: 0,
  },
];

const details = [
  { title: "Overall", icon: "" },
  {
    title: "Future of Banking",
    icon: (
      <img
        src={ellipseSvg}
        alt="food"
        style={{ width: "25px", height: "25px", float: "right" }}
      />
    ),
  },
  {
    title: "DT Workshop",
    icon: (
      <img
        src={dtSvg}
        alt="food"
        style={{ width: "25px", height: "25px", float: "right" }}
      />
    ),
  },
  {
    title: "IT Infra",
    icon: (
      <img
        src={iTSvg}
        alt="food"
        style={{ width: "25px", height: "25px", float: "right" }}
      />
    ),
  },
  {
    title: "Food Service",
    icon: (
      <img
        src={foodSvg}
        alt="food"
        style={{ width: "25px", height: "25px", float: "right" }}
      />
    ),
  },
];

export default function MyFeedback() {
  const [reviewsProgress, setReviewsProgress] = useState(reviews.map(() => 0));

  const handleProgressChange = (idx, newProgress) => {
    const newReviewsProgress = [...reviewsProgress];
    newReviewsProgress[idx] = newProgress;
    setReviewsProgress(newReviewsProgress);
  };
  return (
    <Main>
      <ImageContainer>
        <Heading>
          {" "}
          We're all ears
          <p
            style={{
              font: "italic normal normal 24px/29px Calibr ",
              color: "#D9D9D9",
              fontSize: "13px",
            }}
          >
            Feel free to drop us your feedback on the recently concluded events
          </p>
        </Heading>
        <img
          src={image}
          alt="placeholder"
          style={{ width: "100%", height: "174px", paddingTop: "8px" }}
        />
      </ImageContainer>

      <div>
        <Tabs
          defaultActiveKey="Yet to review"
          transition={false}
          id="fill-tab-example"
          className="tabs"
          justify
        >
          <Tab
            className="tab nav-link"
            eventKey="Yet to review"
            title={<div style={{ fontWeight: "bold" }}> Yet to Review </div>}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <DropdownList
                review={{ ...reviews[0], progress: reviewsProgress[0] }}
                details={details}
                onProgressChange={(newProgress) =>
                  handleProgressChange(0, newProgress)
                }
              />
              <DropdownList
                review={{ ...reviews[1], progress: reviewsProgress[1] }}
                details={details}
                onProgressChange={(newProgress) =>
                  handleProgressChange(1, newProgress)
                }
              />
            </div>
          </Tab>
          <Tab
            className="tab nav-link"
            eventKey="My Past Reviews "
            title={
              <div style={{ fontWeight: "bold" }}>
                {" "}
                My Past Reviews
                <div style={{ float: "right" }}></div>
              </div>
            }
          >
            <div>None</div>
          </Tab>
        </Tabs>
      </div>

      {/* <Tabs style={{textAlign: ' center'}} onClick={() => setActiveItem(true)}>
                   <Tab>Yet to Review </Tab>
                     <Tab>My Past Reviews</Tab>
                     </Tabs>
                     <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'}}>
<DropdownList review={reviews[0]} details={details}  />
 <DropdownList review={reviews[1]} details={details}  /> 
 </div> */}
    </Main>
  );
}


