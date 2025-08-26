import { doctorModel } from "../models/doctor.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { errorJson } from "../utils/errorJson.js"
import appointmentModel from "../models/appointment.model.js"

const doctorLogin = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        return errorJson(400,"Please enter all fields", res)
    }

    const doctor = await doctorModel.findOne({email})

    if(!doctor){
        return errorJson(400, "Couldn't find your account. Please contact your admin to be registered", res)
    }

    const isMatch = await bcrypt.compare(password, doctor.password)

    if(!isMatch){
        return errorJson(400, "Password or Email invalid. Please check credentials", res)
    }

    const token = jwt.sign({
        role:'doctor', 
        userId:doctor._id
    }, process.env.JWT_SECRET, {expiresIn: "24h"})

    return res.status(200).json({success: true, message: `Welcome ${doctor.name}`, token})
}

const getDoctorAppointments = async (req,res) => {
    const {role, userId} = req.user

    if(role !== 'doctor'){
        return errorJson(403, "Unauthorized Access", res)
    }

    const docId = userId

    const doctorAppointmentData = await appointmentModel
        .find({docId})
        .populate({
            path : 'userData',
            select: "name image gender"
        })
        .sort({createdAt: -1})

    if(!doctorAppointmentData){
        return errorJson(404, "No Appointments found", res)
    }


    return res.status(200).json({success:true, message:"Appointments fetched successfully", data: doctorAppointmentData})
}

const getDoctorPorfile = async (req,res) => {
    try {
        const {role} = req.user
        const {userId} = req.user


        if(role !== 'doctor'){
            return res.json({succcess: false, message: 'Access Denied'})
        }

        const doctorProfileData = await doctorModel
            .findById(userId)
            .select('name image email address speciality experience about')

        if(!doctorProfileData){
            return res.json({success: false, message: "Couldn't find your profile. Please contact admin"})
        }

        return res.json({success: true, message: "Profile Found", doctorProfileData})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "An error occured", doctorProfileData})
    }
    
}

const updateDoctorProfile = async (req,res) => {    
    try {
        const {role} = req.user
        const { userId } = req.user 
        const {address, about} = req.body

        if(role !== 'doctor' || !userId){
            return res.json({succcess: false, message: "Access Denied"})
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            userId,
            { address, about },
            { new: true }
        )

        console.log(updatedDoctor)

        if(!updatedDoctor){
            return res.json({success: false, message: "Couldn't find your profile"})
        }

        return res.json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "An error occured"})
    }
    
}

export {doctorLogin, getDoctorAppointments, getDoctorPorfile, updateDoctorProfile}
