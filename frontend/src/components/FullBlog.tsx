import { useState, useEffect } from "react";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { DeleteBlog } from "./DeleteBlog";

export function FullBlog({ blog }: { blog: Blog }) {
  const id = blog.id;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  // Load localStorage data
  useEffect(() => {
    setLikes(Number(localStorage.getItem(`likes-${id}`)) || 0);
    setDislikes(Number(localStorage.getItem(`dislikes-${id}`)) || 0);
    setUserLiked(localStorage.getItem(`userLiked-${id}`) === "true");
    setUserDisliked(localStorage.getItem(`userDisliked-${id}`) === "true");
  }, [id]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`likes-${id}`, likes.toString());
    localStorage.setItem(`dislikes-${id}`, dislikes.toString());
    localStorage.setItem(`userLiked-${id}`, userLiked.toString());
    localStorage.setItem(`userDisliked-${id}`, userDisliked.toString());
  }, [likes, dislikes, userLiked, userDisliked, id]);

  function likebuttn() {
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

  function dislikebuttn() {
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
    <div className="flex justify-center mt-4">
      <div className="max-w-6xl bg-slate-100 p-5 rounded-xl">
        <div className="bg-white p-5 border rounded-xl grid md:grid-cols-12">

          {/* Content */}
          <div className="col-span-9">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-sm text-gray-500">Published on Dec 4, 2025</p>
            <p className="text-slate-600 mt-4">{blog.content}</p>
          </div>

          {/* Author */}
          <div className="col-span-3">
            <p className="p-2">Author</p>
            <div className="flex gap-2 items-center p-2">
              <Avatar name={blog.author.name} size={40} />
              <p>{blog.author.name}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-10 text-gray-600 p-2">
            <DeleteBlog authorId={blog.author.id} id={blog.id} />

            <button
              onClick={likebuttn}
              className={`${userLiked ? "text-blue-500" : ""} flex gap-2`}
            >
              <FaThumbsUp size={20} /> {likes} <span>Likes</span>
            </button>

            <button
              onClick={dislikebuttn}
              className={`${userDisliked ? "text-red-500" : ""} flex gap-2`}
            >
              <FaThumbsDown size={20} /> {dislikes} <span>Dislikes</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
