"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AuthSignUp } from "@/api/Authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../../public/assets/Loader.gif";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    if (user.email.length === 0) {
      setWarning((prev) => ({ ...prev, email: "Enter your email" }));
      valid = false;
    } else if (!emailRegex.test(user.email)) {
      setWarning((prev) => ({ ...prev, email: "Enter valid email address" }));
      valid = false;
    }

    if (user.password.length === 0) {
      setWarning((prev) => ({ ...prev, password: "Enter password" }));
      valid = false;
    } else if (user.password.length < 8) {
      setWarning((prev) => ({
        ...prev,
        password: "Password must be >= 8 characters",
      }));
      valid = false;
    }

    if (user.name.length === 0) {
      setWarning((prev) => ({ ...prev, name: "Enter you name" }));
    }

    return valid;
  };
  const handleFocus = () => {
    setWarning({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const response = await AuthSignUp(user);
    if (!response) {
      toast.error("Something went wrong! Try again Later", { autoClose: 2000 });
      setLoading(false);
      return;
    }
    if (response?.ok) {
      toast.success("Thanks for Registering!", { autoClose: 2000 });
      setLoading(false);
      setUser({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1000);

      return;
    }
    setError(response.message);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-200  relative  ">
      <Link href={"/"}>
        <div className="absolute top-4 left-4 flex flex-row items-center text-white font-semibold  cursor-pointer hover:text-gray-200 ">
          {" "}
          <IoIosArrowBack size={30} /> Home
        </div>
      </Link>
      <div className=" md:w-[32rem] sm:w-[90%] w-[93%]  shadow-lg  flex flex-col   bg-white  sm:p-10 p-4 rounded-xl  ">
        <h1 className="text-center text-2xl font-semibold">Register</h1>
        <div className="text-center text-sm text-gray-400 mt-2 mb-10 font-medium">
          <span className="font-sm ">
            Join us today by filling out the form below.
          </span>
        </div>
        <form className="flex flex-col gap-5 px-2" onSubmit={handleSignUp}>
          <div className="flex flex-col  flex-1 relative ">
            <label className=" pl-3 text-sm font-semibold">
              Name <b className="text-red-600">*</b>
            </label>
            <input
              id="name"
              maxLength={20}
              name="name"
              placeholder="Enter your Name"
              value={user.name}
              onChange={handleOnChange}
              className="flex-1 text-sm border border-gray-300 focus:outline-none focus:border focus:border-gray-400 p-3 rounded-xl "
              onFocus={handleFocus}
            />
            {warning.name.length > 0 && (
              <p className="text-red-400 bg-white p-1 rounded-md  font-semibold  text-xs  absolute -bottom-4">
                *{warning.name}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-1 relative">
            <label className="pl-3 text-sm font-semibold">
              Email <b className="text-red-600">*</b>
            </label>
            <input
              id="email"
              name="email"
              maxLength={254}
              placeholder="Enter your Email"
              value={user.email}
              onChange={handleOnChange}
              className="flex-1 text-sm border border-gray-300 focus:outline-none focus:border focus:border-gray-400 p-3 rounded-xl"
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
              type={`${showPassword ? "text" : "password"}`}
              maxLength={15}
              placeholder="Enter Password"
              value={user.password}
              onChange={handleOnChange}
              className="flex-1 text-sm border border-gray-300 focus:outline-none focus:border focus:border-gray-400 p-3 rounded-xl"
              onFocus={handleFocus}
            />
            <div className="absolute right-4 top-[50%] cursor-pointer"
            onClick={()=>setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            {warning.password.length > 0 && (
              <p className="text-red-400 bg-white p-1 rounded-md  font-semibold  text-xs  absolute -bottom-4">
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
              className="bg-indigo-400 text-white w-[70%] mt-7 py-3 rounded-md  font-xl font-semibold relative"
            >
              {loading && (
                <Image
                  src={Loader}
                  width={65}
                  height={65}
                  className="absolute left-3 top-0"
                />
              )}
              Sign up
            </button>
          </div>
        </form>
        <div className="m-auto text-sm text-gray-500 mt-7 mb-10 font-medium">
          <span className="font-sm ">Already have an Account? </span>
          <Link
            href="/login"
            className="text-blue-400  border-b-[1px] border-blue-400 hover:text-blue-500 px-1"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
