import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="px-6 pt-4 pb-10  bg-black flex flex-col gap-5 items-center justify-center ">
      <h1 className="text-blue-200 text-2xl font-semibold">Contact </h1>
      <ul className="flex flex-1  flex-row gap-6 text-white text-md justify-center flex-wrap">
        <li className="flex flex-row gap-1 items-center cursor-pointer">
          <FaWhatsapp className="text-green-300 text-2xl" />
          <a href="https://api.whatsapp.com/send?phone=919541930799&text=Hi,%20Mohit" target="blank">
          <span className=" border-b-[1px] border-black hover:border-green-300 
          ">
            Whatsapp
          </span>
          </a>
        </li>
        <li className="flex flex-row gap-1 items-center cursor-pointer ">
          
          <FaLinkedin className="text-blue-400 text-2xl" />
          <a href="https://www.linkedin.com/in/mohit-verma-231b66257/" target= "blank" >
          <span className=" border-b-[1px] border-black hover:border-blue-400">
            Linkedin
          </span>
          </a>
        </li>
        <li className="flex flex-row gap-1 items-center cursor-pointer">
          <FaGithub className="text-violet-400 text-2xl" />
          <a href="https://github.com/M0hitverma" target="blank">
          <spna className="border-b-[1px] border-black hover:border-violet-400">
            Github
          </spna>
          </a>
        </li>
        <li className="flex flex-row gap-1 items-center cursor-pointer">
          <FaInstagram className="text-red-300 text-2xl" />
          <a href="https://www.instagram.com/mr._mv_/" target="blank">
          <span className=" border-b-[1px] border-black hover:border-red-300">
            Instagram
          </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
