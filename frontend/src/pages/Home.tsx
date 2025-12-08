import { useRef } from "react";
import { Feature } from "../components/HomeFeature";
import { Footer } from "../components/Footer";
import { HomeAppBar } from "../components/HomeAppBar";
import { MainPage } from "../components/MainPage";
import { SmallCard } from "../components/SmallCaed";

export function Home(){
const scrollref = useRef<HTMLDivElement | null>(null);

function scrollToFeatureSection() {
  if (!scrollref.current) return;

  const yOffset = -80; 
  const y =
    scrollref.current.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

    return <div>
        <HomeAppBar/>
        <div className="mb-48">
            <MainPage scrolltofeature={scrollToFeatureSection} />
        </div>
        <div>
            <SmallCard bg="from-blue-950 to-blue-800 backdrop-blur-md text-white " content="Write blogs lets you share your thoughts, ideas, and experiences. Whether it's storytelling or informative contnet, your words have power:" header="Express Yourself" obj="Discover how blogging can:" point1="Boost your creativity and writing skills" point2="Establish your online presence" point3="Share your thoughts with the world"/>
            <SmallCard bg="from-indigo-950 to-indigo-800 backdrop-blur-md text-white" content="Your experience and skills can help other. Write blogs to educate, inspire, and make a difference" header="Share Your Knowledge" obj="Benefits of sharing knowledge:" point1="Inspire and educate others" point2="Build credibility in your field" point3="Leave a lasting impact"/>
            <SmallCard bg="from-teal-950 to-cyan-800 backdrop-blur-md text-white" content="Writing blogs regularly sharpens your writing, research, nd critical thinking skills" header="Improve Your Skills" obj="How blogging improves your skills:" point1="Enhances structured thinking" point2="Improves research and learning" point3="Develops better communication skills"/>
        </div>
        <div ref={scrollref}>
        <Feature/>
        </div>
        <Footer/>
    </div>
}