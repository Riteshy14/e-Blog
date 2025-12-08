import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  console.log("this is single blog", blog);

  if (loading) {
    return (
      <div>
        <AppBar/>
        <p className="flex text-2xl text-gray-600 justify-center p-2 m-2 font-bold">
          server db issue if it not load refresh in atleast 10-15 sec and wait{" "}
        </p>
        <div className="flex justify-center mt-20">
          <BlogSkeleton />
        </div>
        ;
      </div>
    );
  }

  return (
    <>
      <AppBar />
      <div>{blog ? <FullBlog blog={blog} /> : <div>Blog Not Found</div>}</div>
    </>
  );
}
