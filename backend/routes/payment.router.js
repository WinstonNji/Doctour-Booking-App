import { initatePayment, verifyTransaction } from "../controllers/payment.controller.js";
import express from 'express'
import { authMiddleware } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router()

paymentRouter.post('/initiate-payment', authMiddleware, initatePayment)
paymentRouter.get('/verify/:transactionId', authMiddleware , verifyTransaction)
export {paymentRouter}