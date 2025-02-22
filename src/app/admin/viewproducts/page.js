"use client"
import Link from "next/link"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useState, useEffect } from "react"
import Image from "next/image"
import toast from "react-hot-toast"

export default function Page() {

    const [products, setProducts] = useState([])

    const fetchData = async () => {
        let result = await fetch("/api/admins/products")
        result = await result?.json()
        setProducts(result)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const deleteUser = async (prod_id) => {
        let result = await fetch("/api/admins/products", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: prod_id }),
        })
        result = await result.json()
        fetchData()
        if (result?.success) {
            toast.success(result?.message)
        }
        else {
            toast.error(result?.error)
        }
    }

    return (
        <section className="text-gray-600 body-font max-w-[75%]  ml-[350px]">
            <div className="container py-10 mx-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap ">
                    <thead>
                        <tr className="text-center">
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl ">Image</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Title</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                            <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 && products.map((product) => (
                                <tr key={product?._id} className="border-b-2 text-center ">
                                    <td className="px-2 py-3 text-gray-900"><Image src={product?.image} className="h-auto w-auto" height={150} width={150} alt="no image" /></td>
                                    <td className="px-2 py-3 text-gray-900">{product?.title}</td>
                                    <td className="px-2 py-3 text-gray-900">{product?.desc}</td>
                                    <td className="px-2 py-3 text-gray-900">{product?.category}</td>
                                    <td className="px-2 py-3 text-gray-900">{product?.price}</td>
                                    <td className="px-2 py-3 text-gray-900"><Link href={`/admin/viewproducts/${product?._id}`} ><FiEdit /></Link></td>
                                    <td className="px-2 py-3 text-gray-900"> <button className="flex items-center" onClick={() => { deleteUser(product?._id) }}><RiDeleteBin6Line /></button> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}