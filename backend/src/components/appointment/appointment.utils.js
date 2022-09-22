class AppointmentUtils {
  checkIfAppointmentIsNotEarlierThanAWeek({
    patientsLastAppointmentDate,
    appointmentDateTime,
  }) {
    const patientsLastAppointmentDateInMilliseconds = Date.parse(
      patientsLastAppointmentDate,
    );
    const appointmentDateInMilliseconds = Date.parse(appointmentDateTime);

    const weekInMilliseconds = 1.65344e9;

    if (
      patientsLastAppointmentDateInMilliseconds + weekInMilliseconds >
      appointmentDateInMilliseconds
    ) {
      throw "Appointment is earlier than a week";
    }
  }
}

export default new AppointmentUtils();
