import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

export function DeleteBlog({ id, authorId }:{id:string ,authorId:string}) {
  const loggedInUser = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);


  console.log(loggedInUser,"userid");
  

  // Only show delete button if this user created the post
  if (loggedInUser !== authorId) {
    return null;
  }

  async function deleteBlog(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    console.log(token,"token");

    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error in database server");
    } finally{
      setLoading(false)
    }
  }

  return (
    <button
      onClick={deleteBlog}
      className="text-white p-2 border bg-red-500 hover:bg-red-700 rounded-2xl flex justify-center items-center px-4  hover:text-white font-bold"
    >
     {loading ? (
        <span className="animate-pulse">Deleting...</span> // Optional: You can use any spinner here
      ):("Delete") } 
    </button>
  );
}
