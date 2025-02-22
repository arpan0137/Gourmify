import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getDataFromToken() {
    try {
        const token = cookies().get('token')?.value || ''
        if (token) {
            const decodedToken = jwt?.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET)
            return decodedToken
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}
