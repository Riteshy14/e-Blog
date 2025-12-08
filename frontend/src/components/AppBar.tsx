import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function AppBar() {
  // user info from localStorage
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="shadow-md shadow-gray-200 p-3 mb-4">
      <div className="flex justify-between items-center">
        {/* Left Section - App Logo */}
        <div className="flex items-center pl-5">
          <p className="font-bold text-blue-500 text-2xl flex justify-center items-center cursor-pointer">
            <Link to={"/"}>
              <span className="text-violet-700">e-</span>Blog
            </Link>
          </p>
        </div>
        <div className="ml-20">
          <Link to={"/blogs"}>
            <button className="w-full hidden  sm:flex justify-center items-center cursor-pointer  bg-linear-to-tr from-red-600 to-blue-600 text-white font-bold py-2 px-7 rounded-lg hover:bg-red-700 transition">
              Home
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex gap-2 justify-center items-center">
          {/* Create Blog Button */}
          <Link to="/publish">
            <button
              type="button"
              className=" shadow-sm text-white flex justify-center items-center gap-1 py-2  border-black hover:scal shadow-gray-300 hover:shadow-md cursor-pointer  font-bold bg-linear-to-r from-cyan-500 to-blue-500 px-3 rounded-sm"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Create Blog
            </button>
          </Link>

          {/* User Avatar */}
          <Link to={"/profile"}>
            <div className=" ml-7 mr-2">
              <Avatar name={userName} size={39} height={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
