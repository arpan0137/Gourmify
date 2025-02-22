export const dynamic = 'force-dynamic'

import { getDataFromToken } from '@/helper/getDataFromToken'
import { User } from "@/components/models/UserSchema";
import connectMongoDB from "@/components/db/mongodb";
import { NextResponse } from "next/server";
import {unstable_cache} from "next/cache";

export const GET = unstable_cache(
    async function(){
        await connectMongoDB()
        const data = await getDataFromToken()
        const userId = data.id
        const user = await User.findOne({ _id: userId })
        return NextResponse.json({ success: true, data: user })
    },['user-profile'],
    {
        tags:['user-profile']
    }
)