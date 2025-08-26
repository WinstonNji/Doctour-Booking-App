import appointmentModel from "../models/appointment.model.js"
import { doctorModel } from "../models/doctor.model.js";
import { errorJson } from "../utils/errorJson.js";

const getMyAppointments = async (req, res) => {
    const {userId} = req.user
    

    try {
        const appointments = await appointmentModel
            .find({userId})
            .populate({
                path: "doctorData",
                select : "name speciality image"
            })
            .select("doctorData amount slotDate slotTime _id cancelled payment isCompleted docId")
            .sort({ createdAt: -1 });
      

        if (!appointments || appointments.length === 0) {
            return res.json({ success: false, message: "No appointments found" });
        }

        return res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

const getAllAppointments = async (req, res) => {
    const {role} = req.user

    if(role !== "admin"){
        return res.json({success: false, message: "Access Denied"})
    }

    const appointments = await appointmentModel
        .find({})
        .populate({
            path: "doctorData",
            select: "speciality image fee name"
        })
        .populate({
            path: "userData",
            select: "name image gender"
        })
        .select("doctorData userData slotTime slotDate cancelled isCompleted payment amount")
        .sort({createdAt : -1})
    
    if(appointments.length === 0) return res.json({success: false, message: "Couldn't find any appointments"})

    return res.json({success:true, appointments})
}

const completeAppointment = async (req,res) => {
    const {role} = req.user

    const {appointmentId}= req.body

    if(role !== 'admin' && role !== 'doctor'){
        return errorJson(401, 'Access Denied', res)
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(!appointmentData){
        return errorJson(404, "Couldn't find appointment", res)
    }

    const slotDate = appointmentData.slotDate
    const slotTime = appointmentData.slotTime

    if(!appointmentData.payment ){
        return errorJson(400, "Cannot complete unpaid appointment", res)
    }
    if(appointmentData.isCompleted){
        return errorJson(400, "Appointment already completed", res)
    }
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentData._id, {isCompleted:true})

    const doctorData = await doctorModel.findById(appointmentData.docId)

    let slots_booked = doctorData.slots_booked

    if(!slots_booked || slots_booked[slotDate].length == 0){
        return errorJson(400, "Couldn't update doctor time slots", res)
    }

    if(slots_booked[slotDate]){
        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time != slotTime)
    }

    await doctorModel.findByIdAndUpdate(appointmentData.docId, {slots_booked})

    return res.status(200).json({success:true, message: "Appointment marked as completed"})
    
}

export { getMyAppointments, getAllAppointments, completeAppointment };