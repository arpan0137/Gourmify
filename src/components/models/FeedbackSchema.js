import mongoose, { model, models, Schema } from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true })

export const Feedback = models?.feedbacks || model("feedbacks", FeedbackSchema)