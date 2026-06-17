// import React, { useState, createContext, useContext, useEffect } from "react";
// import dayjs from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Card from "react-bootstrap/Card";
// import CalendarIcon from "../../../images/Calendar.svg";
// import plusIcon from "../../../images/addSign.png";
// import "../styles/Form.css";
// import AttachmentIcon from "../../../images/Attachment.svg";
// import TimeIcon from "../../../images/Time2.svg";
// import arrowIcon from "../../../images/Right Arrow_1.svg";
// import cloneDeep from "lodash/cloneDeep";
// import { UserIcon } from "../../Icons";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

// dayjs.extend(utc);
// dayjs.extend(timezone);

// const FormDataContext = createContext();

// const useFormData = () => useContext(FormDataContext);

// export const FormDataProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     customers: [{ customer: "", designation: "" }],
//     startDate: dayjs(Date.now()),
//     startTime: dayjs(Date.now()),
//     endDate: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     location: "",
//     list: [],
//     custCount: 1,
//   });

//   return (
//     <FormDataContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormDataContext.Provider>
//   );
// };

// const defaultLocations = {
//   Event: "Event Space",
//   Workshop: "DT Workshop",
//   Meeting: "CN Tower Room",
//   "Experience Tour": "CN Tower Room",
// };

// export default function FormGroup({
//   type = "/",
//   setFormOneData,
//   setActiveStep,
//   initialData,
// }) {
//   const { formData, setFormData } = useFormData();

//   const { title, customers, startDate, startTime, endDate, endTime, location } =
//     formData;

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         ...formData,
//         ...initialData,
//         location: defaultLocations[type],
//         startDate: dayjs(initialData.startDateTime),
//         startTime: dayjs(initialData.startDateTime),
//         endDate: dayjs(initialData.endDateTime),
//         endTime: dayjs(initialData.endDateTime),
//       });
//     }
//   }, [initialData, setFormData]);

//   const getCombinedTimestamp = (date, time) => {
//     const datePart = date.format("YYYY-MM-DD");
//     const timePart = time.format("HH:mm:ss");
//     const combinedTimestamp = dayjs(`${datePart}T${timePart}`);
//     return combinedTimestamp;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const startDateTime = getCombinedTimestamp(startDate, startTime);
//     const endDateTime = getCombinedTimestamp(endDate, endTime);
//     const workshopData = {
//       customers,
//       title,
//       location,
//       type,
//       startDateTime,
//       endDateTime,
//     };

//     sendDataToParent(workshopData);
//     handleStep();
//   };

//   function sendDataToParent(data) {
//     const info = {
//       Info: data,
//     };
//     setFormOneData(info);
//   }

//   function handleStep() {
//     setActiveStep(1);
//   }
//   const addCustomerFile = (index, file) => {
//     const fileUrl = URL.createObjectURL(file);
//     setFormData((prevFormData) => {
//       const newCustomers = [...prevFormData.customers];
//       newCustomers[index] = {
//         ...newCustomers[index],
//         headshot: file,
//         headshotPreview: fileUrl,
//       };
//       return {
//         ...prevFormData,
//         customers: newCustomers,
//       };
//     });
//   };

//   const handleFileChange = (index, event) => {
//     if (event.target.files && event.target.files[0]) {
//       const newFile = event.target.files[0];
//       addCustomerFile(index, newFile);
//     }
//   };

//   const addCustomerSection = () => {
//     setFormData((prevFormData) => {
//       const newFormData = cloneDeep(prevFormData);
//       newFormData.customers.push({ customer: "", designation: "" });
//       return newFormData;
//     });
//   };

//   const removeCustomerSection = (indexToRemove) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       customers: prevFormData.customers.filter(
//         (_, index) => index !== indexToRemove
//       ),
//     }));
//   };

//   const handleCustomerChange = (index, field, value) => {
//     setFormData((prevFormData) => {
//       const newFormData = cloneDeep(prevFormData);
//       newFormData.customers[index][field] = value;
//       return newFormData;
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <div className="form-event">
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span className="title-event">Add {type} title</span>
//             <input
//               className="input-event"
//               placeholder="Title "
//               required
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//           </div>
//           {defaultLocations && (
//             <div className="location-container">
//               <div className="title-event">Location</div>

//               <div className="location-display">{formData.location}</div>
//             </div>
//           )}
//         </div>

//         <div className="date-container">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <div className="start-section">
//               <div className="start-date">
//                 <span className="title-event">Start Date</span>
//                 <DatePicker
//                   className="Start-Date-picker"
//                   slots={{
//                     openPickerIcon: CalendarSVG,
//                   }}
//                   views={["year", "month", "day"]}
//                   format="LL"
//                   disablePast
//                   timezone="America/Toronto"
//                   value={formData.startDate}
//                   onChange={(e) => setFormData({ ...formData, startDate: e })}
//                 />
//               </div>

//               <div className="start-date">
//                 <span className="title-event">Start Time</span>
//                 <TimePicker
//                   slots={{
//                     openPickerIcon: TimeSVG,
//                   }}
//                   value={formData.startTime}
//                   timezone="America/Toronto"
//                   onChange={(e) => setFormData({ ...formData, startTime: e })}
//                 />
//               </div>
//             </div>
//           </LocalizationProvider>
//           <img
//             src={arrowIcon}
//             alt="Arrow"
//             style={{
//               marginTop: "26px",
//             }}
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <div className="start-section">
//               <div className="start-date">
//                 <span className="title-event">End Date</span>
//                 <DatePicker
//                   slots={{
//                     openPickerIcon: CalendarSVG,
//                   }}
//                   views={["year", "month", "day"]}
//                   format="LL"
//                   value={formData.endDate}
//                   timezone="America/Toronto"
//                   disablePast
//                   minDate={startDate}
//                   onChange={(e) => setFormData({ ...formData, endDate: e })}
//                 />
//               </div>

//               <div className="start-date">
//                 <span className="title-event">End Time</span>
//                 <TimePicker
//                   slots={{
//                     openPickerIcon: TimeSVG,
//                   }}
//                   label=""
//                   timezone="America/Toronto"
//                   value={formData.endTime}
//                   minTime={startTime}
//                   onChange={(e) => setFormData({ ...formData, endTime: e })}
//                 />
//               </div>
//             </div>
//           </LocalizationProvider>
//         </div>

//         <div>
//           <span className="title-external-customers">
//             Add customer and external participants
//           </span>
//           {formData.customers.map((customer, index) => (
//             <div key={index} className="card-item">
//               <div
//                 style={{ display: "flex", flexDirection: "row", gap: "40px" }}
//               >
//                 <Card className="External-customers">
//                   <div className="customer-section">
//                     <div className="customer-container">
//                       <span className="title-workshop">Customer Name</span>
//                       <input
//                         className="input-workshop"
//                         showIcon
//                         placeholder="Name of Customer"
//                         value={customer.customer}
//                         onChange={(e) =>
//                           handleCustomerChange(
//                             index,
//                             "customer",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="designation-container">
//                       <span className="title-workshop">Designation</span>
//                       <input
//                         className="input-workshop"
//                         placeholder="Enter Designation"
//                         value={customer.designation}
//                         onChange={(e) =>
//                           handleCustomerChange(
//                             index,
//                             "designation",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="attachment-container">
//                       <span className="title-workshop">Attach Headshot</span>
//                       <div className="attachment-textarea">
//                         {!customer.headshotPreview ? (
//                           <UserIcon className="default-icon" />
//                         ) : (
//                           <img
//                             src={customer.headshotPreview}
//                             alt="Headshot Preview"
//                             className="headshot-preview"
//                           />
//                         )}
//                         <input
//                           className="attachment-input"
//                           placeholder="Headshot"
//                         />
//                         <input
//                           style={{ display: "none" }}
//                           id={`file-input-${index}`}
//                           type="file"
//                           onChange={(e) => handleFileChange(index, e)}
//                           accept="image/*"
//                         />
//                         <label
//                           htmlFor={`file-input-${index}`}
//                           className="attachment-icon"
//                         >
//                           <img src={AttachmentIcon} alt="Attachment" />
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>

//                 {index === 0 ? (
//                   <img
//                     src={plusIcon}
//                     alt="Plus-Icon"
//                     style={{
//                       width: "25px",
//                       height: "25px",
//                       alignSelf: "center",
//                     }}
//                     onClick={addCustomerSection}
//                   />
//                 ) : (
//                   <span
//                     onClick={() => removeCustomerSection(index)}
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       alignSelf: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     ❌
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="button-form">
//           <button className="draft-button">Save as Draft</button>
//           <button className="proceed-button" type="submit">
//             Procced
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// function CalendarSVG() {
//   return (
//     <img
//       src={CalendarIcon}
//       alt="calendar"
//       style={{
//         width: "30px",
//         height: "30px",
//         justifySelf: "center",
//       }}
//     />
//   );
// }

// function TimeSVG() {
//   return (
//     <img
//       src={TimeIcon}
//       alt="calendar"
//       style={{
//         width: "25px",
//         height: "25px",
//         justifySelf: "center",
//       }}
//     />
//   );
// }


import React, { useState, createContext, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Card from "react-bootstrap/Card";
import CalendarIcon from "../../../images/Calendar.svg";
import plusIcon from "../../../images/addSign.png";
import "../styles/Form.css";
import AttachmentIcon from "../../../images/Attachment.svg";
import TimeIcon from "../../../images/Time2.svg";
import arrowIcon from "../../../images/Right Arrow_1.svg";
import cloneDeep from "lodash/cloneDeep";
import { UserIcon } from "../../Icons";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const FormDataContext = createContext();

const useFormData = () => useContext(FormDataContext);

const LOCATION_OPTIONS = [
  "New York",
  "Pittsburg",
  "Santa Clara",
  "Houston",
  "Toronto",
];

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    customers: [{ customer: "", designation: "" }],
    startDate: dayjs(Date.now()),
    startTime: dayjs(Date.now()),
    endDate: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    location: "",
    list: [],
    custCount: 1,
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default function FormGroup({
  type = "/",
  setFormOneData,
  setActiveStep,
  initialData,
}) {
  const { formData, setFormData } = useFormData();

  const { title, customers, startDate, startTime, endDate, endTime, location } =
    formData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        location: initialData.location || "",
        startDate: initialData.startDateTime
          ? dayjs(initialData.startDateTime)
          : dayjs(Date.now()),
        startTime: initialData.startDateTime
          ? dayjs(initialData.startDateTime)
          : dayjs(Date.now()),
        endDate: initialData.endDateTime
          ? dayjs(initialData.endDateTime)
          : dayjs(Date.now()),
        endTime: initialData.endDateTime
          ? dayjs(initialData.endDateTime)
          : dayjs(Date.now()),
      });
    }
  }, [initialData, setFormData]);

  const getCombinedTimestamp = (date, time) => {
    const datePart = date.format("YYYY-MM-DD");
    const timePart = time.format("HH:mm:ss");
    const combinedTimestamp = dayjs(`${datePart}T${timePart}`);
    return combinedTimestamp;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!location) {
      alert("Please select a location.");
      return;
    }

    const startDateTime = getCombinedTimestamp(startDate, startTime);
    const endDateTime = getCombinedTimestamp(endDate, endTime);

    const workshopData = {
      customers,
      title,
      location,
      type,
      startDateTime,
      endDateTime,
    };

    sendDataToParent(workshopData);
    handleStep();
  };

  function sendDataToParent(data) {
    const info = {
      Info: data,
    };
    setFormOneData(info);
  }

  function handleStep() {
    setActiveStep(1);
  }

  const addCustomerFile = (index, file) => {
    const fileUrl = URL.createObjectURL(file);

    setFormData((prevFormData) => {
      const newCustomers = [...prevFormData.customers];

      newCustomers[index] = {
        ...newCustomers[index],
        headshot: file,
        headshotPreview: fileUrl,
      };

      return {
        ...prevFormData,
        customers: newCustomers,
      };
    });
  };

  const handleFileChange = (index, event) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      addCustomerFile(index, newFile);
    }
  };

  const addCustomerSection = () => {
    setFormData((prevFormData) => {
      const newFormData = cloneDeep(prevFormData);
      newFormData.customers.push({ customer: "", designation: "" });
      return newFormData;
    });
  };

  const removeCustomerSection = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customers: prevFormData.customers.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleCustomerChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const newFormData = cloneDeep(prevFormData);
      newFormData.customers[index][field] = value;
      return newFormData;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form-event">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="title-event">Add {type} title</span>

            <input
              className="input-event"
              placeholder="Title "
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="location-container">
            <div className="title-event">Location</div>

            <select
              className="input-event"
              value={formData.location}
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
            >
              <option value="">Select Location</option>
              {LOCATION_OPTIONS.map((locationOption) => (
                <option key={locationOption} value={locationOption}>
                  {locationOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="date-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="start-section">
              <div className="start-date">
                <span className="title-event">Start Date</span>

                <DatePicker
                  className="Start-Date-picker"
                  slots={{
                    openPickerIcon: CalendarSVG,
                  }}
                  views={["year", "month", "day"]}
                  format="LL"
                  disablePast
                  timezone="America/Toronto"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e })}
                />
              </div>

              <div className="start-date">
                <span className="title-event">Start Time</span>

                <TimePicker
                  slots={{
                    openPickerIcon: TimeSVG,
                  }}
                  value={formData.startTime}
                  timezone="America/Toronto"
                  onChange={(e) => setFormData({ ...formData, startTime: e })}
                />
              </div>
            </div>
          </LocalizationProvider>

          <img
            src={arrowIcon}
            alt="Arrow"
            style={{
              marginTop: "26px",
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="start-section">
              <div className="start-date">
                <span className="title-event">End Date</span>

                <DatePicker
                  slots={{
                    openPickerIcon: CalendarSVG,
                  }}
                  views={["year", "month", "day"]}
                  format="LL"
                  value={formData.endDate}
                  timezone="America/Toronto"
                  disablePast
                  minDate={startDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e })}
                />
              </div>

              <div className="start-date">
                <span className="title-event">End Time</span>

                <TimePicker
                  slots={{
                    openPickerIcon: TimeSVG,
                  }}
                  label=""
                  timezone="America/Toronto"
                  value={formData.endTime}
                  minTime={startTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e })}
                />
              </div>
            </div>
          </LocalizationProvider>
        </div>

        <div>
          <span className="title-external-customers">
            Add customer and external participants
          </span>

          {formData.customers.map((customer, index) => (
            <div key={index} className="card-item">
              <div
                style={{ display: "flex", flexDirection: "row", gap: "40px" }}
              >
                <Card className="External-customers">
                  <div className="customer-section">
                    <div className="customer-container">
                      <span className="title-workshop">Customer Name</span>

                      <input
                        className="input-workshop"
                        showIcon
                        placeholder="Name of Customer"
                        value={customer.customer}
                        onChange={(e) =>
                          handleCustomerChange(
                            index,
                            "customer",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="designation-container">
                      <span className="title-workshop">Designation</span>

                      <input
                        className="input-workshop"
                        placeholder="Enter Designation"
                        value={customer.designation}
                        onChange={(e) =>
                          handleCustomerChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="attachment-container">
                      <span className="title-workshop">Attach Headshot</span>

                      <div className="attachment-textarea">
                        {!customer.headshotPreview ? (
                          <UserIcon className="default-icon" />
                        ) : (
                          <img
                            src={customer.headshotPreview}
                            alt="Headshot Preview"
                            className="headshot-preview"
                          />
                        )}

                        <input
                          className="attachment-input"
                          placeholder="Headshot"
                        />

                        <input
                          style={{ display: "none" }}
                          id={`file-input-${index}`}
                          type="file"
                          onChange={(e) => handleFileChange(index, e)}
                          accept="image/*"
                        />

                        <label
                          htmlFor={`file-input-${index}`}
                          className="attachment-icon"
                        >
                          <img src={AttachmentIcon} alt="Attachment" />
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>

                {index === 0 ? (
                  <img
                    src={plusIcon}
                    alt="Plus-Icon"
                    style={{
                      width: "25px",
                      height: "25px",
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                    onClick={addCustomerSection}
                  />
                ) : (
                  <span
                    onClick={() => removeCustomerSection(index)}
                    style={{
                      width: "20px",
                      height: "20px",
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                  >
                    ❌
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="button-form">
          <button className="draft-button">Save as Draft</button>

          <button className="proceed-button" type="submit">
            Proceed
          </button>
        </div>
      </div>
    </form>
  );
}

function CalendarSVG() {
  return (
    <img
      src={CalendarIcon}
      alt="calendar"
      style={{
        width: "30px",
        height: "30px",
        justifySelf: "center",
      }}
    />
  );
}

function TimeSVG() {
  return (
    <img
      src={TimeIcon}
      alt="calendar"
      style={{
        width: "25px",
        height: "25px",
        justifySelf: "center",
      }}
    />
  );
}