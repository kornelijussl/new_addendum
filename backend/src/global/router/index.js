// EXPRESS
import express from "express";

const router = express.Router();

// ROUTES

import appointmentRoutes from "../../components/appointment/appointment.routes";

// -------------------------------------------------------------------------------

router.use("/api/appointment", appointmentRoutes);

export default router;
