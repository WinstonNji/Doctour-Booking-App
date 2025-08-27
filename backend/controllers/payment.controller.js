import axios from 'axios';
import appointmentModel from '../models/appointment.model.js';
import Flutterwave from 'flutterwave-node-v3'
import { doctorModel } from '../models/doctor.model.js';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

const initatePayment = async (req,res) => {
    const {role} = req.user

     if(role !== 'user'){
        return res.json({success:false, message: "Access Denied"})
    }

    const {amount, email, name, appointmentId} = req.body
 
    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData.payment){
        return res.json({success:false, message: "Payment already made"})
    }

    try {
        const response = await axios.post("https://api.flutterwave.com/v3/payments", {
            tx_ref: Date.now(),
            amount,
            currency: 'RWF',
            redirect_url : `https://doctour-booking-app-frontend.onrender.com/verify?appointmentId=${appointmentId}`,
            payment_options: 'card,mobilemoney,ussd',
            customer: {
                email,
                name,
            },
            customizations: {
                title: 'my Payment Title',
                description: 'Payment is for appointment booking',
                logo: null,
            }
        } , {headers : {
                Authorization : `Bearer ${process.env.FLW_SECRET_KEY}`}
            }
        )

        if(!response){
            return res.json({success:false, message:'Failed to initiate payment'})
        }

        return res.json({success:true, response: response.data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Payment initiation failed" });
    }
}

    const verifyTransaction = async (req,res) => {

        const role = req.user.role

        if(!role){
            return res.json({success: false, message: `Access Denied`})
        }

        const transactionId = req.params.transactionId
        const {appointmentId} = req.query


        if(!transactionId){
            return res.json({success: false, message: "Couldn't verify your transaction"})
        }

        if(!appointmentId){
            return res.json({success: false, message: "Couldn't find your appointment"})
        }

        try{
            const response = await flw.Transaction.verify({
                id : transactionId
            })

            if(!response){
                return res.json({success: false, message: "Could not verify transaction"})
            }

            const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true})

            const appointmentData = await appointmentModel.findById(appointmentId)

            const docId = appointmentData.docId
            const slotDate = appointmentData.slotDate
            const slotTime = appointmentData.slotTime

            const doctorData = await doctorModel.findById(docId)

            const slots_booked = doctorData.slots_booked

            if(!slots_booked[slotDate]){
                slots_booked[slotDate] = []
                slots_booked[slotDate].push(slotTime)
            }

            const updatedDoctor =await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        

            return res.json({success: true, message: "Transaction successfully Verified, Appointment Booked", response: response.data})
        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Transaction verification failed" });
        }

    }

export {initatePayment, verifyTransaction};