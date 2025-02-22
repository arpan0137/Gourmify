"use client"
import { useEffect, useState } from "react"
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import InputImage from "@/components/layout/InputImage";

export default function Page({ params }) {
    const router = useRouter()

    const id = params.update
    const [newItemTitle, setNewItemTitle] = useState("")
    const [newItemCategory, setNewItemCategory] = useState("")
    const [newItemSlug, setNewItemSlug] = useState("")
    const [newItemDesc, setNewItemDesc] = useState("")
    const [newItemPrice, setNewItemPrice] = useState("")
    const [itemImageLink, setItemImageLink] = useState("")

    const updateItem = async (e) => {
        e.preventDefault()
        const body = { id, newItemTitle, newItemSlug, newItemCategory, newItemDesc, newItemPrice, itemImageLink }
        let result = await fetch("/api/admins/products", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        result = await result.json()
        if (result.success) {
            router.push("/admin/viewproducts")
            toast(result.message, {
                icon: '👍',
            });
        }
        else {
            toast.error(result.error);
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            let result = await fetch("/api/admins/products", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            result = await result.json()
            setNewItemTitle(result?.title)
            setNewItemSlug(result?.slug)
            setNewItemCategory(result?.category)
            setNewItemDesc(result?.desc)
            setNewItemPrice(result?.price)
            setItemImageLink(result?.image)
        }
        fetchProduct()
    }, [id])

    return (
        <>
            <section className="flex flex-col justify-center items-center text-gray-600 body-font">
                <Toaster />
                <form className="mt-8">
                    <div className="flex gap-4">
                        <div className="mt-3">
                            <InputImage itemImageLink={itemImageLink} setItemImageLink={setItemImageLink} />
                        </div>
                        <div className="flex flex-col gap-2" >
                            <div>
                                <label htmlFor="title" className="text-sm text-gray-600">Item Title</label>
                                <input id="title" name="title" type="text" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                            </div>
                            <div>
                                <label htmlFor="slug" className="text-sm text-gray-600">Item Slug (No-Space)</label>
                                <input id="slug" name="slug" type="text" value={newItemSlug} onChange={(e) => setNewItemSlug(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                            </div>
                            <div>
                                <label htmlFor="category" className="text-sm text-gray-600">Item Category</label>
                                <input id="category" name="category" type="text" value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className=" block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                            </div>
                            <div>
                                <label htmlFor="desc" className="text-sm text-gray-600">Description</label>
                                <input id="desc" name="desc" type="text" value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} className="block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                            </div>
                            <div>
                                <label htmlFor="price" className="text-sm text-gray-600">Base Price</label>
                                <input id="price" name="price" type="text" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className="block md:mr-2 md:px-2 py-1 md:w-[470px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                            </div>
                            <div>
                                <button type="submit" onClick={updateItem} className="mt-4 px-2 py-1 w-1/2 text-white bg-gray-500 hover:bg-gray-600 border-2 hover:shadow-md rounded-lg text-md" >Save</button>
                                <Link type="submit" href="/admin/viewproducts" className="mt-4 px-2 py-1 w-1/2 text-white bg-gray-500 hover:bg-gray-600 border-2 hover:shadow-md rounded-lg text-md" >Cancel</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}