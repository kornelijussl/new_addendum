// AXIOS
import axios from "axios";

// ------------------------------------------------------------------------------------

export const createNewAppointmentApiCall = async (appointmentDTO) => {
  await axios.post("http://localhost:8080/api/appointment", { appointmentDTO });
};

export const getAllAppointmentsApiCall = async () => {
  const response = await axios.get("http://localhost:8080/api/appointments");
  const data = response.data;

  return data;
};
