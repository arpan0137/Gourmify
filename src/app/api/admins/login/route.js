export const dynamic = "force-dynamic"

import { Admin } from "@/components/models/AdminSchema";
import connectMongoDB from "@/components/db/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, password } = body;
        await connectMongoDB()
        const admin = await Admin.findOne({ 'email': email })

        if (!admin) {
            return NextResponse.json({ success: false, error: "Admin doesn't exist !", status: 404 });
        }
        if (admin) {
            const validPassword = await bcryptjs.compare(password, admin.password);
            if (!validPassword) {
                return NextResponse.json({ success: false, error: "Invalid Credentials !", status: 401 });
            }
        }

        // create token data
        const tokenData = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: true
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
