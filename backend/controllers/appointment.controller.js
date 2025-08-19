import appointmentModel from "../models/appointment.model.js"

const getMyAppointments = async (req, res) => {
    const {userId} = req.user
    

    try {
        const appointments = await appointmentModel
            .find({ userId, cancelled: false })
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
        .select("doctorData userData slotTime slotDate cancelled isCompleted payment")
        .sort({createdAt : -1})
    
    if(appointments.length === 0) return res.json({success: false, message: "Couldn't find any appointments"})

    return res.json({success: false, appointments})
}

export { getMyAppointments, getAllAppointments };