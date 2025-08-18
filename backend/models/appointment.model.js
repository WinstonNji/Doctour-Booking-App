import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId : {
        type : String, 
        required: true
    },
    docId : {
        type : String, 
        required: true
    },
    slotDate : {
        type : String, 
        required: true
    },
    slotTime : {
        type : String, 
        required: true
    },
    userData : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user", 
        required: true
    },
    doctorData : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "doctor", 
        required: true
    },
    amount : {
        type : Number, 
        required: true
    },
    cancelled : {
        type : Boolean, 
        defailt: false
    },
    payment : {
        type : Boolean, 
        default: true
    },
    isCompleted : {
        type : Boolean, 
        defaule: false
    },    

},{timestamps: true})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

export default appointmentModel