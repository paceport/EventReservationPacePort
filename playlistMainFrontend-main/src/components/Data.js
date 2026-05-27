import MyDashboard from "./Dashboard/MyDashboard";
import MyFeedback from "./Feedback/MyFeedback";
import bellIcon from "../images/Bell.svg";
import dashboardIcon from "../images/Dashboard.svg";
import reservationIcon from "../images/Reserve.svg";
import feedbackIcon from "../images/Survey.svg";
import NewReservation from "./Reservation/NewReservation";

export const SIDEBAR_DATA = [
  {
    id: 4,
    name: "ADMIN",
    page: <h2>Hi</h2>,
    path: "admin",
    icon: <img src={bellIcon} alt="admin" />,
  },
  {
    id: 1,
    name: "MY DASHBOARD",
    page: <MyDashboard />,
    path: "/sidebar",
    icon: <img src={dashboardIcon} alt="Dashboard" />,
  },
  {
    id: 2,
    name: "NEW RESERVATION",
    page: <NewReservation />,
    path: "reservation",
    icon: <img src={reservationIcon} alt="Reservation" />,
  },
  {
    id: 3,
    name: "MY FEEDBACK",
    page: <MyFeedback />,
    path: "feedback",
    icon: <img src={feedbackIcon} alt="Reservation" />,
  },

  // {
  //   id: 4,
  //   name: "MY NOTIFICATION",
  //   page: <h2>Hi</h2>,
  //   path: "notification",
  //   icon: <img src={bellIcon} alt="Notification" />,
  // },
];


