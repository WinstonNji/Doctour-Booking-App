import express from 'express';
import { getMyAppointments } from '../controllers/appointment.controller.js';
const appointmentRouter = express.Router();
import userAuthentificationMiddleware from '../middlewares/user.authMiddleware.js';

appointmentRouter.get('/my-appointments', userAuthentificationMiddleware, getMyAppointments);

export default appointmentRouter;