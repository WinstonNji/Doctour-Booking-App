import express from 'express';
const appointmentRouter = express.Router();

import { getMyAppointments, getAllAppointments } from '../controllers/appointment.controller.js'
import userAuthentificationMiddleware from '../middlewares/user.authMiddleware.js';
import { authentificateAdmin } from '../middlewares/admin.authentification.js';

appointmentRouter.get('/my-appointments', userAuthentificationMiddleware, getMyAppointments);

appointmentRouter.get('/all-appointments', authentificateAdmin, getAllAppointments)

export default appointmentRouter;