import express from "express"
import { doctorLogin, getDoctorAppointments, getDoctorPorfile, updateDoctorProfile } from "../controllers/doctor.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const doctorRouter = express.Router()

doctorRouter.post('/doctor-login', doctorLogin)
doctorRouter.get('/doctor-appointments', authMiddleware, getDoctorAppointments)
doctorRouter.get('/doctor-profile', authMiddleware, getDoctorPorfile)
doctorRouter.patch('/update-doctor-profile', authMiddleware, updateDoctorProfile)
doctorRouter.get('/verify-doctor-token', authMiddleware,  (req,res) => {
    const {role} = req.user
    if(role !== 'doctor'){
        return res.json({success: false, message: "Access Denied"})
    }

    return res.json({success: true})
})

export default doctorRouter