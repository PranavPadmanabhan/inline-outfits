/* eslint-disable @next/next/no-img-element */
import React from "react";

function Footer() {
  return (
    <div className="h-[30vh] w-[100%] flex items-center justify-between px-10 box-border text-white bg-black bottom-0 relative">
      <div className="min-h-[50px] w-[12%] ml-10">
        {" "}
        <img className="h-[80%] w-[80%]" src="/svg/In&O.svg" alt="" />
      </div>{" "}
      <div className="h-[80%] w-[25%] grid grid-cols-2 gap-2">
        <h1 className="text-sm font-medium ">Home</h1>
        <h1 className="text-sm font-medium ">Instagrm</h1>
        <h1 className="text-sm font-medium ">Shop</h1>
        <h1 className="text-sm font-medium ">WhatsApp</h1>
        <h1 className="text-sm font-medium ">Contact Us</h1>
        <h1 className="text-sm font-medium ">Email</h1>
        <h1 className="text-sm font-medium ">Terms & Conditions</h1>
      </div>
    </div>
  );
}

export default Footer;
