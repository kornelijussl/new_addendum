// DAL
import appointmentDAO from "./appointment.DAO";

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

  async checkIfAppointmentDateTimeIsFree({ appointmentDateTime, transaction }) {
    const getAllAppointmentsDateTimes =
      await appointmentDAO.getAllAppointmentsDateTimes(transaction);

    getAllAppointmentsDateTimes.forEach((existingAppointmentDateTime) => {
      if (
        Date.parse(existingAppointmentDateTime) ===
        Date.parse(appointmentDateTime)
      )
        throw "The date time of appointment is already taken.";
    });
  }
}

export default new AppointmentUtils();
