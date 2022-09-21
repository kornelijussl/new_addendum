// EXPRESS
import express from "express";

// DEBUG
import debug from "debug";

// HTTP
import { constants } from "http2";

// SERVICES
import appointmentService from "./appointment.service";

// ERROR LOGGER
const errorLogger = debug("addendum:appointment.routes:error");

// -----------------------------------------------------------------------------------

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.status(constants.HTTP_STATUS_OK).json(appointments);
  } catch (error) {
    errorLogger(error);
    res.status(502).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { appointmentDTO } = req.body;
    await appointmentService.createAppointment(appointmentDTO);
    res.status(constants.HTTP_STATUS_CREATED).send();
  } catch (error) {
    errorLogger(error);
    res.status(502).send(error);
  }
});

export default router;
