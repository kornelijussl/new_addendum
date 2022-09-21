class AppointmentUtils {
  checkIfAppointmentIsNotEarlierThanAWeek({
    patientsLastAppointmentDate,
    appointmentDate,
  }) {
    const patientsLastAppointmentDateInMilliseconds = Date.parse(
      patientsLastAppointmentDate,
    );
    const appointmentDateInMilliseconds = Date.parse(appointmentDate);

    const weekInMilliseconds = 1.65344e9;

    if (patientsLastAppointmentDateInMilliseconds + weekInMilliseconds > appointmentDateInMilliseconds) {
      throw "Appointment is earlier than a week";
    }
  }
}

export default new AppointmentUtils();
