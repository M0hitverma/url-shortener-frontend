"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthSignIn } from "@/api/Authentication";
import { toast } from "react-toastify";
import Loader from "../../../public/assets/Loader.gif"
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import eventEmitter from "@/lib/eventEmitter";
const Login = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleFocus = () => {
    setWarning({
      email: "",
      password: "",
    });
  };
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    if (info.email.length === 0) {
      setWarning((prev) => ({ ...prev, email: "Enter your email" }));
      valid = false;
    } else if (!emailRegex.test(info.email)) {
      setWarning((prev) => ({ ...prev, email: "Enter valid email address" }));
      valid = false;
    }

    if (info.password.length === 0) {
      setWarning((prev) => ({ ...prev, password: "Enter password" }));
      valid = false;
    } else if (info.password.length < 8) {
      setWarning((prev) => ({
        ...prev,
        password: "Password must be >= 8 characters",
      }));
      valid = false;
    }

    return valid;
  };
  
  const handleSignIn = async (e) => {

    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const response = await AuthSignIn(info);
    if (!response) {
      toast.error("Something went wrong! Try again Later",{autoClose:2000});
      setLoading(false);
      return;
    }
    if (response?.ok) {
      toast.success("Successfully Logged in!",{autoClose:2000});
      setLoading(false);
      localStorage.setItem("UserData",JSON.stringify(response.user));
      eventEmitter.emit('login',response.user);
      setInfo({
        email: "",
        password: "",
      });
 
       setTimeout(() => {
        router.replace("/");
       }, 2000);

      return 
    }
    setError(response.message);
    setLoading(false);
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-200  relative  ">
      <Link href={'/'}>
      <div className="absolute top-4 left-4 flex flex-row items-center text-white font-semibold  cursor-pointer hover:text-gray-200 "> <IoIosArrowBack size={30} /> Home</div>
      </Link>
      <div className=" md:w-[32rem] sm:w-[90%] w-[93%]  shadow-lg  flex flex-col   bg-white  sm:p-10 p-4 rounded-xl  ">
        <h1 className="text-center text-2xl font-semibold">Welcome Back</h1>
        <div className="text-center text-sm text-gray-400 mt-2 mb-10 font-medium">
          <span className="font-sm ">
            We’re glad to see you again! Enter your details below.
          </span>
        </div>
        <form className="flex flex-col gap-5 px-2" onSubmit={handleSignIn}>
          <div className="flex flex-col  flex-1 relative ">
            <label className=" pl-3 text-sm font-semibold">
              Email <b className="text-red-600">*</b>
            </label>
            <input
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={info.email}
              onChange={handleOnChange}
              className="flex-1 text-sm border border-gray-300 focus:outline-none focus:border focus:border-gray-400 p-3 rounded-xl "
              onFocus={handleFocus}
            />
            {warning.email.length > 0 && (
              <p className="text-red-400 bg-white p-1 rounded-md  font-semibold  text-xs  absolute -bottom-4">
                *{warning.email}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-1 relative">
            <label className="pl-3 text-sm font-semibold">
              Password <b className="text-red-600">*</b>
            </label>
            <input
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={info.password}
              onChange={handleOnChange}
              className="flex-1 text-sm border border-gray-300 focus:outline-none focus:border focus:border-gray-400 p-3 rounded-xl"
              onFocus={handleFocus}
            />
            {warning.password.length > 0 && (
              <p className="text-red-400 font-semibold bg-white  p-1 text-xs absolute -bottom-4">
                *{warning.password}
              </p>
            )}
          </div>

          <div className="relative flex items-center justify-center ">
            {error.length > 0 && (
              <p className="text-sm absolute top-0 left-0 text-red-400 font-semibold ">
                *{error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-400 text-white w-[70%] mt-7   py-3 rounded-md  font-xl font-semibold relative"
            >
              {loading && <Image src={Loader} width={65} height={65} className="absolute left-3 top-0"/>}
              Sign in
            </button>
          </div>
        </form>
        <div className="m-auto text-sm text-gray-500 mt-7 mb-10 font-medium">
          <span className="font-sm ">Don&apos;t have an account? </span>
          <Link
            href="/register"
            className="text-blue-400  hover:text-blue-500 px-1"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
