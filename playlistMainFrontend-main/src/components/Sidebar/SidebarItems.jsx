import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";
import { dummyData } from "..";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(1);
  const [role, setRole] = useState("USER");

  const fetchUserRole = async () => {
    const currentEmpId = JSON.parse(localStorage.getItem("user")).empid;

    try {
      const jwtToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:4000/api/user/current/${currentEmpId}`,
        {
          headers: new Headers({
            Authorization: jwtToken,
          }),
        }
      );
      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
      } else {
        let newRole = await response.json();
        setRole(newRole.role);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [role]);

  return (
    <ItemsList>
      {dummyData.map((itemData, index) => {
        if (role === "ADMIN" && index === 0) {
          return (
            <ItemContainer
              key={index}
              onClick={() => {
                setActiveItem(itemData.id);
              }}
              className={itemData.id === activeItem ? "active" : ""}
            >
              <Link to={itemData.path} style={{ textDecoration: "none" }}>
                <ItemWrapper>
                  {itemData.icon}
                  <ItemName>{itemData.name}</ItemName>
                </ItemWrapper>
              </Link>
            </ItemContainer>
          );
        }
        return (
          index !== 0 && (
            <ItemContainer
              key={index}
              onClick={() => {
                setActiveItem(itemData.id);
              }}
              className={itemData.id === activeItem ? "active" : ""}
            >
              <Link to={itemData.path} style={{ textDecoration: "none" }}>
                <ItemWrapper>
                  {itemData.icon}
                  <ItemName>{itemData.name}</ItemName>
                </ItemWrapper>
              </Link>
            </ItemContainer>
          )
        );
      })}
    </ItemsList>
  );
};

export default SidebarItems;


