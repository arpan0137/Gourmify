"use client"
import { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
    const [userData, setUserData] = useState([])

    const fetchData = async () => {
        let result = await fetch("/api/admins/userlist")
        result = await result.json()
        setUserData(result)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const deleteUser = async (id) => {
        let result = await fetch("/api/admins/userlist", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        result = await result.json()
        fetchData()
        if (result.success) {
            toast.success(result.message)
        }
        else {
            toast.success(result.error)
        }
    }

    return (
        <section className="text-gray-600 body-font  min-w-[70%]  ml-[350px]">
            <Toaster />
            <div className="container py-10 mx-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Username</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Address</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Pincode</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Phone</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.length > 0 && userData.map((user) => (
                            <tr key={user._id} className="border-b-2 ">
                                <td className="px-2 py-3 text-gray-900">{user?.name}</td>
                                <td className="px-2 py-3 text-gray-900">{user?.email}</td>
                                <td className="px-2 py-3 text-gray-900">{user?.address}</td>
                                <td className="px-2 py-3 text-gray-900">{user?.pincode}</td>
                                <td className="px-2 py-3 text-gray-900">{user?.phone}</td>
                                <td className="px-2 py-3 text-gray-900"><Link href={`/admin/users/${user?._id}`} ><FiEdit /></Link></td>
                                <td className="px-2 py-3 text-gray-900"><button className="flex items-center" onClick={() => deleteUser(user?._id)} ><RiDeleteBin6Line /></button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </section >
    )
}