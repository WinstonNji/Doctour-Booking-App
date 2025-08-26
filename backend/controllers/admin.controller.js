import { doctorModel } from "../models/doctor.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"

// Admin Login
export const adminLogin = async (req,res) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({success: false, message: "Please enter all fields"})
    }

    if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
        const token =  jwt.sign({role:'admin'}, process.env.JWT_SECRET, {expiresIn : "2h"} )
        return res.status(200).json({success: true, message: "Welcome Admin", token})
    }else{
        return res.json({success: false, message: "Wrong credentials" })
    }
}

// Api to add doctour
export const addDoctor = async (req,res) => {

    const {role} = req.user

    if(role !== 'admin'){
        return res.json({success: false, message: 'Access Denied'})
    }

    try {
        const {name, email, password, speciality, degree, experience, about , fee, address} = req.body

        const imageFile = req.file

        if(!name || !email || !password || !speciality || !degree ||  !experience || !about || !fee || !address || !imageFile){
            return res.json({success : false, message : 'Enter all fields'})
        }

        if(!validator.isEmail(email)){
            return res.json({success : false, message : 'Enter a valid email address'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const imageUpload = cloudinary.uploader.upload(imageFile.path, {resource_type : "image"})
        const imageUrl = (await imageUpload).secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address,
            image: imageUrl
        }

        const newDoctour = new doctorModel(doctorData)
        await newDoctour.save()

        return res.status(200).json({success:true, message: "Doctor Added"})
    } catch (error) {
        console.log(error)
        return res.json({success:false, error: error})
    }
}







// Admin update doctor details
export const updateDoctorByAdmin = async (req,res) => {
    try {
        const { role } = req.user
        if(role !== 'admin'){
            return res.json({success: false, message: 'Access Denied'})
        }

        const { id } = req.params
        let { address, speciality, experience, about } = req.body

        // Normalize address
        try {
            if(typeof address === 'string'){
                address = JSON.parse(address)
            }
        } catch (e) {
            // if parsing fails, default to previous value on doc (handled by partial update)
        }

        const updateData = {}
        if(address && typeof address === 'object') updateData.address = address
        if(typeof speciality === 'string') updateData.speciality = speciality
        if(typeof about === 'string') updateData.about = about
        if(typeof experience !== 'undefined') updateData.experience = experience

        // Optional image upload
        if(req.file){
            const imageUpload = cloudinary.uploader.upload(req.file.path, {resource_type : "image"})
            const imageUrl = (await imageUpload).secure_url
            updateData.image = imageUrl
        }

        const updated = await doctorModel.findByIdAndUpdate(id, updateData, { new: true })

        if(!updated){
            return res.json({success:false, message:'Doctor not found'})
        }

        return res.status(200).json({success:true, message:'Doctor updated successfully', doctor: updated})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:'Failed to update doctor'})
    }
}