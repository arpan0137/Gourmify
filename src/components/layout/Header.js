import { cookies } from "next/headers";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import Cart from "./Cart";
import LogOut from "./Logout";


export default function Header({ title }) {
  const token = cookies()?.get('token')?.value
  return (
    <header className="header flex flex-col md:flex-row items-center justify-center md:p-6 text-gray-600 bg-white mt-0 sticky md:sticky top-0 z-50 w-full shadow-gray-400 shadow-md ">
      <div className="absolute top-4 md:top-5 left-0 ml-2 md:mt-0">
        <Link className="text-gray-500 font-semibold text-xl md:text-2xl hover:text-gray-600 transition-colors" href="/">{title}</Link>
      </div>
      <nav className="space-x-10 mt-16 md:mt-0  ">
        <Link className=" hover:text-gray-900 " href={'/'}>Home</Link>
        <Link className=" hover:text-gray-900" href={'/menu'}>Menu</Link>
        <Link className=" hover:text-gray-900" href={'/#about'}>About</Link>
        <Link className=" hover:text-gray-900" href={'/feedback'}>Feedback</Link>
      </nav>
      <Cart />
      {
        token ?
          <div className="flex gap-2 absolute right-2 top-3 md:top-5 items-center">
            <Link href={'/profile'}><MdAccountCircle className="text-gray-500 text-3xl hover:text-gray-600" /></Link>
            <LogOut />
          </div>
          :
          < Link className="absolute right-2 top-3 md:top-4 bg-gray-500 border-0 text-white py-2 px-8 rounded-full hover:bg-gray-600 hover:shadow-md transition-colors" href={'/login'}>Login</Link>
      }
    </header>
  );
}