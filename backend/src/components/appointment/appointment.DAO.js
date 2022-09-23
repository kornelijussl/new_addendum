// DEBUG
import debug from "debug";

// MODELS
import Appointment from "../../database/models/Appointment";

// ---------------------------------------------------------------------------------

const errorLogger = debug("addendum:appointment.DAO:error");

class AppointmentDAO {
  async getAppointments() {
    try {
      return Appointment.findAll({ raw: true });
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }

  async createAppointment({ appointmentDTO, transaction }) {
    try {
      await Appointment.create(appointmentDTO, { transaction });
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }

  async findPatientsLastAppointmentByPatientNameAndPatientSurname(
    patientName,
    patientSurname,
  ) {
    try {
      const patientsLastAppointment = await Appointment.findAll({
        where: { patientName, patientSurname },
        order: [["appointmentDateTime", "DESC"]],
        limit: 1,
        raw: true,
      });
      return patientsLastAppointment[0];
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }

  async getAllAppointmentsDateTimes(transaction) {
    try {
      const appointmentDateTimes = await Appointment.findAll({
        attributes: ["appointmentDateTime"],
        raw: true,
        transaction,
      });

      return appointmentDateTimes.map(
        ({ appointmentDateTime }) => appointmentDateTime,
      );
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }
}

export default new AppointmentDAO();
