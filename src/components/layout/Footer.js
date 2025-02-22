import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer text-gray-500 body-font" >
            <div className="container px-5 pt-4 pb-2 mx-auto flex items-center sm:flex-row flex-col">
                <Link className=" flex items-center md:justify-start justify-center font-semibold text-2xl" href="/">GOURMIFY</Link>
                <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 All Rights Reserved — @gourmify
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a>
                        <FaFacebook className="w-5 h-5" />
                    </a>
                    <a className="ml-3">
                        <FaXTwitter className="w-5 h-5" />
                    </a>
                    <a className="ml-3">
                        <FaInstagramSquare className="w-5 h-5" />
                    </a>
                    <a className="ml-3">
                        <FaLinkedin className="w-5 h-5" />
                    </a>
                </span>
            </div>
        </footer>
    )
}