import connectMongoDB from "@/components/db/mongodb";
import { Feedback } from "@/components/models/FeedbackSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB()
        const body = await req.json()
        console.log(body);
        const { name, email, message } = body
        const newFeedback = new Feedback({ name, email, message })
        await newFeedback.save()
        return NextResponse.json({ success: true, message: "Your Feedback has been received !!" })
    }
    catch (e) {
        return NextResponse.json({ success: false, message: error.message })
    }
}