import toast from "react-hot-toast"

export default function InputImage({ itemImageLink, setItemImageLink }) {
    async function handleFileChange(e) {
        const files = e.target.files
        if (files?.length === 1) {
            const data = new FormData();
            data.set('file', files[0])
            console.log(data);
            const result = fetch('/api/admins/upload', {
                method: "POST",
                body: data,
            }).then(response => response.json())
            toast.promise(result, {
                loading: "Uploading...",
                success: "Upload Completed!!",
                error: "Error!!"
            })
            const link = await result
            setItemImageLink(link)
        }
    }

    return (
        <>
            {itemImageLink && (
                <picture>
                    <img className="rounded-lg h-40 w-40 object-contain" src={itemImageLink} alt={'avatar'} />
                </picture>
            )}
            {!itemImageLink && (
                <div className="flex items-center justify-center rounded-lg h-40 w-40 bg-gray-300 p-4 text-sm">
                    Choose Image
                </div>
            )}
            <label className="flex text-center">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <span className="mt-2 px-2 py-1 w-full text-white bg-gray-500 hover:bg-gray-600 outline-gray-700 border-2 hover:shadow-md rounded-lg text-md cursor-pointer"> Edit Image</span>
            </label >
        </>
    )
}