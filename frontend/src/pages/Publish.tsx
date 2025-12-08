import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Publish(){
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
    const [title, setTitle] = useState<string>();
    const [content, setcontent] = useState<string>();
    const [isClicked, setIsClicked] = useState(false); 

    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const responde = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
            },{
                headers:{
                Authorization:localStorage.getItem("token")
           }
            })
               navigate(`/blog/${responde.data.id}`)
        } catch (error:any) {
                  const msg = error.response?.data?.msg ||
                    error.response?.data?.message ||
                         "Something went wrong";
                          alert(msg)
            }
        }

        const handleButtonClick = ()=>{
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 200); 
            sendRequest();
        }

    return <div>
        <AppBar/>
        <div className="flex justify-center mt-7">
            <div className="shadow-gray-500 shadow-sm p-6 rounded">
            <div className="bg-slate-100 shadow-sm shadow-slate-400 p-4 rounded-xl">
                <div className="flex flex-col mb-7">
                    <p className="flex justify-center text-3xl font-bold text-gray-700 ">Publish Blog</p>
                    <p className="flex justify-center text-sm text-gray-700">Share your insight, news, or stories with our community.</p>
                </div>
                <div className="m-2">
                <input onChange={(e)=> {setTitle(e.target.value)} } type="text"className="bg-white w-xl rounded border border-success-subtle text-fg-success-strong text-sm rounded-base focus:ring-success focus:border-success block  px-3 py-2.5 shadow-xs placeholder:text-fg-success-strong" placeholder="Enter blog title..."></input>
                </div>
                <div className="m-2">
                  <textarea onChange={(e)=>{setcontent(e.target.value)}} rows={10}  className="rounded mt-6 bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3 shadow-xs placeholder:text-body" placeholder="Write an article..."></textarea>
                </div>
                <div className="mt-5 m-2 flex justify-center items-center">
                    <button onClick={handleButtonClick} type="submit" className={`cursor-pointer text-black font-bold w-xl flex gap-2 justify-center items-center bg-linear-to-r from-cyan-500 to-blue-400 rounded-xl border border-transparent focus:ring-1 focus:ring-brand-medium shadow-xs  leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none
                    ${isClicked ? "scale-95 opacity-80" : "hover:scale-105"} 
                       transition-all duration-150 ease-in-out`}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l18-9-9 18-2.5-6.5L3 12z"></path></svg> Publish</button>
                </div>
            </div>
             </div>
        </div>
    </div>
}

