"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../Common/Button";
import { CheckAuth, logoutRequest } from "@/api/Authentication";
import eventEmitter from "@/lib/eventEmitter";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { toast } from "react-toastify";
import Image from "next/image";
import dp from "../../../public/assets/dp.jpg";

import "./Style.css";
const AuthOption = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoutHandler = async () => {
    const response = await logoutRequest();
    if (!response || !response.ok) {
      toast.error("Something went wrong! Try again later", { autoClose: 2000 });
      return;
    }
    toast.success(response.message, { autoClose: 2000 });
    eventEmitter.emit("logout");
    setAuthorized(false);
    setUser({});
  };
  const firstFetch = async () => {
    setLoading(true);
    const response = await CheckAuth();
    if (response?.ok) {
      setUser(response.data);
      setAuthorized(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    firstFetch();
  }, []);

  useEffect(() => {
    const handleLogin = (user) => {
      setAuthorized(true);
      setUser(user);
    };
    eventEmitter.on("login", handleLogin);
    return () => {
      eventEmitter.off("login", handleLogin);
    };
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <div className="md:block hidden">
            {!authorized ? (
              <div className="flex flex-row gap-3 ">
                <Button
                  handler={() => {
                    router.replace("/login");
                  }}
                  heading="Login"
                />
                <Button
                  handler={() => {
                    router.replace("/register");
                  }}
                  heading="Sign up"
                />
              </div>
            ) : (
              <div className="flex flex-row gap-3 items-center">
                <div className="profile w-11 h-11 rounded-full border-2 border-black relative">
                  <Image
                    src={dp}
                    className="h-[100%] w-[100%] rounded-full"
                    alt=""
                  />
                  <div className="showProfile bg-blue-100 border-2 border-blue-400 shadow-lg">
                    <h2 className="text-black font-semibold">
                      Hi! {user.name}
                    </h2>
                    <div className="flex flex-row gap-2 items-center">
                      <BsLightningChargeFill className="text-orange-400 size-4" />
                      <span>{user.links?.length}</span>
                    </div>
                  </div>
                </div>

                <Button handler={logoutHandler} heading="Log out" />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setShowMenu(!showMenu)}>
              <IoMdMenu className="text-3xl" />
            </button>
            {showMenu && (
              <div className="fixed bg-blue-100 rounded-tl-xl rounded-bl-xl right-0   z-50 ">
                {!authorized ? (
                  <div className=" grid grid-flow-row p-3 gap-3   font-semibold">
                    <button
                      className="py-2 px-5 border-2 border-blue-300 rounded-md text-blue-400 bg-white text-start flex flex-row items-center gap-1"
                      onClick={() => {
                        router.replace("/login");
                        setShowMenu(false);
                      }}
                    >
                      <LuLogIn />
                      Login
                    </button>
                    <button
                      className="py-2 px-5 border-2 rounded-md border-blue-300 text-blue-400 bg-white text-start flex flex-row items-center gap-1 "
                      onClick={() => {
                        router.replace("/register");
                        setShowMenu(false);
                      }}
                    >
                      <IoMdPerson />
                      Register
                    </button>
                  </div>
                ) : (
                  <div className=" grid grid-flow-row px-1 py-2   font-semibold">
                    <div className="py-2 px-5 text-start flex flex-row items-center gap-1">
                      <div className="w-11 h-11 rounded-full  mr-1">
                        <Image
                          src={dp}
                          className="h-[100%] w-[100%] rounded-full"
                          alt=""
                        />
                      </div>{" "}
                      <span>{user.name}</span>
                    </div>
                    <button
                      className="py-2 px-5 text-start flex flex-row items-center gap-1 text-blue-400 "
                      onClick={() => {
                        logoutHandler();
                        setShowMenu(false);
                      }}
                    >
                      <RiLogoutBoxLine />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthOption;
