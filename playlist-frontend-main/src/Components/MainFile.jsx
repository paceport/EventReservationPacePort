import React, { useState } from "react";
import "./Mainfile.css";
import Form from "./Form";
import Spinner from "react-bootstrap/Spinner";

const MainFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main">
      <div className="background-image"></div>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            top: 0,
            position: "fixed",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            zIndex: 1,
            backgroundColor: "rgba(247, 238, 243, 0.32)",
            gap: "20px",
          }}
        >
          <Spinner
            animation="border"
            style={{ color: "red", opacity: 10 }}
          ></Spinner>
          <span style={{ color: "#6DB657" }}>Uploading, Please wait...</span>
        </div>
      ) : (
        ""
      )}
      <div className="banner">
        <Form setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default MainFile;

// useEffect(() => {
//   // Load form data from localStorage
//   const savedName = localStorage.getItem('name');
//   const savedSessionName = localStorage.getItem('sessionName');
//   const savedEmpId = localStorage.getItem('empId')
//   const savedSessionDescription = localStorage.getItem('sessionDescription')
//   const savedDuration = localStorage.getItem('duration')
//   const savedBannerText = localStorage.getItem('bannerText')
//   const savedRole = localStorage.getItem('role')
//   const savedBannerDetailedText = localStorage.getItem('bannerDetailedText')

//   if (savedName) setName(savedName);
//   if (savedSessionName) setSessionName(savedSessionName);
//   if (savedEmpId) setEmpID(savedEmpId);
//   if (savedRole) setRole(savedRole)
//   if (savedSessionDescription) setSessionDescription(savedSessionDescription)
//   if (savedDuration) setDuration(savedDuration)
//   if (savedBannerText) setBannerText(savedBannerText)
//   if (savedBannerDetailedText) setBannerDetailedText(savedBannerDetailedText)
// }, []);

// const handleSave = () => {
//   // Save form data to localStorage
//   localStorage.setItem({
//     'empId': empID,
//     'name': name,
//     'sessionName' :sessionName,
//     'role' : role,
//     'sessionDescription' : sessionDescription,
//     'duration' : duration,
//     'bannerText' : bannerText,
//     'bannerDetailedText' : bannerDetailedText

//   });
//   // localStorage.setItem('sessionName', sessionName);

// };
