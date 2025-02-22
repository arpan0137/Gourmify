import connectMongoDB from "@/components/db/mongodb";
import { User } from "@/components/models/UserSchema";
import { NextResponse } from "next/server";

export async function GET() {//get userlist - admin side
    try {
        connectMongoDB();
        const userlist = await User.find()
        return NextResponse.json(userlist)
    }
    catch (error) {
        return NextResponse.json({ success: false, error: "something went wrong" })
    }
}

export async function POST(req) {//show userdata on update user page - admin side
    try {
        connectMongoDB();
        const id = await req.json()
        const userdata = await User.findOne({ _id: id })
        return NextResponse.json(userdata)
    }
    catch (error) {
        return NextResponse.json({ success: false, error: "something went wrong !!" })
    }
}

export async function PUT(request) {//update user - admin side
    try {
        await connectMongoDB()
        request = await request.json()
        await User.findOneAndUpdate({ _id: request.userid }, { name: request.name, address: request.address, phone: request.phone, pincode: request.pincode })
        return NextResponse.json({ success: true, message: "User Updated Successfully !!" })
    } catch (error) {
        return NextResponse.json({ success: false, error: "something went wrong !!" })
    }
}

export async function DELETE(request) {//delete user - admin side
    try {
        await connectMongoDB()
        request = await request.json()
        await User.findOneAndDelete({ _id: request.id })
        return NextResponse.json({ success: true, message: "User Deleted Successfully !!" })
    } catch (error) {
        return NextResponse.json({ success: false, error: "something went wrong !!" })
    }
}