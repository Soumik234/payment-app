import { useSearchParams } from "react-router-dom";

export const Appbar = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    return <div className="shadow-md shadow-gray-300 h-14 flex justify-between mb-5 border-solid border-black">
        <div className="flex flex-col justify-center h-full ml-2 text-2xl font-semibold ">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-2xl font-semibold">
                Hello, {name[0].toUpperCase() + name.slice(1)}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 text-4xl font-semibold">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0].toUpperCase()}
                </div>
            </div>
        </div>
    </div>
}