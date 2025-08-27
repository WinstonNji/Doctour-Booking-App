import express from 'express';
const appointmentRouter = express.Router();

import { getMyAppointments, getAllAppointments, completeAppointment } from '../controllers/appointment.controller.js'
// import userAuthentificationMiddleware from '../middlewares/user.authMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// import { authentificateAdmin } from '../middlewares/admin.authentification.js';

appointmentRouter.get('/my-appointments', authMiddleware, getMyAppointments);

appointmentRouter.get('/all-appointments', authMiddleware, getAllAppointments)

appointmentRouter.post('/complete-appointment', authMiddleware, (req,res,next)=>{
    if(req.user?.role === 'demo_admin'){
        return res.status(200).json({ success:true, message: 'Demo Mode: simulated success. Changes not saved.' })
    }
    next()
}, completeAppointment )

export default appointmentRouter;