import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/mongodb.config.js";
import connectCloudinary from "./config/cloudinary.js";
import  adminRouter  from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctour.routes.js";
import generalRoute  from "./routes/general.js";
import appointmentRouter from "./routes/appointment.routes.js";
import { paymentRouter } from "./routes/payment.router.js";
// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())


// api endpoint

// app.use('/', (req,res) => {
//     res.send('API Working')
// })

// admind enpoints
app.use('/api/admin', adminRouter)
app.use('/api/user' , userRouter )
app.use('/api/doctor', doctorRouter)
app.use('/api/doctourApp/general', generalRoute )
app.use('/api/appointment', appointmentRouter)
app.use('/api/payments', paymentRouter)

app.listen(port, ()=> {
    console.log('app started')
    console.log(port)
})