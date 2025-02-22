"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Profile() {

    const router = useRouter()
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")


    const getUserDetails = async () => {
        const result = await fetch('http://localhost:3000/api/users/profile')
        const res = await result.json()
        if (res.success) {
            setUserId(res.data?._id)
            setName(res.data?.name)
            setEmail(res.data?.email)
            setAddress(res.data?.address)
            setPhone(res.data?.phone)
            setPincode(res.data?.pincode)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const handleUserSubmit = () => {
        router.push('/profile/' + userId)
    }

    return (
        <section className="text-gray-600 body-font w-full">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-left w-full">
                    <h1 className="sm:text-xl md:text-2xl mb-4 text-gray-900">Profie</h1>
                </div>
                <div className="lg:w-full md:w-2/3 mx-auto ">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Name</label>
                                <input type="text" id="name" name="name" value={name} disabled onChange={(e) => setName(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-[13px] md:text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email" value={email} disabled className="w-full h-8  bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="address" className="leading-7 text-[13px] md:text-sm text-gray-600">Address</label>
                                <textarea id="address" name="address" value={address} disabled onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out  "></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="phone" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Phone Number</label>
                                <input type="number" id="phone" name="phone" value={phone} disabled onChange={(e) => setPhone(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder:text-sm" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-[13px] md:text-sm text-gray-600">Pin Code</label>
                                <input type="number" id="pincode" name="pincode" value={pincode} disabled onChange={(e) => setPincode(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="relative right-0 p-2 w-full">
                            <button onClick={handleUserSubmit} className="mx-auto text-white bg-gray-500 hover:bg-gray-600 border-2 hover:shadow-md hover:border-0 px-2 py-1 focus:outline-none rounded text-md">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}