import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./config/mongodb.config.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctour.routes.js";
import generalRoute from "./routes/general.js";
import appointmentRouter from "./routes/appointment.routes.js";
import { paymentRouter } from "./routes/payment.router.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// CORS options
const corsOptions = {
  origin: 'https://doctour-booking-app-1.onrender.com', // your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests for all routes
app.options('*', cors(corsOptions)); // safely handles OPTIONS requests

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/doctourApp/general', generalRoute);
app.use('/api/appointment', appointmentRouter);
app.use('/api/payments', paymentRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
