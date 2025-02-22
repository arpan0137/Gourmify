"use client"
import InputImage from "@/components/layout/InputImage"
import { useState } from "react"

export default function Page() {

    const [image, setImage] = useState("")

    return (
        <section className="flex flex-col justify-center items-center text-gray-600 body-font  ml-[103px]">
            <form className="mt-8">
                <div className="flex gap-4">
                    <div>
                        <InputImage link={image} setLink={setImage}></InputImage>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Item Title</label>
                        <input id="menuItem" type="text" className="md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        <label className="text-sm text-gray-600">Item Category</label>
                        <input id="menuItem" type="text" className="md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        <label className="text-sm text-gray-600">Description</label>
                        <input id="desc" type="text" className="md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        <label className="text-sm text-gray-600">Base Price</label>
                        <input id="price" type="text" className="md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        <button type="submit" className="mt-4 px-2 py-1 w-[470px] text-white bg-transparent hover:bg-white hover:text-black border-2 hover:shadow-md rounded-lg text-md">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}