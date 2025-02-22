"use client"
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const router = useRouter()
    const [name, setName] = useState()
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = async () => {
        try {
            let data = await fetch("/api/admins/logout")
            data = await data.json()
            console.log(data)
            if (data.success) {
                router.push('/admin/login')
                toast.success(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setTimeout(() => {
                router.refresh()
            }, 1000)
        }
    }

    async function fetchData() {
        const response = await fetch('/api/admins/profile')
        const name = await response.json()
        setName(name)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className=" mt-0 py-7 w-screen">
            <Toaster />
            <div className="absolute text-center top-[9px] right-16">
                <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                    <span className="flex items-center gap-2">Hi, <strong>{name}</strong><FaCaretDown /></span>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1 flex flex-col gap-2" role="menu">
                            <button className=" bg-gray-500  hover:bg-gray-600 transition-colors text-white px-3 py-1 mx-4 text-md rounded-lg hover:shadow-md" onClick={handleLogOut}>Log Out</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
