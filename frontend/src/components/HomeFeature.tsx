import { Link } from "react-router-dom";
import { HomeDummyBlogCard } from "./HomeDummyBlogCard";

export function Feature() {
  const blogs = [
    {
      id: "1",
      title: "Understanding React Hooks",
      authorname: "Jane Doe",
      content: "A deep dive into React Hooks and their use cases...",
      publishDate: "2025-12-01",
    },
    {
      id: "2",
      title: "CSS Grid for Beginners",
      authorname: "John Smith",
      content:
        "Learn how to master CSS Grid with these easy-to-follow examples...",
      publishDate: "2025-11-15",
    },
    {
      id: "3",
      title: "Next.js: The Fullstack Framework",
      authorname: "Alice Johnson",
      content:
        "Explore why Next.js is one of the most popular frameworks for full-stack React development...",
      publishDate: "2025-10-30",
    },
  ];

  return (
    <div className="bg-slate-100 ">
      <div className="flex justify-center p-2">
        {/* group wrapper so hover affects underline */}
        <div className="inline-flex flex-col items-center group">
          <h2 className="text-3xl font-semibold text-cyan-500">
            Feature Blogs
          </h2>
          <div className="mt-1 h-1 w-10 bg-cyan-300 transition-all duration-300 group-hover:w-28" />
        </div>
      </div>

      <div className="flex justify-center ">
      <div className="mt-4 flex flex-col md:flex-row justify-center gap-4 mb-10 overflow-hidden">
        {blogs.map((blog) => (
          <HomeDummyBlogCard
            key={blog.id}
            authorname={blog.authorname}
            content={blog.content}
            id={blog.id}
            publishDate={blog.publishDate}
            title={blog.title}
          />
        ))}
        <div
          className="
        p-5 shadow-lg w-sm md:w-2xl m-4 bg-white rounded-xl cursor-pointer
        shadow-slate-900/30 transition-all duration-300 
        hover:scale-105 active:scale-95 
        hover:shadow-slate-500 active:shadow-indigo-500/45 hidden lg:block
      "
        >
          <h2 className="text-xl font-bold text-black">
            Sign up to explore more blogs
          </h2>

          <p className="text-gray-600 mt-2 hidden xl:block">
            Create your free account to unlock premium articles and features.
          </p>
          <Link to={'/signup'}>
          <button
            className="
        xl:mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg
        hover:bg-indigo-700 transition-all cursor-pointer lg:mt-20 xl:ml-0 font-bold
      " 
          >
            Sign Up
          </button>
          </Link>
        </div>
      </div>
      </div>
        <div className="flex justify-center pb-5 ">
            <Link to={'/signup'}>
            <button className=" cursor-pointer text-white hover:scale-110 px-5 py-3 font-bold bg-linear-to-r from-cyan-500 to-blue-500 border rounded-3xl">
              Explore More
            </button>
            </Link>
        </div>
    </div>
  );
}
