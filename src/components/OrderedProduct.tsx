/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";

type Loading = {
  sendingToFactory: boolean;
  shipping: boolean;
};

function OrderedProduct({
  name,
  color,
  description,
  image,
  totalQuantity,
  status,
  size,
  factorybtnOnClick,
  shippingbtnOnClick,
  onClick,
  deliverybtnClick
}: {
  image?: string;
  name?: string;
  description?: string;
  totalQuantity?: number;
  size?: string;
  color?: any;
  status?: string;
  factorybtnOnClick?:() =>void;
  shippingbtnOnClick?:() =>void;
  onClick?:() => void
  deliverybtnClick?:() => void
}) {
  const RenderButtons = () => {
    if (status === "Order Placed") {
      return (
        <div className="flex justify-between items-center w-[200px] h-[35px] my-2">
          <button onClick={factorybtnOnClick} className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]">
            {" "}
            Send To Print
          </button>
          <button onClick={shippingbtnOnClick} className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Shipped
          </button>
        </div>
      );
    } else if (status === "In Factory") {
      return (
        <div className="flex justify-start items-center w-[200px] h-[35px] my-2">
          <button onClick={shippingbtnOnClick} className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Shipped
          </button>
          <button onClick={deliverybtnClick} className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Delivered
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  };

  return (
    <div className="w-[75%] h-full  flex items-center justify-start px-3 box-border  bg-[#F4F4F4] rounded-md ">
      <img
        onClick={onClick}
        src={image}
        alt=""
        className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-[20px] my-3 cursor-pointer"
      />
      <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
        <span onClick={onClick} className="text-black font-[600] text-[1.1rem] mt-2  cursor-pointer">
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
          color :
          <span style={{ color: color?.code }} className="font-[500] ml-1 ">
            {color?.name}
          </span>
        </span>
        <RenderButtons />
      </div>
    </div>
  );
}

export default OrderedProduct;
