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
        const token =  jwt.sign({email, role:'admin'}, process.env.JWT_SECRET, {expiresIn : "24h"} )
        return res.status(200).json({success: true, message: "Welcome Admin", token})
    }else{
        return res.json({success: false, message: "Wrong credentials" })
    }
}

// Api to add doctour
export const addDoctor = async (req,res) => {

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

        console.log("imageUpload:", imageUpload)

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






