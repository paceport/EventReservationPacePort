// import React, { useEffect, useState } from "react";
// import Stepper from "react-stepper-horizontal";
// import FormOne from "./FormOne";
// import FormTwo from "./FormTwo";
// import FormThree from "./FormThree";
// import "./styles/Form.css";
// import { useLocation } from "react-router-dom";
// import banner from "../../images/workshop-image.png";
// import "./styles/reservationBanner.css";

// import SuccessScreen from "./SuccessScreen.jsx";

// function Confirmation({ eventID }) {
//   return <SuccessScreen eventID={eventID} />;
// }

// function NotConfirmed() {
//   return <div>BOOKING NOT CONFIRMED, TRY AGAIN</div>;
// }

// function CreateReservation() {
//   const location = useLocation();
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [data1, setData1] = useState("");
//   const [data2, setData2] = useState("");
//   const [data3, setData3] = useState("");
//   const [logisticsData, setLogisticsData] = useState("");
//   const [eventID, setEventID] = useState("");
//   const { isEditMode, event } = location.state;

//   const [type, setType] = useState();

//   const emptyData = {
//     title: "",
//     customers: [{ customer: "", designation: "" }],
//     startDate: "",
//     startTime: "",
//     endDate: "",
//     endTime: "",
//     list: [],
//     custCount: 1,
//   };

//   useEffect(() => {
//     if (location.state.clearForm) {
//       setType(location.state.name);
//       setData1(emptyData);
//     } else if (isEditMode) {
//       setType(event.category_type);
//       const DataOne = {
//         customers: location.state.event.participants,
//         type: type,
//         title: location.state.event.title || "User Event",
//         location: location.state.event.location || "Event Space",
//         type: location.state.event.categoty_type || "Event",
//         startDateTime: location.state.event.start_datetime,
//         endDateTime: location.state.event.end_datetime,
//       };
//       setData1(DataOne);
//       const DataTwo = {
//         events: location.state.event.events || [],
//       };
//       setData2(DataTwo);
//       const DataThree = {
//         logistics_id: location.state.event.logistics_id || [],
//       };
//       setLogisticsData(DataThree);
//     }
//   }, []);

//   function handleDatafromChild1(data1) {
//     setData1(data1);
//   }
//   function handleDatafromChild2(data2) {
//     setData2(data2);
//   }
//   function handleDatafromChild3(data3) {
//     setData3(data3);
//     const startDateTimeUTC = new Date(data1.Info.startDateTime);
//     const endDateTimeUTC = new Date(data1.Info.endDateTime);
//     // const startDateTimeToronto = new Date(
//     //   startDateTimeUTC.getTime() - 4 * 60 * 60 * 1000
//     // );
//     // const endDateTimeToronto = new Date(
//     //   endDateTimeUTC.getTime() - 4 * 60 * 60 * 1000
//     // );

//     const startDateTimeTorontoString = startDateTimeUTC
//       .toISOString()
//       .replace("Z", "");
//     const endDateTimeTorontoString = endDateTimeUTC
//       .toISOString()
//       .replace("Z", "");

//     const transformedData = {
//       basic_info: {
//         info: {
//           customers: data1.Info.customers || "Some Event",
//           title: data1.Info.title || "User Event",
//           location: data1.Info.location || "Event Space",
//           type: type,
//           startDateTime: startDateTimeTorontoString,
//           endDateTime: endDateTimeTorontoString,
//         },
//       },
//       playlist_details: {
//         events: data2.Events || [],
//       },
//       logistic_details: {
//         logistics: {
//           agent: data3.logistics.agent || false,
//           mifi: data3.logistics.mifi || false,
//           kramer: data3.logistics.kramer || false,
//           breakfast: data3.logistics.breakfast || false,
//           lunch: data3.logistics.lunch || false,
//           non_veg: data3.logistics.nonVeg || 0,
//           veg: data3.logistics.Veg || 0,
//           vegan: data3.logistics.Vegan || 0,
//           remarks: data3.logistics.remarks || "",
//         },
//       },
//     };

//     if (isEditMode) {
//       editData(transformedData);
//     } else {
//       sendData(transformedData);
//     }
//   }

//   const editData = async (data) => {
//     const id = location.state.event.id;

//     try {
//       const jwtToken = localStorage.getItem("accessToken");
//       const response = await fetch(
//         `http://52.22.173.61/api/api/event/update/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: jwtToken,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         setActiveStep(3);
//         setIsFormSubmitted(true);
//         setData1(emptyData);
//         const eventID = jsonResponse.id;
//         setEventID(eventID);
//       } else {
//         setActiveStep(4);
//         console.error("HTTP error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       setActiveStep(4);
//       console.error("Fetch error:", error);
//     }
//   };

//   const sendData = async (data) => {
//     try {
//       const jwtToken = localStorage.getItem("accessToken");
//       const response = await fetch(
//         "http://52.22.173.61/api/api/event/new",
//         {
//           method: "POST",
//           headers: {
//             Authorization: jwtToken,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       if (response.ok) {
//         const jsonResponse = await response.json();
//         setActiveStep(3);
//         setIsFormSubmitted(true);
//         setData1(emptyData);
//         const eventID = jsonResponse.id;
//         setEventID(eventID);
//       } else {
//         setActiveStep(4);
//         console.error("HTTP error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       setActiveStep(4);
//       console.error("Fetch error:", error);
//     }
//   };

//   const steps = [
//     { title: "Basic Info" },
//     { title: "Compose Playlist" },
//     { title: "Logistics" },
//   ];

//   function getSectionComponent() {
//     switch (activeStep) {
//       case 0:
//         return (
//           <FormOne
//             setFormOneData={handleDatafromChild1}
//             setActiveStep={setActiveStep}
//             initialData={data1}
//             type={type}
//           />
//         );
//       case 1:
//         return (
//           <FormTwo
//             setFormTwoData={handleDatafromChild2}
//             setActiveStep={setActiveStep}
//             initialEventIDs={data2}
//           />
//         );
//       case 2:
//         return (
//           <FormThree
//             setFormThreeData={handleDatafromChild3}
//             setActiveStep={setActiveStep}
//             initialLogisticsData={logisticsData}
//           />
//         );
//       case 3:
//         return <Confirmation eventID={eventID} />;
//       case 4:
//         return <NotConfirmed />;
//       default:
//         return null;
//     }
//   }

//   return (
//     <div>
//       {!isFormSubmitted ? (
//         <div className="reservation-overlay-container">
//           <img
//             src={banner}
//             alt="placeholder"
//             style={{ height: "200px", width: "100%" }}
//           />
//           <div className="reservation-overlay-content">
//             <h4 className="reservation-overlay-title">{type} Reservation</h4>
//             <div className="stepper-container">
//               <Stepper
//                 id="stepper"
//                 steps={steps}
//                 activeStep={activeStep}
//                 activeColor="#17A600"
//                 defaultColor="#1E1E1B"
//                 completeColor="#17A600"
//                 activeTitleColor="#17A600"
//                 completeTitleColor="#eee"
//                 defaultTitleColor="#7F7F7F"
//                 circleFontColor="#eee"
//                 circleFontSize="1"
//                 completeBarColor="#17A600"
//                 defaultBorderColor="#1E1E1B"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//       <div className="form-buttons">{getSectionComponent()}</div>
//     </div>
//   );
// }

// export default CreateReservation;

import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import "./styles/Form.css";
import { useLocation } from "react-router-dom";
import banner from "../../images/workshop-image.png";
import "./styles/reservationBanner.css";
import SuccessScreen from "./SuccessScreen.jsx";

function Confirmation({ eventID }) {
  return <SuccessScreen eventID={eventID} />;
}

function NotConfirmed() {
  return <div>BOOKING NOT CONFIRMED, TRY AGAIN</div>;
}

function CreateReservation() {
  const location = useLocation();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [logisticsData, setLogisticsData] = useState("");
  const [eventID, setEventID] = useState("");
  const [type, setType] = useState();

  const isEditMode = location.state?.isEditMode || false;
  const event = location.state?.event || null;

  const emptyData = {
    title: "",
    customers: [{ customer: "", designation: "" }],
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    list: [],
    custCount: 1,
  };

  useEffect(() => {
    if (location.state?.clearForm) {
      setType(location.state.name);
      setData1(emptyData);
    } else if (isEditMode && event) {
      setType(event.category_type);

      setData1({
        customers: event.participants || [],
        title: event.title || "User Event",
        location: event.location || "Event Space",
        type: event.category_type || "Event",
        startDateTime: event.start_datetime,
        endDateTime: event.end_datetime,
      });

      setData2({
        events: event.events || [],
      });

      setLogisticsData({
        logistics_id: event.logistics_id || null,
      });
    }
  }, []);

  function handleDatafromChild1(formOneData) {
    setData1(formOneData);
  }

  function handleDatafromChild2(formTwoData) {
    setData2(formTwoData);
  }

  function toIsoString(value) {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toISOString();
  }

  function buildBackendPayload(formThreeData) {
    const info = data1?.Info || {};
    const logistics = formThreeData?.logistics || {};
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    return {
      title: info.title || "User Event",
      user_id: currentUser.empid || 1,
      category_type: info.type || type || "Event",
      start_datetime: toIsoString(info.startDateTime),
      end_datetime: toIsoString(info.endDateTime),
      participants: info.customers || [],
      location: info.location || "Event Space",
      food_service: {
        enabled: logistics.foodService || false,
        breakfast: logistics.breakfast || false,
        lunch: logistics.lunch || false,
        non_veg: logistics.nonVeg || 0,
        veg: logistics.Veg || 0,
        vegan: logistics.Vegan || 0,
        remarks: logistics.remarks || "",
      },
      agenda: {
        events: data2?.Events || [],
        agent: logistics.agent || false,
        remarks: logistics.remarks || "",
      },
      has_mifi_device: logistics.mifi || false,
      has_kramer_device: logistics.kramer || false,
      published: true,
    };
  }

  function handleDatafromChild3(formThreeData) {
    const backendPayload = buildBackendPayload(formThreeData);

    if (!backendPayload.start_datetime || !backendPayload.end_datetime) {
      console.error("Invalid date payload:", backendPayload);
      setActiveStep(4);
      return;
    }

    if (isEditMode) {
      editData(backendPayload);
    } else {
      sendData(backendPayload);
    }
  }

  const editData = async (data) => {
    const id = event?.id;

    try {
      const jwtToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://52.22.173.61/api/api/event/${id}`, {
        method: "PUT",
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setActiveStep(3);
        setIsFormSubmitted(true);
        setData1(emptyData);
        setEventID(jsonResponse?.data?.id || jsonResponse?.event?.id || id);
      } else {
        setActiveStep(4);
        console.error("HTTP error:", response.status, response.statusText);
      }
    } catch (error) {
      setActiveStep(4);
      console.error("Fetch error:", error);
    }
  };

  const sendData = async (data) => {
    try {
      const jwtToken = localStorage.getItem("accessToken");

      const response = await fetch("http://52.22.173.61/api/api/event/new", {
        method: "POST",
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setActiveStep(3);
        setIsFormSubmitted(true);
        setData1(emptyData);
        setEventID(jsonResponse?.data?.id || jsonResponse?.event?.id);
      } else {
        setActiveStep(4);
        console.error("HTTP error:", response.status, response.statusText);
      }
    } catch (error) {
      setActiveStep(4);
      console.error("Fetch error:", error);
    }
  };

  const steps = [
    { title: "Basic Info" },
    { title: "Compose Playlist" },
    { title: "Logistics" },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <FormOne
            setFormOneData={handleDatafromChild1}
            setActiveStep={setActiveStep}
            initialData={data1}
            type={type}
          />
        );
      case 1:
        return (
          <FormTwo
            setFormTwoData={handleDatafromChild2}
            setActiveStep={setActiveStep}
            initialEventIDs={data2}
          />
        );
      case 2:
        return (
          <FormThree
            setFormThreeData={handleDatafromChild3}
            setActiveStep={setActiveStep}
            initialLogisticsData={logisticsData}
          />
        );
      case 3:
        return <Confirmation eventID={eventID} />;
      case 4:
        return <NotConfirmed />;
      default:
        return null;
    }
  }

  return (
    <div>
      {!isFormSubmitted ? (
        <div className="reservation-overlay-container">
          <img
            src={banner}
            alt="placeholder"
            style={{ height: "200px", width: "100%" }}
          />
          <div className="reservation-overlay-content">
            <h4 className="reservation-overlay-title">{type} Reservation</h4>
            <div className="stepper-container">
              <Stepper
                id="stepper"
                steps={steps}
                activeStep={activeStep}
                activeColor="#17A600"
                defaultColor="#1E1E1B"
                completeColor="#17A600"
                activeTitleColor="#17A600"
                completeTitleColor="#eee"
                defaultTitleColor="#7F7F7F"
                circleFontColor="#eee"
                circleFontSize="1"
                completeBarColor="#17A600"
                defaultBorderColor="#1E1E1B"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="form-buttons">{getSectionComponent()}</div>
    </div>
  );
}

export default CreateReservation;
