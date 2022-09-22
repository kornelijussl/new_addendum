// DEBUG
import debug from "debug";

// MODELS
import Appointment from "../../database/models/Appointment";

// DAL
import appointmentDAO from "./appointment.DAO";

// UTILS

import appointmentUtils from "./appointment.utils";

// ---------------------------------------------------------------------------------

const errorLogger = debug("addendum:appointment.service:error");

class AppointmentService {
  async getAllAppointments() {
    try {
      return appointmentDAO.getAppointments();
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }

  async createAppointment(appointmentDTO) {
    try {
      const { patientName, patientSurname, appointmentDateTime } =
        appointmentDTO;

      const patientsLastAppointment =
        await appointmentDAO.findPatientsLastAppointmentByPatientNameAndPatientSurname(
          patientName,
          patientSurname,
        );

      if (patientsLastAppointment) {
        appointmentUtils.checkIfAppointmentIsNotEarlierThanAWeek({
          patientsLastAppointmentDate:
            patientsLastAppointment.appointmentDateTime,
          appointmentDateTime,
        });
      }

      await appointmentDAO.createAppointment(appointmentDTO);
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }
}

export default new AppointmentService();
