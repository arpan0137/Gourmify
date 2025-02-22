export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import {unstable_cache} from "next/cache";

export const GET = unstable_cache(
     async function() {
        try {
            const data = await getDataFromToken()
            const name = data.name
            return NextResponse.json(name)
        }
        catch (error) {
            return NextResponse.json({ error: error.message })
        }
    } ,['admin-profile'],
    {
        tags:['admin-profile']
    }
)