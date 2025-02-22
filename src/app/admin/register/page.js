"use client"
import React from "react"
import Link from "next/link"
import './style.css'
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaLock } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const admin_pwd = process.env.NEXT_PUBLIC_ADMIN_PWD
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            if (adminPassword == admin_pwd) {
                const response = await fetch('/api/admins/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                })
                const data = await response.json()
                if (data.success) {
                    toast.success(data.message);
                    router.push('/admin/login')
                }
                else {
                    toast.error(data.error);
                }
            }
            else {
                toast.error("admin password doesn't match, try again !!");
            }
        }
        finally {
            setName('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div className="flex max-h-50vh max-w-50vw items-center justify-center text-gray-700 my-5" >
            <Toaster />
            <div className="rounded-lg w-96 md:w-80 md:h-1/5 lg:w-96 lg:h-2/4  px-[30px] py-[40px] wrapper">
                <form className="block max-width-xs mx-auto w-full h-full" onSubmit={handleFormSubmit} >
                    <h1 className=" text-3xl font-semibold text-center md:text-4xl">Admin Register</h1>
                    <div className="flex items-center relative  my-[30px] h-[50px] w-full">
                        <input value={name} type="text" name="name" className="inputFieldRegister" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                        <FaUser className="absolute h-5 w-5 right-[22px] fill-gray-500 font-bold " />
                    </div>
                    <div className="flex items-center relative  my-[30px] h-[50px] w-full">
                        <input value={email} type="email" name="email" className="inputFieldRegister" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <MdOutlineMailOutline className="absolute h-6 w-6 right-[20px] fill-gray-500" />
                    </div>
                    <div className="relative flex items-center my-[30px]  h-[50px] w-full">
                        <input value={password} type="password" name="password" className="inputFieldRegister" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <FaLock className="absolute h-5 w-5 right-[22px] fill-gray-500" />
                    </div>
                    <div className="relative flex items-center my-[30px]  h-[50px] w-full">
                        <input value={adminPassword} type="password" name="adminpassword" className="inputFieldRegister" onChange={(e) => setAdminPassword(e.target.value)} placeholder="Admin Password" required />
                        <GrUserAdmin className="absolute h-5 w-5 right-[22px] text-gray-500" />
                    </div>
                    <button className="flex items-center justify-center my-5 p-5 rounded-full bg-gray-500 hover:bg-gray-600  text-white text-lg font-medium  h-[50px] w-full hover:shadow-md transition-all outline-white">Register</button>
                    <div className="text-sm ">Already have an Account? <Link href="/admin/login" className=" font-semibold ">Login</Link></div>
                </form>
            </div>
        </div>
    )
}