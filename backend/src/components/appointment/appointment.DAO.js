// DEBUG
import debug from "debug";

// SEQUELIZE INSTANCE
import sequelizeInstance from "../../database";

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

  async createAppointment(appointmentDTO) {
    try {
      await sequelizeInstance.transaction(async (t) => {
        await Appointment.create(appointmentDTO, { transaction: t });
      });
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
}

export default new AppointmentDAO();
