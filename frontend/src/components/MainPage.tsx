import { Link } from "react-router-dom";
import FlipCards from "./FlipCard";
import { RotatingTagline } from "./rotate";

export function MainPage({scrolltofeature}:any) {
  return (
    <div>
      <div className="grid grid-cols-10">
        
        <div className="col-span-2 lg:block hidden">
            <div className="flex items-center justify-center mt-15">
          <FlipCards back="whoops" back2="Flip 😅" content="Express Your thoughts freely." header="Write your ideas"/>
            </div>
          <div className="flex items-center justify-center mt-56 pl-10">
          <FlipCards back="whoops" back2="Flip 😅" content="Your words can make a difference" header="inspire others"/>
            </div>
        </div>

        <div className="col-span-10 lg:col-span-6">
            <div className="flex flex-col lg:mt-52 md:mt-36 mt-28 text-center items-center">
          <div>
            <RotatingTagline/>
            <p className="text-gray-800">Start writing and sharing your thoughts with the world. Blogging made</p>
            <p className="flex text-gray-800 justify-center">easy, expressive, and powerful.</p>
          </div>

          <div className="mt-4 flex  gap-6">
            <Link to={'/signup'}>
            <button className="cursor-pointer hover:scale-110 px-4 py-3 font-bold bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-xl">
              Start Writing
            </button>
            </Link>
            <button type="button" onClick={scrolltofeature} className="cursor-pointer hover:scale-110 px-4 py-3 font-bold bg-white border rounded-xl">
              Explore Blogs
            </button>
          </div>
          </div>
        </div>

        <div className="col-span-2 lg:block hidden">
          <div className="flex items-center justify-center mt-15  pr-10">
          <FlipCards back="whoops" back2="Flip 😅" content="Connect with like-minded people." header="Build Community"/>
            </div>
          <div className="flex items-center justify-center mt-56 ">
          <FlipCards back="whoops" back2="Flip 😅" content="Help others by sharing insights." header="Share your knowledge"/>
            </div>
        </div>
      </div>
    </div>
  );
}

