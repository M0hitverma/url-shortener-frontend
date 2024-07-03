import React, { useRef, useState } from "react";
import { IoLink } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
export const ShowUrlModal = ({ closeModal, userUrl, smartUrl, urlTitle }) => {
  const modalRef = useRef();
  const [copied, setCopied] = useState(false);
  const handleClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };
  const handleShare = () => {
    const WHATSAPP_URL = "https://wa.me/";
    const whatsappEncodeMessage = `Check out this URL: ${smartUrl}`;
    const shareUrl =
      WHATSAPP_URL + `?text=${encodeURIComponent(whatsappEncodeMessage)}`;
    window.open(shareUrl, "_blank");
  };

  const handleCopy = async () => {
    try {
      setCopied(true);
      await navigator.clipboard.writeText(smartUrl);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
      toast.success("Copied!");
    } catch (error) {
      toast.error("Something went wrong! Try again later");
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={handleClick}
      className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center "
    >
      <div className="md:w-[26rem] w-[95vw] bg-white rounded-lg drop-shadow-md flex flex-col gap-5 pb-6 ">
        <div className="flex flex-row  justify-between text-xl gap-5 px-8 py-4 border-b-[1px] border-gray-200">
          <h1 className="font-semibold">Your Smart Link</h1>
          <button className=" opacity-20" onClick={closeModal}>
            <IoClose size={26} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 py-4">
          <div className="flex flex-row gap-4">
            <div className="bg-violet-200 flex items-center justify-center w-[3rem] h-[3rem] text-violet-500 rounded-md">
              <IoLink className=" -rotate-45 text-xl " />
            </div>
            <div>
              <h1 className=" font-medium">{urlTitle}</h1>
              <p className=" text-sm text-gray-400">{userUrl}</p>
            </div>
          </div>

          <div className=" bg-blue-100 bg-opacity-80  outline-dashed outline-1  p-4 rounded-md flex justify-between flex-row items-center text-blue-500 text-sm ">
            {smartUrl}
          </div>
          <div className="flex flex-row gap-5 justify-center items-center ">
            <button
              className="bg-white py-4 px-5  flex-1 flex flex-row gap-1 items-center justify-center rounded-lg font-semibold  text-black border-[1px]  border-gray-300"
              onClick={handleShare}
            >
              <LuShare2 />
              <span>Share</span>
            </button>
            <button
              className="bg-blue-500 py-4 px-5 flex-1 flex flex-row items-center justify-center rounded-lg font-semibold  text-white"
              onClick={handleCopy}
            >
              {copied ? (
                <IoCheckmarkDoneSharp className="text-xl" />
              ) : (
                <div className="flex flex-row gap-1 items-center justify-center">
                  <FaRegCopy />
                  <span>Copy</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
