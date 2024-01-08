import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connection= mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.log("Error in DB", error);
    }
}

export default connectDB;