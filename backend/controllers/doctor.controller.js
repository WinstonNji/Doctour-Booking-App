import { doctorModel } from "../models/doctor.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { errorJson } from "../utils/errorJson.js"

export const doctorLogin = async (req, res) => {
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
