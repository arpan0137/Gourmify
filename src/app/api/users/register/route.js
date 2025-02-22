import { User } from "@/components/models/UserSchema";
import connectMongoDB from "@/components/db/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export async function POST(req) {
    try {
        await connectMongoDB()
        const { name, email, password } = await req.json()
        const user = await User.findOne({ 'email': email })
        if (user) {
            return NextResponse.json({ error: "user already Exist !!", success: false })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)
        const newUser = new User({ name, email, password: hashedpassword });
        await newUser.save()
        return NextResponse.json({ message: "User successfully registered !", success: true })
    }
    catch (error) {
        return NextResponse.json({ error: "Something went wrong !!", success: false })
    }
}
