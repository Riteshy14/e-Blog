import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DeleteBlog } from "./DeleteBlog";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishDate: string;
  id: string;
  authorId: string;
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

  // Load from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes-${id}`);
    const savedDislikes = localStorage.getItem(`dislikes-${id}`);
    const savedUserLiked = localStorage.getItem(`userLiked-${id}`);
    const savedUserDisliked = localStorage.getItem(`userDisliked-${id}`);

    if (savedLikes) setLikes(Number(savedLikes));
    if (savedDislikes) setDislikes(Number(savedDislikes));
    if (savedUserLiked) setUserLiked(savedUserLiked === "true");
    if (savedUserDisliked) setUserDisliked(savedUserDisliked === "true");
  }, [id]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`likes-${id}`, likes.toString());
    localStorage.setItem(`dislikes-${id}`, dislikes.toString());
    localStorage.setItem(`userLiked-${id}`, userLiked.toString());
    localStorage.setItem(`userDisliked-${id}`, userDisliked.toString());
  }, [likes, dislikes, userLiked, userDisliked, id]);

  function likebuttn(e: React.MouseEvent) {
    e.preventDefault();
    if (userLiked) {
      setLikes(likes - 1);
      setUserLiked(false);
    } else {
      setLikes(likes + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikes(dislikes - 1);
        setUserDisliked(false);
      }
    }
  }

  function dislikebuttn(e: React.MouseEvent) {
    e.preventDefault();
    if (userDisliked) {
      setDislikes(dislikes - 1);
      setUserDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikes(likes - 1);
        setUserLiked(false);
      }
    }
  }

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-5 shadow-lg w-sm md:w-2xl m-4 bg-white rounded-xl cursor-pointer">

        <div className="flex items-center gap-2">
          <Avatar name={authorname} size={30} />
          <p className="text-sm">{authorname}</p>
          <p className="text-sm text-gray-600">{publishDate}</p>

          <div className="flex justify-center items-center ml-auto">
            <DeleteBlog authorId={authorId} id={id} />
          </div>
        </div>

        <div className="mt-2">
          <p className="font-bold">{title}</p>
          <p className="text-slate-700 pt-1">{content.slice(0, 100)}...</p>
        </div>

        <div className="flex mt-4 justify-between">
          <div className="text-sm text-gray-500">{`${Math.ceil(content.length / 100)} min read`}</div>

          <div className="flex gap-6 text-gray-600">

            <button
              onClick={likebuttn}
              className={`${userLiked ? "text-blue-500" : ""} flex gap-2`}
            >
              <FaThumbsUp size={20} /> {likes}
            </button>

            <button
              onClick={dislikebuttn}
              className={`${userDisliked ? "text-red-500" : ""} flex gap-2`}
            >
              <FaThumbsDown size={20} /> {dislikes}
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}

export function Avatar({
  name,
  size = 30,
  height
}: {
  name: string;
  size?: number;
  height?: number;
}) {
  return (
    <div
      className={`cursor-pointer bg-blue-500 shadow-sm shadow-gray-500 text-white flex items-center justify-center rounded-full`}
      style={{ width: size, height: size }}
    >
      <div
        className={`font-medium flex justify-center items-center`}
        style={{ fontSize: height }}
      >
        {name[0]}
      </div>
    </div>
  );
}
