import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Database connection establised')
    })
}

export default connectDB
