import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/healthcheck`)
        console.log(`MongoDb Connected Successfully ${db.connection.host}`)
    } catch (error) {
        throw new error(`Error in Database Connection`)
    }
}