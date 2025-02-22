import mongoose from "mongoose"
export default async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.CONNECTION_URI)
    }
    catch (error) {
        console.log(error)
    }
}