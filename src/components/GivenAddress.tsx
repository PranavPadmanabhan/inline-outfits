/* eslint-disable @next/next/no-img-element */
import React from "react";

type props = {
  Delete?: string;
  AddressType: "Home" | "Office";
  Name: string;
  Locality: string;
  City: string;
  PinNumber: string;
  PhoneNumber: string;
  onDelete?:() => void;
  onClick?:() => void; 
  isSelected?:boolean
};

function GivenAddress({Delete,AddressType,Name,Locality,City,PinNumber,PhoneNumber,onClick,onDelete,isSelected}:props) {
  return (
    <div onClick={onClick} className={`relative h-[100%] max-w-[200px] w-[100%] flex flex-col ${isSelected ? "border-[2px] border-[#1a25be]" : "border-[1px] border-[#00000013]"} justify-start items-center  rounded-xl py-2 box-border`}>
      <img onClick={onDelete} className="absolute top-1 right-2 h-[22px] w-[22px] mt-3 ml-44" src={Delete} alt="" />
      <img className="h-[40px] w-[45px] mt-1" src={AddressType === "Home"?"/svg/home.svg":"/svg/office.svg"} alt="" />
      <h1 className="text-xs mt-4 text-black"> {Name}</h1>
      <h1 className="text-xs mt-1 text-black">{Locality} </h1>
      <h1 className="text-xs mt-1 text-black">{City} </h1>
      <h1 className="text-xs mt-1 text-black">{PinNumber} </h1>
      <h1 className="text-xs mt-1 text-black">{PhoneNumber} </h1>
    </div>
  );
}

export default GivenAddress;
