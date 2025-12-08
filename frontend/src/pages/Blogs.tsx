import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export function Blogs() {
  const { blogs, loading } = useBlogs();

    const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <div>
        <AppBar />
        <p className="flex text-2xl text-gray-600 justify-center p-2 m-2 font-bold">
          server db issue if it not load refresh in atleast 10-15 sec and wait{" "}
        </p>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="w-max p-3 rounded-xl bg-gray-200">
          {blogs.length === 0 ? (
            <p className="text-center text-xl text-gray-600 font-semibold p-4">0 blogs are there upload blog</p>
          ) : (blogs.map((blog) => (
            <BlogCard
              authorname={blog.author.name || "Anonymous"}
              content={blog.content}
              publishDate={today}
              title={blog.title}
              id={blog.id}
              authorId={blog.author.id}
            />
          )))}
        </div>
      </div>
    </div>
  );
}
