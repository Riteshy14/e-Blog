import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"
import { Signout } from "./Signout";

export function Profile() {
    const username = localStorage.getItem("userName");
    const email = localStorage.getItem("UserEmail");

    return (
        <div>
            <AppBar />

            <div className="mt-4 flex justify-center items-center">
                <div className="w-2xl bg-slate-200 shadow-sm shadow-gray-400 rounded-xl flex justify-center items-center p-4">
                    <div className="bg-slate-50 rounded-2xl shadow-sm shadow-gray-400 w-full flex flex-col p-2">

                        <h3 className="flex justify-start font-bold text-2xl text-gray-600">User Profile</h3>

                        <div className="flex pt-10 pb-7 flex-col justify-center items-center">
                            <Avatar name={username ?? "User"} height={30} size={50} />
                            <p className="pt-2 text-xl font-bold text-gray-700">{username}</p>
                        </div>

                        <p className="text-xl text-blue-500 font-semibold">
                            Email: <span className="font-normal text-gray-700 text-lg">{email}</span>
                        </p>

                        {/* Logout Button */}
                        <div className="pt-5 pb-2">
                            <Signout/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
