"use client"
import { useEffect, useState } from "react"
import { FaCircleLeft } from "react-icons/fa6";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    const router = useRouter()
    const id = params.update[0]
    const name = params.update[1]
    const [editedCategory, setEditedCategory] = useState(name)
    console.log(id);
    const handleNewCategorySubmit = async (e) => {
        e.preventDefault()
        let result = await fetch("/api/admins/categories", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, editedCategory })
        })
        result = await result.json()
        setEditedCategory("")
        if (result.success) {
            router.push("/admin/categories")
            toast(result.message, {
                icon: '👍',
            });
        }
        else {
            toast.error(result.error);
        }
    }

    return (
        <>
            <Link href="/admin/categories" className="flex items-center gap-2 text-gray-600"><FaCircleLeft />Back</Link>
            <section className="flex flex-col justify-center items-center text-gray-600 body-font w-full">
                <Toaster />
                <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                    <label htmlFor="newCategory" className="text-sm text-gray-600">New Category Name</label>
                    <div className="flex items-center">
                        <input id="newCategory" type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="md:mr-2 md:px-2 py-1 md:w-[400px] w-56 bg-gray-100 bg-opacity-50 rounded-lg border focus:bg-gray-100 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 px-2" />
                        <button type="submit" className="px-3 py-1 text-white bg-transparent hover:bg-white hover:text-black border-2 hover:shadow-md rounded-lg text-md ml-1">Save</button>
                    </div>
                </form>
            </section>
        </>
    )
}