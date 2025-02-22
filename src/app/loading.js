"use client"
import { GridLoader } from "react-spinners"
export default function Loading() {
    return (
        <div className="min-w-full min-h-screen flex items-center justify-center">
            <GridLoader loading color="#478778" />
        </div>
    )
}
