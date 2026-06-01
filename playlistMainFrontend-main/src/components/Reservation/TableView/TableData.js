import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const ActionCell = ({ row, onApprove, onReject }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [approvalState, setApprovalState] = useState(row.published);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove(row);
      setIsLoading(false);
      setApprovalState("Approved");
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await onReject(row);
      setApprovalState("Rejected");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  let actionLink;
  const isExpired = new Date(row.start_datetime) < new Date();

  if (approvalState === "Pending" && isExpired) {
    actionLink = (
      <span style={{ color: "Grey", fontWeight: "bold" }}>Expired</span>
    );
  } else {
    if (approvalState === "Approved") {
      actionLink = (
        <span style={{ color: "Green", fontWeight: "bold" }}>Approved</span>
      );
    } else if (approvalState === "Rejected") {
      actionLink = (
        <span style={{ color: "Red", fontWeight: "bold" }}>Rejected</span>
      );
    } else {
      actionLink = (
        <Link to="#" onClick={handleOpenModal} style={{ fontWeight: "bold" }}>
          Pending
        </Link>
      );
    }
  }
  return (
    <>
      {actionLink}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <Spinner animation="border" style={{ color: "white" }} />
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve or reject this reservation?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const onApprove = async (event) => {
  const jsonEvent = JSON.stringify(event);

  const jwtToken = localStorage.getItem("accessToken");

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },
    body: jsonEvent,
  };
  try {
    const response = await fetch(
      "http://52.22.173.61/api/api/event/sendEventDetails",
      requestOptions
    );
    if (response.ok) {
      await response.json();
    } else {
      const jsonResponse = await response.json();
      throw new Error(jsonResponse.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const onReject = async (row) => {
  const jsonEvent = JSON.stringify(row);

  const jwtToken = localStorage.getItem("accessToken");

  const requestOptions = {
    method: "POST",

    headers: {
      Authorization: jwtToken,
      "Content-Type": "application/json",
    },

    body: jsonEvent,
  };
  try {
    const response = await fetch(
      "http://52.22.173.61/api/api/event/sendRejectionDetails",
      requestOptions
    );
    if (response.ok) {
      await response.json();
    } else {
      const jsonResponse = await response.json();
      throw new Error(jsonResponse.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const Coloums1 = [
  {
    name: "RESERVATION ID",
    selector: (row) => row.id,
    sortable: true,
    width: "120px",
  },
  {
    name: "TYPE",
    selector: (row) => row.category_type,
    sortable: true,
    width: "120px",
    grow: 1,
  },
  {
    name: "STATUS",
    selector: (row) => eventStatus(row.start_datetime),
    sortable: true,
    width: "80px",
  },
  {
    name: "TITLE",
    selector: (row) => row.title,
    sortable: true,
    width: "180px",
    grow: 1,
  },
  {
    name: "LOCATION",
    selector: (row) => row.location,
    sortable: true,
    width: "150px",
    grow: 1,
  },
  {
    name: "DATE",
    selector: (row) => formattedDate(row.start_datetime),
    sortable: true,
    width: "120px",
  },
  {
    name: "DURATION",
    selector: (row) =>
      calculateTimeDifferenceFormatted(row.start_datetime, row.end_datetime),
    sortable: true,
    width: "100px",
  },
  // {
  //   name: "Submitted Date",
  //   selector: (row) => formattedDate(row.submitted_date),
  //   sortable: true,
  //   width: "100px",
  // },
  // {
  //   name: "Submitted Time",
  //   selector: (row) => convertToEST(row.submitted_date),
  //   sortable: true,
  //   width: "100px",
  // },

  // {
  //   name: "ACTION",
  //   selector: (row) => row.action,
  //   sortable: true,
  //   width: "80px",
  // },
];
export const Coloums2 = [
  {
    name: "RESERVATION ID",
    selector: (row) => (
      <Link
        to={`/sidebar/eventDetails`}
        state={{ eventID: row.id }}
        style={{ textDecoration: "none" }}
      >
        {row.id}
      </Link>
    ),
    sortable: true,
    width: "120px",
  },

  {
    name: "TITLE",
    selector: (row) => row.title,
    sortable: true,
    width: "150px",
    grow: 1,
  },
  {
    name: "LOCATION",
    selector: (row) => row.location,
    sortable: true,
    width: "100px",
    grow: 1,
  },
  {
    name: "REQUEST DATE",
    selector: (row) => formattedDate(row.submitted_date),
    sortable: true,
    width: "120px",
  },
  {
    name: "REQUEST TIME",
    selector: (row) => formatISOTime(row.submitted_date),
    sortable: true,
    width: "120px",
  },
  {
    name: "DATE OF OCCURANCE",
    selector: (row) => formattedDate(row.start_datetime),
    sortable: true,
    width: "150px",
  },
  {
    name: "START TIME",
    selector: (row) => formatISOTime(row.start_datetime),
    sortable: true,
    width: "100px",
  },
  {
    name: "END TIME",
    selector: (row) => formatISOTime(row.end_datetime),
    sortable: true,
    width: "100px",
  },
  {
    name: "ACTION",
    selector: (row) => row.id,
    sortable: true,
    width: "90px",
    cell: (row) => (
      <ActionCell row={row} onApprove={onApprove} onReject={onReject} />
    ),
  },
  {
    name: "EDIT",
    selector: (row) => getEditLink(row),
    sortable: false,
    width: "90px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

function getEditLink(row) {
  const approvalState = row.published;
  const isExpired = new Date(row.start_datetime) < new Date();
  if (
    approvalState === "Approved" ||
    approvalState === "Rejected" ||
    isExpired
  ) {
    return <span style={{ color: "grey" }}>Edit</span>;
  } else {
    return (
      <Link
        to={"/sidebar/reservation/new"}
        state={{ isEditMode: true, event: row }}
      >
        Edit
      </Link>
    );
  }
}

function formatISOTime(ISODate) {
  const date = new Date(ISODate);

  let hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  let minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : hours.toString();
  minutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Format the time in hh:mm AM/PM
  const formattedTime = `${hours}:${minutes} ${amPm}`;
  return formattedTime;
}

function formattedDate(ISODate) {
  const date = new Date(ISODate);
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[date.getMonth()];
  let day = date.getDate();

  day = day < 10 ? "0" + day : day;

  const newDate = `${monthName}-${day}-${year}`;
  return newDate;
}

function eventStatus(ISODate) {
  const today = new Date();
  const eventDate = new Date(ISODate);
  if (today > eventDate) {
    return "Expired";
  } else {
    return "Active";
  }
}

function calculateTimeDifferenceFormatted(isoTimeStamp1, isoTimeStamp2) {
  const date1 = new Date(isoTimeStamp1);
  const date2 = new Date(isoTimeStamp2);

  const differenceInMilliseconds = date2.getTime() - date1.getTime();

  let differenceInHours = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  );
  let differenceInMinutes = Math.round(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (differenceInMinutes === 60) {
    differenceInHours++;
    differenceInMinutes = 0;
  }

  let formattedDifference = "";
  if (differenceInHours > 0) {
    formattedDifference += `${differenceInHours} hour${
      differenceInHours > 1 ? "s" : ""
    }`;
  }
  if (differenceInMinutes > 0) {
    if (formattedDifference.length > 0) {
      formattedDifference += " ";
    }
    formattedDifference += `${differenceInMinutes} min${
      differenceInMinutes > 1 ? "s" : ""
    }`;
  }
  if (formattedDifference.length === 0) {
    formattedDifference = "0 mins";
  }

  return formattedDifference;
}


