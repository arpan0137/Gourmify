"use client"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LogOut() {
    const router = useRouter()
    const handleLogOut = async () => {
        try {
            let data = await fetch("/api/users/logout")
            data = await data.json()
            console.log(data)
            if (data.success) {
                toast.success(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setTimeout(() => {
                router.refresh()
                router.push('/login')
            })
        }
    }

    return (
        <>
            <button className=" bg-gray-500  hover:bg-gray-600 transition-colors text-white px-3 py-1 text-md rounded-full hover:shadow-md" onClick={handleLogOut}>Log Out</button>
            <Toaster />
        </>
    )
}