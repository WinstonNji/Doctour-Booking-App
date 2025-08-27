import express from "express"
import { userRegistration } from "../controllers/user.controller.js"
import { userLogin } from "../controllers/user.controller.js"
import { getProfile, updateProfile, bookAppointment, cancelappointment } from "../controllers/user.controller.js"
// import userAuthentificationMiddleware from "../middlewares/user.authMiddleware.js"
import upload from "../middlewares/multer.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.post('/user-registration', userRegistration)

userRouter.post('/user-login', userLogin)

userRouter.get('/get-user', authMiddleware , getProfile)

userRouter.patch('/update-user' , authMiddleware, upload.single('image') , updateProfile)

userRouter.post('/book-appointment', authMiddleware, bookAppointment )

userRouter.post('/cancel-appointment', authMiddleware, cancelappointment)

userRouter.get('/verify-user', authMiddleware, (req,res)=> {
    const {role} = req.user
    if(role === "user") return res.json({success:true})
    
})

export default userRouter