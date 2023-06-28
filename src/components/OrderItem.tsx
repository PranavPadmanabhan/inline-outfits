import React from 'react'

function OrderItem() {
  return (
        
    <div className="w-[68%] h-full flex items-center justify-start ml-5 mb-2">
    <img
      src="/svg/T2.svg"
      alt=""
      className="h-full w-[40%] max-w-[180px] object-cover rounded-[20px]"
    />
    <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
      <span className="text-black font-[600] text-[1.1rem] mt-1">
        Black Tshirt
      </span>
      <p className="text-lightGray text-[0.9rem] font-[400] mb-2">
        Men printed black t-shirt
      </p>
      <span className="text-black font-[600] text-[1.5rem]">
        ₹249
        <>
          <span className="text-lightGray font-[400] text-[0.96rem] ml-[2px] line-through	">
            ₹599
          </span>
          <span className="text-lightRed opacity-60 font-[600] ml-1 text-[0.96rem]">
            {" "}
            25% off
          </span>
        </>
      </span>

      <div className="flex justify-between items-center w-[200px] mt-2">
        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          size <span className="font-[700] mt-1">L</span>
        </span>

        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          Quantity <span className="font-[700] mt-1">1</span>
        </span>
        <span className="text-black text-[1rem] font-[300] flex flex-col items-center">
          color
          <span className="font-[700] mt-1 ">Black</span>
        </span>
      </div>
    </div>
  </div>
  )
}

export default OrderItem