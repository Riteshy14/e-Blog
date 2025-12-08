import { Link } from "react-router-dom";

export function HomeAppBar(){
    return <div className="sticky top-0 z-10">
        <div className="shadow-md shadow-gray-200 p-3 mb-4">
        <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center items-center pl-5">
                <p className="font-bold text-blue-500 text-2xl flex justify-center items-center cursor-pointer"><Link to={'/'}><span className="text-violet-700">e-</span>Blog</Link></p>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <div className="pr-5">
                    <Link to={'/signup'}>
                        <button className=" shadow-sm text-white  border-black hover:scal shadow-gray-300 hover:shadow-md cursor-pointer  font-bold bg-linear-to-r from-cyan-500 to-blue-500 px-3 p-1 rounded-sm">Signup</button>
                    </Link>
                </div>
            </div>
        </div>

    </div>
    </div>
}