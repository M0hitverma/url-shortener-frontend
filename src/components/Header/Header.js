import React from "react";
import { PiLinkBreakBold } from "react-icons/pi";
import AuthOption from "./AuthOption";

export const Header = () => {
  
  return (
    <div className="w-full px-6 py-4 bg-white border-b border-gray-200 backdrop-blur-sm sticky top-0  flex flex-row items-center justify-between z-50">
      <div className="flex flex-row gap-3 items-center text-xl font-semibold">
      <PiLinkBreakBold className="text-4xl text-blue-400" />
      <h1>
        URL <span className="text-blue-600">Sh</span>ortner
      </h1>
      </div>
      <div>

        <AuthOption/>

      </div>
    </div>
  );
};
