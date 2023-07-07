/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

function OrderedProduct({
  name,
  color,
  description,
  image,
  totalQuantity,
  status,
  size
}:{
  image?:string;
  name?:string;
  description?:string;
  totalQuantity?: number;
  size?:string;
  color?:any;
  status?:string;
}) {


  const RenderButtons = () => {
    if(status === "Order Placed"){
      return(
        <div className="flex justify-between items-center w-[200px] h-[35px] my-2">
          <button className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]">
            {" "}
            Send To Print
          </button>
          <button className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Shipped
          </button>
        </div>
      )
    }
    else if(status === "InFactory"){
      return(
        <div className="flex justify-start items-center w-[200px] h-[35px] my-2">
          <button className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Shipped
          </button>
        </div>
      )
    }
    else {
      return(
        <div />
      )
    }
  }

  return (
    <div className="w-[75%] h-full flex items-center justify-start px-3 box-border  bg-[#F4F4F4] rounded-md ">
      <img
        src={image}
        alt=""
        className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-[20px] my-3"
      />
      <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
        <span className="text-black font-[600] text-[1.1rem] mt-2 ">
          {name}
        </span>
        <p className="text-lightGray text-[0.9rem] font-[400] mb-1">
          {description}
        </p>
        <span className="text-black text-[0.9rem] font-[300] flex  items-center">
          Quantity : <span className="font-[500] ml-1">{totalQuantity}</span>
        </span>
        <span className="text-black text-[0.9rem] font-[300] flex  items-center">
          size : <span className="font-[500] ml-1">{size}</span>
        </span>
        <span className="text-black text-[0.9rem] font-[300] flex items-center">
          color :<span style={{color:color?.code}} className="font-[500] ml-1 ">{color?.name}</span>
        </span>
        <RenderButtons />
      </div>
    </div>
  );
}

export default OrderedProduct;
