import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js"
import validator from "validator"
import { errorJson } from "../utils/errorJson.js"
import {v2 as cloudinary} from "cloudinary"
import { doctorModel } from "../models/doctor.model.js"
import appointmentModel from "../models/appointment.model.js"

// User sign-up
export const userRegistration = async (req,res) => {
    const {name, email , password} = req.body

    if(!name, !email || !password){
        return res.status.json({success:false, message: "Enter Valid credentials"})
    }

    const user = await userModel.findOne({email})

    if(user){
        return res.json({success:false, message: "This User already exists. LogIn instead"})
    }

    if(!validator.isEmail(email)){
        return errorJson(400, "Please Enter a valid email", res)
    }

    if(password.length < 8){
        return res.json({success:false, message: "Password needs to be longer than 8characters"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({name, email, password: hashedPassword})
    await newUser.save()

    return res.status(200).json({success: true, message: `User successfully registered. Welcom ${name}`})

}

// User login
export const userLogin = async (req,res) => {

    const {email, password} = req.body

    if(!email || !password){
        return res.json({success:false,message: "Enter all fields"})
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.json({success: false, message: "Couldn't find user. Register instead"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.json({success: false, message: "Please enter valid Credentials."})
    }
 
    const token = jwt.sign({userId: user._id, role:"user"}, process.env.JWT_SECRET, {expiresIn: "30d"})

    return res.status(200).json({success:true,token, message:'Successfully LoggedIn'})
}

// get profile
const getProfile = async (req,res) => {
    const userId = req.user.userId

    if(!userId){
        return errorJson(res)
    }

    const user = await userModel.findById(userId).select({password:0, _id:0})

    if(user){
        return res.status(200).json({success:true, user})
    }else{
        return errorJson(500,"Couldn't find this user", res)
    }
}

// Update profile
const updateProfile = async (req,res) => {

    let imageUrl = null

    const {name, email, address, gender, dob, phone } = req.body

    const imageFile = req.file

    const userId = req.user.userId

    if(!name || !email) {
        return errorJson(400, 'Please enter a valid name and email', res)
    }

    if(!validator.isEmail(email)){
        return errorJson(400, 'Please enter a valid email', res)
    }

    if(imageFile){
        const ImageUpload = cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        imageUrl = (await ImageUpload).secure_url
    }

    const updatedValues = {
        name,
        email,
        address,
        gender,
        dob,
        phone,
    }

    if(imageUrl) updatedValues.image = imageUrl

    const user = await userModel.findByIdAndUpdate(userId, updatedValues, {new: true, runValidators: true}).select('-password')

    if(!user){
        return errorJson(404, 'User Not Found', res)
    }

    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully' 
    })
}

// Book appointment

const bookAppointment = async (req,res) => {
    const userId = req.user.userId
    const {docId, slotDate, slotTime} = req.body

    const userData = await userModel.findById(userId).select('-password')

    const doctorData = await doctorModel.findById(docId).select('-password')
    
    const slots_booked = doctorData.slots_booked    

    // checking doctor availability status
    if(!doctorData.available){
        return errorJson(400, 'Doctor not available', res)
    }


    // Check if user already has an appointment matching that date and time
    const appointments = await appointmentModel.find({userId:userId}).sort({createdAt : -1})


    const appointmentObject = {}

    for (let appointment of appointments) {
        if (!appointment.cancelled && !appointment.isCompleted) {  
            if (appointmentObject[appointment.slotDate]) {
                appointmentObject[appointment.slotDate].push(appointment.slotTime)
            } else {
                appointmentObject[appointment.slotDate] = []
                appointmentObject[appointment.slotDate].push(appointment.slotTime)
            }
        }
    }

    console.log(appointments, '---appointments---')

    if(appointmentObject[slotDate]){
        if(appointmentObject[slotDate].includes(slotTime)){
            return res.json({success:false, message:'You already have an appointment at this date and time'} )
        }
    }


    // checking if slot is available
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return errorJson(400, 'Slot already occupied', res)
        }else{
            slots_booked[slotDate].push(slotTime)
        }
    }else{
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }

   const updatedDoctor = await doctorModel.findByIdAndUpdate(docId, {slots_booked}, {new:true})

   console.log(updatedDoctor, 'Dcctorrr-booking')

    const appointmentData = {
        userId,
        docId,
        slotDate,
        slotTime,
        userData,
        doctorData,
        amount: doctorData.fee
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    return res.json({success:true, message: 'Appointment Booked Successfully'})
}

const cancelappointment = async (req,res) => {
    const {role} = req.user

    if(role !== 'admin' && role !== 'user' && role !== 'doctor'){
        return res.json({success:false, message: "Access Denied"})
    }
    
    const {appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData.payment){
        return res.json({
            success: false,
            message: 'Paid appointments cannot be cancelled'
        })
    }

    if(appointmentData.isCompleted){
        return res.json({
            success: false,
            message: 'Cannot cancel a completed appointment'
        })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    // updating doctor slot

    const {docId, slotTime, slotDate} = appointmentData

    const doctorData = await doctorModel.findById(docId).select('-password')

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(t => {
        if(t !== slotTime){
            return true
        }else{
            false
        }
    })

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    return res.json({success: true, message: 'Appointment cancelled successfully'})
}

export {getProfile, updateProfile, bookAppointment, cancelappointment}