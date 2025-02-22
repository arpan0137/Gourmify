/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function Page({ params }) {

    const router = useRouter()
    const userid = params.update
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")

    const updateUser = async () => {
        const body = {
            userid, name, address, phone, pincode
        }
        let result = await fetch('http://localhost:3000/api/admins/userlist', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        result = await result.json()
        if (result.success) {
            toast.success(result.message);
            router.push('/admin/users')
        }
        else {
            toast.error(result.error);
        }
    }

    const fetchData = async () => {
        let result = await fetch("/api/admins/userlist", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userid)
        })
        const userData = await result.json()
        setName(userData.name)
        setEmail(userData.email)
        setAddress(userData.address)
        setPhone(userData.phone)
        setPincode(userData.pincode)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="text-gray-600 body-font max-w-[75%]  ml-[340px]">
            <Toaster />
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-left w-full">
                    <h1 className="sm:text-xl md:text-2xl mb-4 text-gray-900">Update User</h1>
                </div>
                <div className="lg:w-full md:w-2/3 mx-auto ">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Name</label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-[13px] md:text-sm text-gray-600">Email (can&apos;t be updated)</label>
                                <input type="email" id="email" name="email" value={email} disabled />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="address" className="leading-7 text-[13px] md:text-sm text-gray-600">Address</label>
                                <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out  "></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="phone" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-[13px] md:text-sm text-gray-600">Pin Code</label>
                                <input type="number" id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex gap-2 mt-4 justify-center">
                            <button onClick={updateUser} className=" text-white bg-gray-500 border-0 px-2 py-1 focus:outline-none hover:bg-gray-600 hover:shadow-md rounded-lg text-md">Update User</button>
                            <button onClick={() => router.push('/admin/users')} className=" text-white bg-gray-500 border-0 px-2 py-1 focus:outline-none hover:bg-gray-600 hover:shadow-md rounded-lg text-md">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}