// REACT
import * as React from "react";

// REACT BIG CALENDAR
import { Calendar, momentLocalizer } from "react-big-calendar";

// MOMENT
import moment from "moment";

// LODASH
import _ from "lodash";

// -------------------------------------------------------------------------------------------------------------------

const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({ appointments }) {
  const events = appointments.map((appointment) => ({
    id: appointment.id,
    title: `${_.capitalize(appointment.patientName)} ${_.capitalize(
      appointment.patientSurname,
    )}`,
    start: new Date(appointment.appointmentDateTime),
    end: new Date(appointment.appointmentDateTime),
  }));

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "90vh" }}
    />
  );
}
