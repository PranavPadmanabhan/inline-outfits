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
          isActive ? "border-[2px] border-blue-500" : "border-[1px] border-black"
        } w-[35px] rounded-full `}
      ></div>
      <h1
        className={`${isActive ? "text-blue-500" : "text-black"} text-[10px]`}
      >
        {colourName}
      </h1>
    </div>
  );
}

export default Colour;
