import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import './ButtonStyle.css'
const Button = ({ heading, handler }) => {
  return (
    <div>
      <button  className="btnStyle px-3 py-2 bg-blue-400  w-32 rounded-lg text-white font-semibold  relative overflow-hidden" onClick={handler}>
        {heading}
        <div className="arrow"><IoIosArrowRoundForward /></div>
        </button>
    </div>
  );
};

export default Button;
