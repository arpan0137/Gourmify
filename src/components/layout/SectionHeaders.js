export default function SectionHeaders({ subHeader, mainHeader }) {
    return (
        <>
            <h2 className="text-primary font-bold italic text-4xl mt-3">{mainHeader}</h2>
            <h3 className="uppercase text-custom font-semibold">{subHeader}</h3>
        </>
    )
}
