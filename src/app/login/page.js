"use client"
import Link from "next/link"
import './style.css'
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation"
import { FaLock } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (data?.success) {
                router.push('/')
                toast.success(data.message);
                router.refresh();
            }
            else {
                toast.error(data.error);
            }
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="flex max-h-100vh max-w-100vw items-center justify-center text-gray-700 my-5">
            <Toaster />
            <div className="flex items-center justify-center rounded-lg w-96 h-2/4 px-[30px] py-[40px]  wrapper">
                <form className="items-center w-full h-full" onSubmit={handleFormSubmit} >
                    <h1 className=" text-3xl md:text-4xl font-semibold text-center">Login</h1>
                    <div className="flex items-center relative  my-[30px] h-[50px] w-full">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" className="inputFieldLogin" placeholder="Email" required />
                        <MdOutlineMailOutline className="absolute h-6 w-6 right-[20px] fill-gray-500" />
                    </div>
                    <div className="relative flex items-center my-[30px]  h-[50px] w-full">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" className="inputFieldLogin" placeholder="Password" required />
                        <FaLock className="absolute h-5 w-5 right-[22px] fill-gray-500" />
                    </div>
                    <div className="flex relative w-full text-sm p-2">
                        <Link className="absolute right-0 bottom-[5px]" href="/forgot">Forgot Password?</Link>
                    </div>
                    <button className="flex items-center justify-center my-5 p-5 rounded-full bg-gray-500  hover:bg-gray-600 text-white outline-white text-lg font-medium  h-[50px] w-full hover:shadow-md">Login</button>
                    <div className="text-sm ">Don&apos;t Have an Account? <Link href="/register" className=" font-semibold  ">Register</Link></div>
                </form>
            </div>
        </div>
    )
}