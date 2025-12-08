import { useNavigate } from "react-router-dom";

export function Signout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("UserEmail");

    navigate("/signin");
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="w-full flex justify-center items-center cursor-pointer  bg-linear-to-tr from-red-600 to-blue-600 text-white font-bold py-2 px-2 pr-3 rounded-lg hover:bg-red-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          ></path>
        </svg>
        Logout
      </button>
    </div>
  );
}
