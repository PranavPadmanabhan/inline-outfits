/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ImSpinner4 } from "react-icons/im";

type props = {
  image: string;
  nameofT: string;
  details: string;
  offprice: number;
  realprice: number;
  off: number;
  className?:string;
  onClick?: () => void;
};

function ProductItem({
  image,
  nameofT,
  details,
  offprice,
  realprice,
  off,
  onClick,
  className
}: props) {
  const router = useRouter();
  const [loading, setloading] = useState<boolean>(true);


  
  return (
    <div
      onClick={onClick}
      className="h-[100%] lg:w-[80%] w-[90%] flex flex-col justify-start items-center  cursor-pointer"
    >
      <div className={`${className} relative w-[100%] lg:h-[300px] lg:max-h-[300px] h-[30vh] max-h-auto flex flex-col items-center justify-center rounded-[20px] overflow-hidden`}>
        <img
          className=" w-[100%] h-[100%] items-center object-cover rounded-[20px] mb-1 pointer-events-none"
          src={image}
          alt=""
          style={{display:!loading?"block":'none'}}
          onLoad={(e) => setloading(false)}
        />
        {loading && (
          <div className="absolute top-0 w-full  h-full flex items-center justify-center bg-gray-400">
            <div className="w-full h-full flex items-center backdrop-blur-lg justify-center">
              <ImSpinner4 color="white" size={24} className="animate-rotate" />
            </div>
          </div>
        )}
      </div>
      <h1 className="self-start text-center text-[1.2rem] font-[700] text-black lg:ml-0 ml-2">
        {nameofT}
      </h1>
      <p className="self-start text-left text-[0.75rem] lg:text-[0.8rem] max-w-[90%] break-words font-medium text-black lg:ml-0 ml-2">
        {details}
      </p>
      <div className="self-start text-center h-[20px] w-[100%] flex items-center justify-start lg:ml-0 ml-2">
        <h1 className="font-[600] text-[0.89rem] lg:text-[13px] text-black">₹{offprice}</h1>
        <h1 className="font-medium text-[0.7rem] lg:text-[11px] text-[#00000094] mx-2 line-through  ">
        ₹{realprice}
        </h1>
        <h1 className="font-semibold text-[0.65rem] lg:text-[11px] text-lightRed ">{off}% off</h1>
      </div>
    </div>
  );
}

export default ProductItem;
