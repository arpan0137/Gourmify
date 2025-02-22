"use client"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/users/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            const data = await res.json()
            console.log(data);
            if (data?.success) {
                toast.success(data.message);
            }
            else {
                toast.error(data.error);
            }

        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            setName("")
            setEmail("")
            setMessage("")
        }
    }

    return (
        <section className="text-gray-600 body-font relative -mt-20">
            <Toaster />
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Give Feedback</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Share your vauable feedback whether positive or negative</p>
                </div>
                <form onSubmit={handleSubmit} className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button className="flex mx-auto text-white bg-gray-500 border-0 py-[5px] px-4 focus:outline-none hover:bg-gray-600 rounded-2xl text-lg" >Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </section >
    )
}