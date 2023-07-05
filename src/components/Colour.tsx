import React from "react";
type props = {
  colour: string;
  colourName: string;
  isActive?: boolean;
  onClick?: () => void;
};

function Colour({ colour, colourName, isActive, onClick }: props) {
  return (
    <div onClick={onClick} className="h-[100%] w-[25%] flex flex-col justify-between items-center mr-2 cursor-pointer">
      <div
        style={{ backgroundColor: colour }}
        className={`h-[35px] ${
          isActive ? "border-[2px] border-[#0d0f8b]" : "border-[1px] border-black"
        } w-[35px] rounded-full `}
      ></div>
      <h1
        className={`${isActive ? "text-[#0d0f8b] font-extrabold" : "text-black font-normal"} text-[10px]`}
      >
        {colourName}
      </h1>
    </div>
  );
}

export default Colour;
