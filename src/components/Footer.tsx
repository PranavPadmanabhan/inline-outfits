/* eslint-disable @next/next/no-img-element */
import React from "react";


function Footer() {
  return (
    <div className="lg:min-h-[30vh] h-[45vh] w-[100%] flex lg:flex-row flex-col items-center justify-between lg:px-10 py-5 box-border text-white bg-black bottom-0 relative">
      <div className="lg:min-h-[45px] h-[100px] w-[30%] lg:w-[12%] lg:ml-10">
        {" "}
        <img className="h-[100%] w-[100%]" src="/svg/In&O.svg" alt="" />
      </div>{" "}
      <div className="lg:h-[80%] h-[60%] lg:w-[25%] flex flex-col items-center justify-evenly  lg:grid lg:grid-cols-2 lg:gap-2  lg:ml-0 ml-5">
        <h1 className="text-sm font-medium ">About Us</h1>
        <h1 className="text-sm font-medium ">Instagrm</h1>
      
        <h1 className="text-sm font-medium ">Privacy policy</h1>
        <h1 className="text-sm font-medium ">Contact Us</h1>
        <h1 className="text-sm font-medium ">Email</h1>
        <h1 className="text-sm font-medium ">Terms & Conditions</h1>
      </div>
    </div>
  );
}

export default Footer;
