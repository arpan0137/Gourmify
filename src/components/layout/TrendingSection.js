"use client"
// import MenuItem from "../menu/MenuItem"
import toast, { Toaster } from 'react-hot-toast'
import SectionHeaders from "./SectionHeaders"
import Link from 'next/link';
import { FaCartPlus } from "react-icons/fa6";
import { useEffect, useState, useContext } from 'react';
import { cartContext } from '../CartContextProvider';
import './style.css'
import Aos from 'aos';
import 'aos/dist/aos.css'

export default function HomeMenu() {
    useEffect(() => {
        Aos.init()
    }, [])
    const { addToCart } = useContext(cartContext)
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        const res = await fetch('/api/admins/products')
        const productData = await res.json()
        setProducts(productData);
    }
    useEffect(() => {
        fetchData()
    }, [])

    function toastMessage() {
        toast.success("Item added to cart")
    }

    return (
        <div className="text-center mx-auto">
            <SectionHeaders mainHeader={"Trending"} />
            <Toaster />
            <div className="container px-5 py-5 mx-auto">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4" >
                    <div className="wrapper" data-aos='fade-in'>
                        <a className="rounded-lg bg-teal-500 w-1/2 md:w-full h-full flex items-center" href={'/menu/' + products[0]?.slug}>
                            <picture>
                                <img alt="food" src={products[0]?.image} />
                            </picture>
                        </a>
                        <div className=" flex flex-col justify-center items-center w-1/2 md:w-full">
                            <div className="mt-4 flex flex-col items-center">
                                <h3 className="text-gray-500 text-xs tracking-widest mb-1">{products[0]?.category}</h3>
                                <Link className="text-gray-900 text-lg font-medium" href={'/menu/' + products[0]?.slug}>{products[0]?.title}</Link>
                                <Link className="mt-1" href={'/menu/' + products[0]?.slug}>₹ {products[0]?.price}</Link>
                            </div>
                            <button onClick={() => { addToCart(products[0]?._id, products[0]?.price, products[0]?.title), toastMessage() }} className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 py-2 text-sm md:px-8 md:py-2 md:text-lg rounded-full mt-4 hover:bg-gray-600 hover:shadow-lg transition-all">
                                Add To Cart<FaCartPlus />
                            </button>
                        </div>
                    </div>
                    <div className="wrapper" data-aos='fade-in'>
                        <a className="rounded-lg bg-teal-500 w-1/2 md:w-full h-full flex items-center" href={'/menu/' + products[0]?.slug}>
                            <picture>
                                <img alt="food" src={products[1]?.image} />
                            </picture>
                        </a>
                        <div className=" flex flex-col justify-center items-center w-1/2 md:w-full">
                            <div className="mt-4 flex flex-col items-center">
                                <h3 className="text-gray-500 text-xs tracking-widest mb-1">{products[1]?.category}</h3>
                                <Link className="text-gray-900 text-lg font-medium" href={'/menu/' + products[1]?.slug}>{products[1]?.title}</Link>
                                <Link className="mt-1" href={'/menu/' + products[1]?.slug}>₹ {products[1]?.price}</Link>
                            </div>
                            <button onClick={() => { addToCart(products[1]?._id, products[1]?.price, products[1]?.title), toastMessage() }} className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 py-2 text-sm md:px-8 md:py-2 md:text-lg rounded-full mt-4 hover:bg-gray-600 hover:shadow-lg transition-all">
                                Add To Cart<FaCartPlus />
                            </button>
                        </div>
                    </div>
                    <div className="wrapper" data-aos='fade-in'>
                        <a className="rounded-lg bg-teal-500 w-1/2 md:w-full h-full flex items-center" href={'/menu/' + products[0]?.slug}>
                            <picture>
                                <img alt="food" src={products[2]?.image} />
                            </picture>
                        </a>
                        <div className=" flex flex-col justify-center items-center w-1/2 md:w-full">
                            <div className="mt-4 flex flex-col items-center">
                                <h3 className="text-gray-500 text-xs tracking-widest mb-1">{products[2]?.category}</h3>
                                <Link className="text-gray-900 text-lg font-medium" href={'/menu/' + products[2]?.slug}>{products[2]?.title}</Link>
                                <Link className="mt-1" href={'/menu/' + products[2]?.slug}>₹ {products[2]?.price}</Link>
                            </div>
                            <button onClick={() => { addToCart(products[2]?._id, products[2]?.price, products[2]?.title), toastMessage() }} className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 py-2 text-sm md:px-8 md:py-2 md:text-lg rounded-full mt-4 hover:bg-gray-600 hover:shadow-lg transition-all">
                                Add To Cart<FaCartPlus />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
