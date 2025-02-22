"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaUserGroup } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";


export default function AdminSideBar() {
    const path = usePathname();
    return (
        <header className="sidebar flex flex-col p-10 h-screen fixed left-0 top-0 min-w-[20%] max-w-[20%] text-lg text-white bg-gray-600">
            <h1 className=" text-center text-2xl mb-6"><b>GOURMIFY</b></h1>
            <nav className="flex flex-col gap-10 tabs">
                <Link className={path === "/admin/addproduct" ? 'active' : ''} href={'/admin/addproduct'}>
                    <span className="flex items-center gap-2 " ><IoAddCircleSharp className="text-2xl" />Add Item</span>
                </Link>
                <Link className={path === "/admin/viewproducts" ? 'active' : ''} href={'/admin/viewproducts'}>
                    <span className="flex items-center gap-2 " ><FaEye className="text-2xl" />View Items</span>
                </Link>
                <Link className={path === "/admin/users" ? 'active' : ''} href={'/admin/users'}>
                    <span className="flex items-center gap-2 " ><FaUserGroup className="text-2xl" />Users List</span>
                </Link>
            </nav>
        </header>
    )
}
