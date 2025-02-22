import './style.css'
import { MdOutlineMailOutline } from "react-icons/md";
export default function forgotPassword() {
    return (
        <div className="flex max-h-100vh max-w-100vw items-center justify-center text-white my-5">
            <div className="flex items-center justify-center rounded-lg w-96 h-2/4 px-[30px] py-[40px]  wrapper">
                <form action="" className="items-center w-full h-full" >
                    <h1 className=" text-4xl font-semibold text-center">Forgot Password</h1>
                    <div className="flex items-center relative  my-[30px] h-[50px] w-full">
                        <input type="email" className="inputFieldLogin" placeholder="Email" required />
                        <MdOutlineMailOutline className="absolute h-6 w-6 right-[20px] fill-white" />

                    </div>
                    <button className="flex items-center justify-center my-5 p-5 rounded-full bg-primary text-white text-lg font-medium  h-[50px] w-full">Continue</button>
                </form>
            </div>
        </div>
    )
}