import React,{useState} from "react";
import "./CardStyle.css";
import { IoLink } from "react-icons/io5";
import { MdOutlineCopyAll } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import lineGraphIcon from "@/../public/assets/line-graph-icon3.png"
import Image from "next/image";
export const Card = ({ data, openModal}) => {
  const smartLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${data?.shortId}`;
  const slicedLink = smartLink.length > 35 ? smartLink.slice(0,35) + "..." : smartLink;
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      setCopied(true);
      await navigator.clipboard.writeText(smartLink);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
      toast.success("Copied!",{
        position: 'top-center',
        autoClose:2000,
        
      });
    } catch (error) {
      toast.error("Something went wrong! Try again later");
    }
  };
  const handleShowAnalytics = () =>{
    openModal();
  }
  return (
    <div className="card-container ">
      <div className="top">
        <div className="top-left">
          <div className="cursor-pointer " onClick={handleShowAnalytics}>
           <Image src={lineGraphIcon} alt="Analytics" height={34} width={34}/>
          </div>
          <div>
            <h1 className="">{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h1>
            <p className=" text-sm text-gray-400">
              {data.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
        <div className="top-right text-center">
          <p>{data?.visitedHistory?.length}</p>
          <p className=" text-sm text-gray-400">Clicks</p>
        </div>
      </div>

      <div className="bottom">
        <div className=" overflow-hidden whitespace-nowrap w-full truncate ">{smartLink}</div>
        <div className="copy shadow-md" onClick={handleCopy}>
          {copied ? (
            <IoCheckmarkDoneSharp className="text-xl" />
          ) : (
            <MdOutlineCopyAll />
          )}
        </div>
      </div>
    </div>
  );
};
