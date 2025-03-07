export const dynamic = 'force-dynamic';

import { User } from "@/components/models/UserSchema";
import connectMongoDB from "@/components/db/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

export async function POST(req) {
    try {
        await connectMongoDB()
        const body = await req.json()
        const { email, password } = body;
        const user = await User.findOne({ 'email': email })

        if (!user) {
            return NextResponse.json({ success: false, error: "User doesn't exist !", status: 404 });
        }

        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password);
            if (!validPassword) {
                return NextResponse.json({ success: false, error: "Invalid Credentials !", status: 401 });
            }
        }

        // create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        let response = NextResponse.json({
            message: "Login Successful !",
            success: true
        })
        response.cookies.set("token", token)
        return response;
    }
    catch (error) {
        return NextResponse.json({ error: "Something went wrong !!", status: 500 })
    }
}
