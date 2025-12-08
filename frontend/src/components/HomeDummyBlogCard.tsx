import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishDate: string;
  id?: string;
}

export function HomeDummyBlogCard({
  authorname,
  title,
  content,
  publishDate,
}: BlogCardProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  function likebuttn() {
    if (userLiked) {
      setLikes((c) => c - 1);
      setUserLiked(false);
    } else {
      setLikes((c) => c + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikes((c) => c - 1);
        setUserDisliked(false);
      }
    }
  }

  function dislikebuttn() {
    if (userDisliked) {
      setDislikes((c) => c - 1);
      setUserDisliked(false);
    } else {
      setDislikes((c) => c + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikes((c) => c - 1);
        setUserLiked(false);
      }
    }
  }

  const CardInner = () => (
    <>
      <div className="flex items-center gap-2">
        <Avatar height={9} name={authorname} size={30} />
        <p className="text-black text-sm">{authorname}</p>
        <div className="h-1 w-1 bg-gray-500 rounded-full" />
        <p className="text-gray-700 text-sm">{publishDate}</p>
      </div>

      <div className="mt-2">
        <p className="font-bold">{title}</p>
        <p className="text-slate-700 pt-1">
          {content.slice(0, 100) + "..."}
        </p>
      </div>

      <div className="flex mt-4 items-center justify-between">
        <div className="text-gray-500 text-sm">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>

        <div className="flex gap-4 md:gap-10 text-gray-600 pr-20">
          <button
            onClick={likebuttn}
            className={`${userLiked ? "text-blue-400" : ""} hover:text-blue-600 flex gap-2`}
          >
            <FaThumbsUp size={20} /> {likes}
          </button>

          <button
            onClick={dislikebuttn}
            className={`${userDisliked ? "text-red-600" : ""} hover:text-red-600 flex gap-2`}
          >
            <FaThumbsDown size={20} /> {dislikes}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <motion.div
        animate={{ y: ["20%", "-20%"] }} 
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          block md:hidden
          p-5 shadow-lg w-sm md:w-2xl m-4 bg-white rounded-xl cursor-pointer
          shadow-slate-900/30 transition-all duration-300 
          hover:scale-105 active:scale-95 
          hover:shadow-slate-500 active:shadow-indigo-500/45
        "
      >
        <CardInner />
      </motion.div>

      <motion.div
        animate={{ x: ["50%", "-80%"] }} 
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          hidden md:block
          p-5 shadow-lg w-sm md:w-2xl m-4 bg-white rounded-xl cursor-pointer
          shadow-slate-900/30 transition-all duration-300 
          hover:scale-105 active:scale-95 
          hover:shadow-slate-500 active:shadow-indigo-500/45
        "
      >
        <CardInner />
      </motion.div>
    </>
  );
}

export function Avatar({
  name,
  size = 30,
  height,
}: {
  name: string;
  size: number;
  height: number;
}) {
  return (
    <div
      className="cursor-pointer border-2 border-gray-500 bg-white text-black flex items-center justify-center rounded-full"
      style={{ width: size, height: size }}
    >
      <span
        style={{ fontSize: height }}
        className="font-medium flex items-center justify-center"
      >
        {name[0]}
      </span>
    </div>
  );
}
