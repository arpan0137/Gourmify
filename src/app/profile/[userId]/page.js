"use client"
import toast, { Toaster } from 'react-hot-toast';

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Page({ params }) {
    const router = useRouter()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [email, setEmail] = useState("")
    const userId = params.userId

    const updateUser = async () => {
        const body = { userId, name, phone, address, pincode }
        let result = await fetch('http://localhost:3000/api/users/updateuser', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        let data = await result.json()
        console.log(data);
        if (data.success) {
            toast.success(data.message);
            router.push('/profile')
        }
        else {
            toast.error(data.error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let result = await fetch('http://localhost:3000/api/users/profile')
            let res = await result.json()
            if (res.success) {
                setEmail(res.data.email)
                setName(res.data.name)
                setPhone(res.data.phone)
                setAddress(res.data.address)
                setPincode(res.data.pincode)
            }
        }
        fetchData()
    }, [])

    return (
        <section className="text-gray-600 body-font w-full">
            <Toaster />
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-left w-full">
                    <h1 className="sm:text-xl md:text-2xl mb-4 text-gray-900">Profie</h1>
                </div>
                <div className="lg:w-full md:w-2/3 mx-auto ">
                    <form className="flex flex-wrap -m-2" onSubmit={updateUser}>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Name</label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-[13px] md:text-sm text-gray-600">Email (can&apos;t be updated)</label>
                                <div className="flex items-center w-full h-8  bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400  text-gray-700 py-1 px-3 leading-8 overflow-hidden" >{email}</div>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="address" className="leading-7 text-[13px] md:text-sm text-gray-600">Address</label>
                                <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="phone" className="leading-7 text-[13px] md:text-sm text-gray-600 ">Phone Number</label>
                                <input type="tel" maxLength="10" id="phone" name="phone" placeholder='xxx-xxx-xxxx' pattern="[0-9]*" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder:text-sm" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="pincode" className="leading-7 text-[13px] md:text-sm text-gray-600">Pin Code</label>
                                <input type="number" maxLength={6} id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full h-8 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-gray-50 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="relative right-0 p-2 flex gap-4">
                            <button className="mx-auto text-white bg-gray-500 border-0 px-2 py-1 focus:outline-none hover:bg-gray-600 transition-all hover:shadow-md rounded-lg text-md">Save</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={() => router.push('/profile')} className=" absolute left-[290px] top-[380px]  mx-auto text-white bg-gray-500 border-0 px-2 py-1 focus:outline-none hover:bg-gray-600 hover:shadow-md rounded-lg text-md">Cancel</button>
                    </div>
                </div>
            </div>
        </section>

    )
}