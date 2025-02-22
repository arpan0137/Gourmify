
import { User } from "@/components/models/UserSchema"
import connectMongoDB from "@/components/db/mongodb"
import { NextResponse } from "next/server"

export async function PUT(request) {
    await connectMongoDB()
    request = await request.json()
    await User.findOneAndUpdate({ _id: request.userId }, { address: request.address, name: request.name, pincode: request.pincode, phone: request.phone })
    return NextResponse.json({ success: true, message: "User Updated Successfully !!" })
}
