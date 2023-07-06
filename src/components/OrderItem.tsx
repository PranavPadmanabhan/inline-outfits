/* eslint-disable @next/next/no-img-element */
import React from 'react'

function OrderItem({image,name,description,finalPrice,offer,price,totalQuantity,color,size}:{
  image?:string;
  name?:string;
  description?:string;
  price?: string | number;
  offer?: string | number;
  finalPrice?: string | number;
  totalQuantity?: number;
  size?:string;
  color?:any;
}) {
  return (
        
    <div className="w-full h-full flex items-center justify-start px-3 box-border my-2">
    <img
      src={image}
      alt=""
      className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-[20px]"
    />
    <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
      <span className="text-black font-[600] text-[1.1rem] mt-1">
        {name}
      </span>
      <p className="text-lightGray text-[0.9rem] font-[400] mb-2">
        {description}
      </p>
      <span className="text-black font-[600] text-[1.5rem]">
            ₹{offer ? finalPrice :price  }{" "}
            {offer && (
              <>
                <span className="text-lightGray font-[400] text-[0.96rem] ml-[2px] line-through	">
                  ₹{offer ? price : ""}{" "}
                </span>
                <span className="text-lightRed opacity-60 font-[600] ml-1 text-[0.96rem]">
                  {" "}
                  {offer}% off
                </span>
              </>
            )}
          </span>

      <div className="flex justify-between items-center w-[170px] sm:w-[200px] mt-2">
        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          size <span className="font-[700] mt-1">{size}</span>
        </span>

        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          Quantity <span className="font-[700] mt-1">{totalQuantity}</span>
        </span>
        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          color
          <span style={{color:color?.code}} className="font-[700] mt-1 ">{color?.name}</span>
        </span>
      </div>
    </div>
  </div>
  )
}

export default OrderItem