/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ImSpinner4 } from "react-icons/im";

type props = {
  Delete?: string;
  AddressType: "Home" | "Office";
  Name: string;
  Locality: string;
  City: string;
  PinNumber: string;
  PhoneNumber: string;
  onClick?: () => void;
  isSelected?: boolean;
  user: any;
  id: string;
  get?:() =>void
};

function GivenAddress({
  Delete,
  AddressType,
  Name,
  Locality,
  City,
  PinNumber,
  PhoneNumber,
  onClick,
  isSelected,
  user,
  id,
  get
}: props) {
  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteAddress = async () => {
    try {
      setDeleting(true);
      const addresses = user.addresses.filter((item: any) => item._id !== id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${user?.phone}`,
        {
          method: "put",
          body: JSON.stringify({
            addresses: addresses,
          }),
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setDeleting(false);
        get?.()
      }
      setDeleting(false);
    } catch (error) {}
  };

  return (
    <div
      onClick={onClick}
      className={`relative h-[100%] min-w-[180px] max-w-[200px] w-[100%] flex flex-col ${
        isSelected
          ? "border-[2px] border-[#b11818d3]"
          : "border-[1px] border-[#00000013]"
      } justify-start items-center  rounded-xl py-2 box-border cursor-pointer `}
    >
      {deleting ? (
        <ImSpinner4 color="black" size={22} className="animate-rotate absolute top-1 right-2" />
      ) : (
        <img
          onClick={deleteAddress}
          className="absolute top-1 right-2 h-[22px] w-[22px] mt-3 ml-44"
          src={Delete}
          alt=""
        />
      )}
      <img
        className="h-[40px] w-[45px] mt-1"
        src={AddressType === "Home" ? "/svg/home.svg" : "/svg/office.svg"}
        alt=""
      />
      <h1 className="text-xs mt-4 text-black"> {Name}</h1>
      <h1 className="text-xs mt-1 text-black">{Locality} </h1>
      <h1 className="text-xs mt-1 text-black">{City} </h1>
      <h1 className="text-xs mt-1 text-black">{PinNumber} </h1>
      <h1 className="text-xs mt-1 text-black">{PhoneNumber} </h1>
    </div>
  );
}

export default GivenAddress;
