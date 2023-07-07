import React from "react";
type props = {
  deliveryState : any
}

function Ordered({deliveryState}:props) {
  return (
    <div className="w-[90%] min-h-[200px] flex items-center justify-start px-3 box-border   rounded-md ">
      <img
        src="/svg/T4.svg"
        alt=""
        className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-[20px] my-3"
      />
      <div className="w-full h-[80%] flex flex-col items-start justify-start pl-5 box-border">
        <span className="text-black font-[600] text-[1.1rem]  ">
          black t shirt
        </span>
        <p className="text-lightGray text-[0.9rem] font-[400] mb-1">
          Naruto black t shirt
        </p>
       

        <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
              <h1 className="font-medium text-[23px] text-black">
                Rs 399
              </h1>
              <h1 className="font-medium text-[17px] text-[#00000094] mx-2 line-through">
                Rs 499
              </h1>
              <h1 className="font-medium text-[15px] text-lightRed">
                25% off
              </h1>
            </div>

            <span className="text-[0.8rem] font-[500] text-[#027500d3]">{deliveryState}</span>


       
          <button className="h-[35px] w-[120px] rounded-md justify-center items-center flex text-[0.8rem] font-[600] bg-black text-white mt-2">
            Replace
          </button>
        
        
      </div>
    </div>
  );
}

export default Ordered;
