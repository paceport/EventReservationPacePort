import React, { useEffect, useState } from "react";
import {
  NavbarContainer,
  NavbarIcon,
  NavLeftContainer,
  NavRightContainer,
} from "./NavbarStyles";
import { UserIcon } from "../Icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

function Navbar({ navTitle, children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [shouldShowLogoutPopup, setShouldShowLogoutPopup] = useState(false);

  const { logout } = useAuth();

  function showLogoutPopup() {
    setShouldShowLogoutPopup(true);
  }

  function closeLogoutPopup() {
    setShouldShowLogoutPopup(false);
  }

  function handleLogout() {
    closeLogoutPopup();
    logout();
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  }, []);

  return (
    <>
      <NavbarContainer>
        <NavRightContainer>
          <h2 style={{ letterSpacing: "0.61px", fontSize: "23px" }}>
            {" "}
            {navTitle}
          </h2>
          {/* </Link> */}
        </NavRightContainer>
        <NavLeftContainer>
          <NavbarIcon>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                letterSpacing: "0.5px",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "#4e84c4",
                  fontSize: "20px",
                }}
              >
                {user.name}
              </span>
              <span style={{ color: "#4e84c4", fontSize: "10px" }}>
                {user.empid}
              </span>
            </div>
            {/* <NotificationsIcon style={{ fontSize: "35px" }} /> */}
            <UserIcon style={{ fontSize: "35px" }} onClick={showLogoutPopup} />
            {shouldShowLogoutPopup ? (
              <div
                className="modal show"
                style={{
                  display: "flex",
                  marginTop: "100px",
                }}
              >
                <Modal.Dialog>
                  <Modal.Header style={{ backgroundColor: "" }}>
                    <Modal.Title>Are you sure you want to Log Out?</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeLogoutPopup}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </div>
            ) : null}
          </NavbarIcon>
        </NavLeftContainer>
      </NavbarContainer>
      {children}
    </>
  );
}

export default Navbar;


