// DEBUG
import debug from "debug";

// MODELS
import Appointment from "../../database/models/Appointment";

// DAL
import appointmentDAO from "./appointment.DAO";

// UTILS
import appointmentUtils from "./appointment.utils";

// SEQUELIZE INSTANCE
import sequelizeInstance from "../../database";

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
      await sequelizeInstance.transaction(async (t) => {
        const { patientName, patientSurname, appointmentDateTime } =
          appointmentDTO;

        await appointmentUtils.checkIfAppointmentDateTimeIsFree({
          appointmentDateTime,
          transaction: t,
        });

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

        await appointmentDAO.createAppointment({
          appointmentDTO,
          transaction: t,
        });
      });
    } catch (error) {
      errorLogger(error);
      throw error;
    }
  }
}

export default new AppointmentService();
