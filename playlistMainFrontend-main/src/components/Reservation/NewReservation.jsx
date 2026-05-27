import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Coloums1 } from "../Reservation/TableView/TableData.js";
import {
  CategoryContainer,
  CategoryIcon,
  CategoryItemName,
  CategoryItems,
  Togglediv,
  ToggleLeftContainer,
  ToggleRightContainer,
  Main,
  ImageContainer,
  Heading,
  ListSection,
  TableLabel,
  ListLabel,
  DisabledCategoryItems,
} from "./ReservationStyle.js";
import ToggleSwitch from "../Toggle/ToggleSwitch.jsx";
import SearchBar from "../Searchbar/SearchBar.jsx";
import myimage from "../../images/reservation.png";
import Tableview from "./TableView/Tableview.jsx";
import List from "./ListView/List.jsx";
import workshopSvg from "../../images/Workshop.svg";
import webinarSvg from "../../images/Webinar.svg";
import ideathonSvg from "../../images/Ideathon.svg";
import HackathonSvg from "../../images/Hackathon.svg";
import meetingSvg from "../../images/Meeting.svg";
import walkSvg from "../../images/Walk.svg";
import eventSvg from "../../images/Events.svg";

const categories = [
  {
    name: "Event",
    fontColor: "white",
    color: "#DF653A",
    icon: <img src={eventSvg} alt="Events" style={{ width: "30px" }} />,
    title: "Book a paceport event",
  },
  {
    name: "Workshop",
    fontColor: "black",
    color: "#F0B34F",
    icon: <img src={workshopSvg} alt="Workshop" style={{ width: "30px" }} />,
    title: "Create a workshop",
  },
  {
    name: "Experience Tour",
    fontColor: "white",
    color: "#6DB657",
    icon: <img src={walkSvg} alt="Tour" style={{ width: "30px" }} />,
    title: "Tour the paceport space",
  },
  {
    name: "Meeting",
    fontColor: "white",
    color: "#E41165",
    icon: <img src={meetingSvg} alt="Meeting" style={{ width: "30px" }} />,
    title: "Book a meeting",
  },
  {
    name: "Hackathon",
    fontColor: "white",
    color: "#DD5041",
    icon: <img src={HackathonSvg} alt="Hackathon" style={{ width: "30px" }} />,
  },
  {
    name: "Ideathon",
    fontColor: "white",
    color: "#4088FF",
    icon: <img src={ideathonSvg} alt="Ideathon" style={{ width: "30px" }} />,
  },
  {
    name: "Webinar",
    fontColor: "white",
    color: "#7159B1",
    icon: <img src={webinarSvg} alt="Webinar" style={{ width: "30px" }} />,
  },
];

export default function NewReservation() {
  return <Outlet />;
}

function Category() {
  let navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState();

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:4000/api/event/my",
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
        //navigate("/");
      } else {
        let postData = await response.json();
        setData(postData);
      }
    } catch (error) {
      alert("You are not a valid user. Please login again.");
    }
  };

  const [records, setRecords] = useState("");

  function handleSearch() {
    const newData = data.filter((row) => {
      return row.location.toLocaleLowerCase().includes(searchText);
    });
    if (isEmpty(searchText)) {
      setData(data);
    } else {
      setRecords(newData);
    }
  }

  function handleChange() {
    setChecked(!checked);
  }

  function handleClick(index) {
    navigate("new", {
      state: { id: index, name: categories[index]["name"], clearForm: true },
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <Main>
      <ImageContainer>
        <Heading>
          Categories
          <p
            style={{
              font: "italic normal normal 24px/29px Calibri",
              color: "#D9D9D9",
              fontSize: "13px",
            }}
          >
            Select any of the categories below to proceed...
          </p>
        </Heading>
        <img
          src={myimage}
          alt="placeholder"
          style={{ width: "100%", height: "174px", paddingTop: "10px" }}
        />
      </ImageContainer>
      <CategoryContainer>
        {categories.map((category, index) => {
          const isEnabled = [
            "Event",
            "Workshop",
            "Meeting",
            "Experience Tour",
          ].includes(category.name);
          const CategoryComponent = isEnabled
            ? CategoryItems
            : DisabledCategoryItems;
          return (
            <CategoryComponent
              title={category.title}
              key={index}
              onClick={() => isEnabled && handleClick(index)}
              style={{ backgroundColor: category.color }}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryItemName style={{ color: category.fontColor }}>
                {category.name.toUpperCase()}
              </CategoryItemName>
            </CategoryComponent>
          );
        })}
      </CategoryContainer>
      {/* <CategoryContainer>
        {categories.map((category, index) => (
          <CategoryItems
            key={index}
            onClick={() => handleClick(index)}
            className="category"
            style={{ backgroundColor: category.color }}
          >
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryItemName style={{ color: category.fontColor }}>
              {category.name.toUpperCase()}
            </CategoryItemName>
          </CategoryItems>
        ))}
      </CategoryContainer> */}
      <Togglediv>
        <ToggleLeftContainer>
          <h3
            style={{
              fontSize: "20px",
              letterSpacing: "0.3px",
              fontWeight: "600",
            }}
          >
            {" "}
            My Reservations
            <span style={{ color: "#00000029" }}> | </span>
          </h3>

          <div style={{ float: "right", display: "flex", paddingTop: "10px" }}>
            {!checked ? (
              <TableLabel style={{ color: "Black" }}>Table</TableLabel>
            ) : (
              <TableLabel style={{ color: "#A6A6A6" }}>Table</TableLabel>
            )}
            <ToggleSwitch onChange={handleChange} checked={checked} />
            {!checked ? (
              <ListLabel style={{ color: "#A6A6A6" }}>List</ListLabel>
            ) : (
              <ListLabel style={{ color: "black" }}>List</ListLabel>
            )}
          </div>
        </ToggleLeftContainer>

        <ToggleRightContainer>
          <SearchBar value={searchText} setSearch={setSearchText} />
        </ToggleRightContainer>
      </Togglediv>

      {!checked ? (
        <Tableview
          data={isEmpty(searchText) ? data : records}
          columns={Coloums1}
        />
      ) : (
        <ListSection>
          <List data={data} />
        </ListSection>
      )}
    </Main>
  );
}

export { Category, NewReservation };


