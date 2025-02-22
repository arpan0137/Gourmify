import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        cookies().delete('token')
        return NextResponse.json({ message: "Logout Successful !", success: true })
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message, status: 500 })
    }
}
