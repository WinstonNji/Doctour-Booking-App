import appointmentModel from "../models/appointment.model.js"

const getMyAppointments = async (req, res) => {
    const {userId} = req.user
    

    try {
        const appointments = await appointmentModel
            .find({ userId })
            .populate({
                path: "doctorData",
                select : "name speciality image"
            })
            .select("doctorData amount slotDate slotTime _id")
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

export { getMyAppointments };