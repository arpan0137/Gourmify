/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import InputImage from "@/components/layout/InputImage";

export default function Page() {
    const [itemTitle, setItemTitle] = useState("")
    const [itemSlug, setItemSlug] = useState("")
    const [itemCategory, setItemCategory] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemImageLink, setItemImageLink] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { itemTitle, itemSlug, itemCategory, itemDesc, itemPrice, itemImageLink }
        let result = await fetch(`/api/admins/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const res = await result.json()
        toast.success(res.message)
        setItemTitle("")
        setItemSlug("")
        setItemDesc("")
        setItemCategory("")
        setItemPrice("")
        setItemImageLink("")
    }

    return (
        <section className="flex flex-col justify-center items-center text-gray-600 body-font  ml-[103px]">
            <Toaster />
            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="mt-3">
                        <InputImage itemImageLink={itemImageLink} setItemImageLink={setItemImageLink} />
                    </div>
                    <div className="flex flex-col gap-2" >
                        <div>
                            <label htmlFor="title" className="text-sm text-gray-600">Item Title</label>
                            <input id="title" name="title" type="text" required value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        </div>
                        <div>
                            <label htmlFor="slug" className="text-sm text-gray-600">Item Slug (No-Space)</label>
                            <input id="slug" name="slug" type="text" required value={itemSlug} onChange={(e) => setItemSlug(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        </div>
                        <div>
                            <label htmlFor="category" className="text-sm text-gray-600">Item Category</label>
                            <input id="category" name="category" type="text" required value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        </div>
                        <div>
                            <label htmlFor="desc" className="text-sm text-gray-600">Description</label>
                            <input id="desc" name="desc" type="text" required value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} className="block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        </div>
                        <div>
                            <label htmlFor="price" className="text-sm text-gray-600">Base Price</label>
                            <input id="price" name="price" type="number" required value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className="block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        </div>
                        <button type="submit" className="mt-4 px-2 py-1 w-[470px] text-white bg-gray-500 hover:bg-gray-600 border-2 hover:shadow-md outline-gray-700 rounded-lg text-md" >Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
