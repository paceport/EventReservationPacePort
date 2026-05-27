import React from "react";
import { Calendar, momentLocalizer, Views, Navigate } from "react-big-calendar";
import moment from "moment-timezone";
import "./calendar.css";
import { ExperienceTourIcon } from "../Icons";

const localizer = momentLocalizer(moment);

class CustomToolbar extends React.Component {
  state = {
    activeView: this.props.view, // Initialize with the current view from props
  };

  navigate = (action) => {
    this.props.onNavigate(action);
  };

  view = (view) => {
    this.setState({ activeView: view }); // Update the state with the new active view
    this.props.onView(view);
  };

  render() {
    const { label } = this.props;
    const { activeView } = this.state; // Destructure activeView from state

    return (
      <div className="rbc-toolbar">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div className="rbc-btn-group-1">
            <button
              type="button"
              onClick={() => this.navigate(Navigate.PREVIOUS)}
            >
              ◀
            </button>
            <span className="rbc-toolbar-label">{label}</span>
            <button type="button" onClick={() => this.navigate(Navigate.NEXT)}>
              ▶
            </button>
          </div>

          <div className="rbc-btn-group-2">
            <button
              type="button"
              className={activeView === Views.DAY ? "rbc-active" : ""}
              onClick={() => this.view(Views.DAY)}
            >
              Day
            </button>
            <button
              type="button"
              className={activeView === Views.WEEK ? "rbc-active" : ""}
              onClick={() => this.view(Views.WEEK)}
            >
              Week
            </button>
            <button
              type="button"
              className={activeView === Views.MONTH ? "rbc-active" : ""}
              onClick={() => this.view(Views.MONTH)}
            >
              Month
            </button>
            <button
              type="button"
              className={activeView === Views.AGENDA ? "rbc-active" : ""}
              onClick={() => this.view(Views.AGENDA)}
            >
              Agenda
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const CustomEvent = ({ event }) => {
  const startTime = moment(event.start_datetime).format("LT");
  const endTime = moment(event.end_datetime).format("LT");

  // Determine the event type and assign the appropriate class
  const eventClass = (() => {
    switch (event.category_type) {
      case "Workshop":
        return "event-workshop";
      case "Event":
        return "event-event";
      case "Meeting":
        return "event-meeting";
      case "Experience Tour":
        return "event-Tour";
      default:
        return "";
    }
  })();

  return (
    <div className={`event ${eventClass}`} style={{ height: "100%" }}>
      <div className="event-category">{event.category_type}</div>
      <div className="event-title">{event.title}</div>
      <div className="event-time">
        {startTime} - {endTime}
      </div>
      <div className="event-user-name">{event.user_name}</div>
    </div>
  );
};

const EventCalendar = ({ events }) => {
  const formatEvents = (events) => {
    return events.map((event) => {
      const startEST = moment(event.start_datetime)
        .tz("America/New_York")
        .toDate();
      const endEST = moment(event.end_datetime).tz("America/New_York").toDate();

      return {
        ...event,
        start: startEST,
        end: endEST,
        title: event.title,
        allDay: false,
        resource: event.category_type,
        user_name: event.user_name,
      };
    });
  };

  const formattedEvents = formatEvents(events);

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        //={["month", "week", "day", "agenda"]}
        min={moment("2024-03-03T08:00:00").toDate()}
        max={moment("2024-03-03T21:00:00").toDate()}
        style={{
          height: 450,
          margin: "20px",
        }}
        components={{
          event: CustomEvent,
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default EventCalendar;


