import { doctorModel } from "../models/doctor.model.js"

export const getAllDoctors = async (req,res) => {
    const doctors = await doctorModel.find({}).select('-password')

    if(!doctors){
        return res.json({success: false, message : "Couldn't find Doctors"})
    }
    
    return res.json({success: true, doctors})
}