"use client"

import { cartContext } from "@/components/CartContextProvider";
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params }) {

    const itemSlug = params.slug
    const [product, setProduct] = useState()
    const { addToCart } = useContext(cartContext)

    const fetchProduct = async () => {
        const data = await fetch("/api/admins/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemSlug })
        })
        const { product } = await data.json()
        setProduct(product)
    }

    useEffect(() => {
        fetchProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toastMessage = () => {
        toast.success("Item added to cart")
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden" >
            <Toaster />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <picture className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
                        <img alt="food" src={product?.image} />
                    </picture>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>

                        <p className="leading-relaxed text-md">{product?.desc}</p>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">{product?.price}₹</span>
                            <button onClick={() => { addToCart(product?._id, product?.price, product?.title), toastMessage() }} className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Add to cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 transition-all">
                                <svg fill="currentColor" className="text-gray-500 hover:text-gray-600 w-6 h-6 " viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}