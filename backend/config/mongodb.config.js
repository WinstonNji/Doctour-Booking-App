import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        
    })
}

export default connectDB
