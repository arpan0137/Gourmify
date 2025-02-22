import { Admin } from "@/components/models/AdminSchema";
import connectMongoDB from "@/components/db/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export async function POST(req) {

    try {
        await connectMongoDB()
        const { name, email, password } = await req.json()
        const admin = await Admin.findOne({ 'email': email })
        if (admin) {
            return NextResponse.json({ error: "admin already exist !!", success: false })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)
        const newAdmin = new Admin({ name, email, password: hashedpassword });
        await newAdmin.save()
        return NextResponse.json({ message: "Admin successfully registered !", success: true })
    }
    catch (error) {
        return NextResponse.json({ error: "Something went wrong !!", success: false })
    }
}
