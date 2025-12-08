import { useState } from "react";
import type { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { DeleteBlog } from "./DeleteBlog";

export function FullBlog({blog}:{blog:Blog}){
     const [likes, setLikes] = useState(0);
      const [dislikes, setDislikes] = useState(0);
    
      const [userLiked, setUserLiked] = useState(false);
      const [userDisliked, setUserDisliked] = useState(false);
    
      function likebuttn() {
        if (userLiked) {
          // undo like
          setLikes(likes - 1);
          setUserLiked(false);
        } else {
          // add like
          setLikes(likes + 1);
          setUserLiked(true);
    
          // remove dislike if active
          if (userDisliked) {
            setDislikes(dislikes - 1);
            setUserDisliked(false);
          }
        }
      }
    
      function dislikebuttn() {
        if (userDisliked) {
          // undo dislike
          setDislikes(dislikes - 1);
          setUserDisliked(false);
        } else {
          // add dislike
          setDislikes(dislikes + 1);
          setUserDisliked(true);
    
          // remove like if active
          if (userLiked) {
            setLikes(likes - 1);
            setUserLiked(false);
          }
        }
      }

    return <div className="flex justify-center mt-4">
     <div className="w-full max-w-6xl bg-slate-100 sm:p-3 lg:p-5 rounded-xl">
        <div className="grid md:grid-cols-12 w-full max-w-6xl p-5 rounded-xl bg-white border border-gray-200 ">
        <div className="col-span-9 ">
            <p className="text-2xl font-bold p-2 pb-1">{blog.title}</p>
            <p className="text-sm text-gray-500 p-2 pt-0">post on 4 december 2025 </p>
            <p className="text-md font-sans text-slate-600 p-2 pt-4 ">{blog.content}</p>
        </div>
        <div className="col-span-3 ">
            <div className="p-2 pl-10">Author</div>
            <div className="flex gap-2 pl-10 items-center pt-0 p-2">
            <Avatar name={blog.author.name || "Anonymous"} size={40}  />
            <p className="flex justify-center items-center">{blog.author.name}</p>
            </div>
        </div>
        <div className="flex gap-4 pt-10 pl-2  md:gap-10 text-gray-600 pr-20">
            <DeleteBlog authorId={blog.author.id} id={blog.id}/>
                  <button
                    onClick={likebuttn}
                    className={` ${
                      userLiked === true ? "text-blue-400" : ""
                    } hover:text-blue-600 flex gap-2 rounded-xl p-2 bg-gray-100 border border-gray-400`}
                  >
                    <FaThumbsUp size={20} /> {likes}
                  <span>Likes</span> </button>
        
                  <button
                    onClick={dislikebuttn}
                    className={` ${
                      userDisliked === true ? "text-red-600" : ""
                    } hover:text-red-600 flex gap-2 rounded-xl p-2 bg-gray-100 border border-gray-400`}
                  >
                    <FaThumbsDown size={20} /> {dislikes}
                 <span>Dislikes</span> </button>
                </div>
    </div>
</div>
    </div>
}