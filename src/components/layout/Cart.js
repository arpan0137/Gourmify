"use client"
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useContext, useRef } from "react";
import { cartContext } from "../CartContextProvider";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
    const router = useRouter()
    const token = Cookies.get("token")
    const { subTotal, addToCart, cartProducts, removeFromCart, clearCart } = useContext(cartContext)
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (ref.current.classList.contains('translate-x-0')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }

    const checkOut = () => {
        ref.current.classList.remove('translate-x-0')
        ref.current.classList.add('translate-x-full')

        if (token) {
            router.push('/checkout')
        }
        else {
            router.push('/login')
            toast.error("Login First !!")
        }
    }

    const ref = useRef()
    return (
        <>
            <Toaster />
            <div onClick={toggleCart} className=" text-pink-900  w-5 absolute right-[140px] top-5 md:top-7 cursor-pointer " ><FaCartShopping /></div>
            <div ref={ref} className="sideCart min-w-[350px] md:min-w-[500px] h-screen rounded-sm z-40 absolute top-0 right-0 bg-gray-300 text-black py-10 px-11 transform transition-transform  translate-x-full shadow-xl ">
                <span onClick={toggleCart} className=" text-2xl absolute right-4 top-4 cursor-pointer text-red-600 hover:text-red-800"><IoIosCloseCircle /></span>
                <h2 className="font-semibold text-2xl text-center w-full mb-5">Cart</h2>
                {Object.keys(cartProducts).length > 0 &&
                    <div className="flex font-medium text-lg tracking-wider items-center gap-10">
                        <div className=" absolute left-[90px]">Name</div>
                        <div className=" absolute right-[140px] md:right-[170px] ">Price</div>
                        <div className=" absolute right-[40px]">Quantity</div>
                    </div>
                }
                <ol className="flex flex-col gap-5 list-decimal font-semibold my-10 ">
                    {
                        Object.keys(cartProducts)?.map((key) => (
                            <li key={key} className="ml-4" >
                                <div className="flex items-center gap-10">
                                    <div className="md:w-3/4 font-medium">{cartProducts[key].name}</div>
                                    <div className="md:w-1/4 font-medium">{cartProducts[key].price}₹</div>
                                    <div className="flex items-center justify-center font-medium text-lg gap-2"><AiFillMinusCircle onClick={() => removeFromCart(key)} className="cursor-pointer text-gray-500 hover:text-gray-600" /><span className="text-sm">{cartProducts[key].qty}</span><AiFillPlusCircle onClick={() => addToCart(key, cartProducts[key].qty)} className="cursor-pointer text-gray-500 hover:text-gray-600" /></div>
                                </div>
                            </li>
                        ))}
                </ol>
                {Object.keys(cartProducts).length > 0 &&
                    <>
                        <div className="font-medium text-right text-xl">Sub Total &nbsp;:&nbsp; {subTotal} ₹</div>
                        <div className="flex">
                            <button onClick={checkOut} className="flex gap-2 items-center mx-auto mt-16 text-white bg-gray-500 border-0 py-[5px] px-3 focus:outline-none hover:bg-gray-600 hover:shadow-lg rounded text-md"><IoBagCheckOutline className="text-xl" />Checkout</button>
                            <button onClick={() => { clearCart(), toast.success("Cart Cleared !!") }} className="flex gap-2 items-center mx-auto mt-16 text-white bg-gray-500 border-0 py-[5px] px-3 focus:outline-none hover:bg-gray-600 hover:shadow-lg rounded text-md"><RiDeleteBin6Line className="text-xl" />Clear Cart</button>
                        </div>
                    </>
                }
                {Object.keys(cartProducts).length === 0 && <div className="text-center mt-10">
                    <div className="flex flex-col items-center">
                        <picture>
                            <img src="/Images/empty-cart.png" alt="empty-cart" className="h-40 w-40" />
                        </picture>
                        <p className="text-md font-medium">Your cart is empty</p>
                        <p className="text-sm font-normal" >Add something to make me happy :)</p>
                    </div>
                </div>}
            </div >
        </>
    )
}