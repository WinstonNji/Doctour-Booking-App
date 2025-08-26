import express from 'express';
const appointmentRouter = express.Router();

import { getMyAppointments, getAllAppointments, completeAppointment } from '../controllers/appointment.controller.js'
// import userAuthentificationMiddleware from '../middlewares/user.authMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// import { authentificateAdmin } from '../middlewares/admin.authentification.js';

appointmentRouter.get('/my-appointments', authMiddleware, getMyAppointments);

appointmentRouter.get('/all-appointments', authMiddleware, getAllAppointments)

appointmentRouter.post('/complete-appointment', authMiddleware, completeAppointment )

export default appointmentRouter;