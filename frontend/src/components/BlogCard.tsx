import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DeleteBlog } from "./DeleteBlog";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishDate: string;
  id:string;
  authorId:string
}

export function BlogCard({
  authorname,
  title,
  content,
  publishDate,
  id,
  authorId
}: BlogCardProps) {
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

  return (
    <Link to={`/blog/${id}`}>
    <div className="p-5 shadow-lg w-sm md:w-2xl m-4 shadow-slate-900/30 transition-all duration-300  hover:scale-105 active:scale-95 hover:shadow-slate-500 active:shadow-indigo-500/45  bg-white  rounded-xl cursor-pointer">
      <div className="flex items-center gap-2 ">
        <Avatar name={authorname} size={30}/>
        <p className="text-black text-sm items-center">{authorname}</p>
        <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
        <div className="flex">
        <p className="text-gray-700 text-sm">{publishDate}</p>
        </div>
        <div className="flex justify-center items-center pl-12 md:pl-96">
           <DeleteBlog authorId={authorId} id={id}/>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-bold">{title}</p>
        <p className="text-slate-700 pt-1">{content.slice(0, 100) + "..."}</p>
      </div>
      <div className="flex mt-4 items-center justify-between">
        <div className="text-gray-500 text-sm">{`${Math.ceil(content.length / 100)} min read`}</div>
        <div className="flex gap-4 md:gap-10 text-gray-600 pr-20">
          <button
            onClick={likebuttn}
            className={` ${
              userLiked === true ? "text-blue-400" : ""
            } hover:text-blue-600 flex gap-2`}
          >
            <FaThumbsUp size={20} /> {likes}
          </button>

          <button
            onClick={dislikebuttn}
            className={` ${
              userDisliked === true ? "text-red-600" : ""
            } hover:text-red-600 flex gap-2`}
          >
            <FaThumbsDown size={20} /> {dislikes}
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}

export function Avatar({name,size=30,height} : { name : string, size?:number, height?:number}) {
  return (
    <div className={` cursor-pointer bg-blue-500 shadow-sm shadow-gray-500 text-white flex items-center justify-center bg-neutral-tertiary rounded-full`} style={{width:size,height:size}}>
      <div className={`font-medium flex justify-center items-center `} style={{fontSize:height}}>{name[0]}</div>
    </div>
  );
}
