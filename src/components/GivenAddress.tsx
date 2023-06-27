import React from "react";

type props = {
  Delete?: string;
  AddressType: string;
  Name: string;
  Locality: string;
  City: string;
  PinNumber: number;
  PhoneNumber: number;
};

function GivenAddress({Delete,AddressType,Name,Locality,City,PinNumber,PhoneNumber}:props) {
  return (
    <div className="h-[100%] w-[40%] flex flex-col justify-start items-center border-[1px] border-[#00000013] rounded-xl py-2 box-border">
      <img className="h-[22px] w-[22px] mt-3 ml-44" src={Delete} alt="" />
      <img className="h-[40px] w-[45px] mt-1" src={AddressType} alt="" />
      <h1 className="text-xs mt-4 "> {Name}</h1>
      <h1 className="text-xs mt-1 ">{Locality} </h1>
      <h1 className="text-xs mt-1 ">{City} </h1>
      <h1 className="text-xs mt-1 ">{PinNumber} </h1>
      <h1 className="text-xs mt-1 ">{PhoneNumber} </h1>
    </div>
  );
}

export default GivenAddress;
