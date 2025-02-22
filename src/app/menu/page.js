"use client"
import './style.css'
import Link from "next/link"
import SectionHeaders from "@/components/layout/SectionHeaders"
import { useContext, useState, useEffect } from "react"
import { FaCartPlus } from 'react-icons/fa6'
import { cartContext } from '@/components/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Page() {
    useEffect(() => {
        Aos.init();
    }, [])

    const [products, setProducts] = useState([])
    const { addToCart } = useContext(cartContext)

    const fetchData = async () => {
        const res = await fetch('/api/admins/products')
        const productData = await res.json()
        setProducts(productData);
    }
    useEffect(() => {
        fetchData()
    }, [])

    function toastMessage() {
        toast.success("Item added to cart", 1)
    }

    return (
        <div className="text-center">
            <Toaster />
            <SectionHeaders mainHeader={"Our Menu"} />
            <div className="container px-5 py-5 mx-auto">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4" >
                    {products.length > 0 && products.map((item) => (
                        <div key={item._id} data-aos="fade-in" className="p-2 md:p-4 md:h-full rounded-xl wrapper flex flex-row gap-1 md:flex-col items-center container">
                            <a className="rounded-lg bg-teal-500 w-1/2 md:w-full h-full flex items-center" href={'/menu/' + item.slug}>
                                <picture >
                                    <img alt="🍿" src={item.image} />
                                </picture>
                            </a>
                            <div className=" flex flex-col items-center w-1/2 md:w-full">
                                <div className="mt-4 flex flex-col items-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest mb-1">{item.category}</h3>
                                    <Link className="text-gray-900 text-lg font-medium" href={'/menu/' + item.slug}>{item.title}</Link>
                                    <Link className="mt-1" href={'/menu/' + item.slug}>₹ {item.price}</Link>
                                </div>
                                <button onClick={() => { addToCart(item._id, item.price, item.title), toastMessage() }} className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 py-2 text-sm md:px-8 md:py-2 md:text-lg rounded-full mt-4 hover:bg-gray-600 hover:shadow-lg transition-all">
                                    Add To Cart<FaCartPlus />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}