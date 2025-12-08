import { type SignupInput } from "@riteshy14/medium-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    password: "",
    email: "",
  });

  const [isClicked, setIsClicked] = useState(false); 

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("UserEmail", user.email);

      navigate("/blogs");
    } catch (error:any ) {
      const msg = error.response?.data?.msg ||
      error.response?.data?.message ||
      "Something went wrong";

      alert(msg)
    }
  }

  const handleButtonClick = () => {
    setIsClicked(true); 
    setTimeout(() => setIsClicked(false), 200); 
    sendRequest(); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="m-6 px-10">
        <div className="px-10 mb-7">
          <p className="flex justify-center text-black font-extrabold text-xl sm:text-4xl p-2">
            Create an account
          </p>
          <p className="text-slate-500 flex justify-center">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account"}{" "}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="underline cursor-pointer pl-2 hover:text-black"
            >
              {type === "signup" ? "sign in" : "Sign up"}
            </Link>
          </p>
        </div>
        <div>
          {type === "signup" && (
            <LabelInput
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs((c: SignupInput) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          )}

          <LabelInput
            label="Email"
            placeholder="x@exmaple.com"
            onChange={(e) => {
              setPostInputs((c: SignupInput) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />

          <LabelInput
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setPostInputs((c: SignupInput) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />

          <button
            onClick={handleButtonClick}
            type="button"
            className={`cursor-pointer w-full text-white bg-black border border-default rounded-md text-sm px-4 py-2.5 focus:outline-none 
              ${isClicked ? "scale-95 opacity-80" : "hover:scale-105"} 
              transition-all duration-150 ease-in-out`}
          >
            {type === "signup" ? "sign up" : "sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface LabelInpuType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelInpuType) {
  return (
    <div>
      <label className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        className="mb-2.5 bg-slate-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
      />
    </div>
  );
}
