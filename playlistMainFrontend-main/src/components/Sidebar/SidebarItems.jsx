import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";
import { dummyData } from "..";
import { API_BASE_URL } from "../../config/apiConfig";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(1);
  const [role, setRole] = useState("USER");

  const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return null;
    }

    try {
      return JSON.parse(token);
    } catch {
      return token;
    }
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  };

  const fetchUserRole = async () => {
    try {
      const currentUser = getCurrentUser();
      const jwtToken = getAccessToken();

      if (!currentUser?.empid || !jwtToken) {
        alert("You are not a valid user. Please login again.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/user/current/${currentUser.empid}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      if (response.status === 401) {
        alert("You are not a valid user. Please login again.");
        return;
      }

      if (!response.ok) {
        console.error("Failed to fetch user role. Status:", response.status);
        return;
      }

      const newRole = await response.json();

      if (newRole?.role) {
        setRole(newRole.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

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