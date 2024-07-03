import React, { useRef, useState } from "react";
import { GoPaste } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Loader from "../../../public/assets/Loader.gif"
export const SmartLinkModal = ({
  closeModal,
  handleGenerateLink,
  userUrl,
  setUserUrl,
  urlTitle,
  setUrlTitle,
  warning,
  setWarning,
  loading
}) => {
  const modalRef = useRef();

  const handleClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };
  const handlePast = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUserUrl(text);
    } catch (error) {
      console.log("Faild to read clipboard content: ", error);
    }
  };
  const handleFocus = () =>{
    setWarning({
      url: "",
      title: ""
    })
  }
  return (
    <div
      ref={modalRef}
      onClick={handleClick}
      className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center"
    >
      <div className="md:w-[26rem] w-[95vw] bg-white rounded-lg drop-shadow-md flex flex-col gap-5 pb-6 ">
        <div className="flex flex-row  justify-between text-xl gap-5 px-8 py-4 border-b-[1px] border-gray-200">
          <h1 className="font-semibold">Create New Smart Link</h1>
          <button className=" opacity-20" onClick={closeModal}>
            <IoClose size={26} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 py-4">
          <div className="bg-gray-100 p-2 rounded-md flex justify-between flex-row items-center relative">
            <input
              className=" bg-transparent flex-1 outline-none text-base p-2"
              type="text"
              placeholder="Enter title"
              value={urlTitle}
              onChange={(e) => setUrlTitle(e.target.value)}
              onFocus={handleFocus}
            />
            {warning.title.length>0 && <div className="absolute text-red-400 text-sm font-semibold -top-5 right-0">*{warning.title}</div>}
          </div>
          <div className="bg-gray-100 p-2 rounded-md flex justify-between flex-row items-center relative">
            <input
              className=" bg-transparent flex-1 outline-none text-base p-2"
              type="text"
              placeholder="eg. www.google.com"
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              onFocus={handleFocus}
            />
            {warning.title.length>0 && <div className="absolute text-red-400 text-sm font-semibold -top-5 right-0">*{warning.url}</div>}
            <div
              onClick={handlePast}
              className="flex flex-row items-center gap-1 text-blue-500 p-2 cursor-pointer"
            >
              <GoPaste />
              <span
                className=" text-sm
            "
              >
                Paste
              </span>{" "}
            </div>
          </div>
          <button
            className="bg-blue-500 py-4 rounded-md font-semibold  text-white relative"
            onClick={handleGenerateLink}
          >
            {loading && <Image src={Loader} width={65} height={65} className="absolute left-3 top-0"/>}
            Generate Link
          </button>
        </div>
      </div>
    </div>
  );
};
