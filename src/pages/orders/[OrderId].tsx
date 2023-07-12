import React from "react";
import Header from "@/components/Header";
import Specification from "@/components/Specification";
import TypeOfSpec from "@/components/TypeOfSpec";
import GivenAddress from "@/components/GivenAddress";

function OrderId() {
  return (
    <div className="min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[80px]">
      <Header />
      <div className="h-[100%] w-[100%] flex items-start justify-center ">
        <div className="h-full lg:w-[40%] flex bg-gray-600 justify-center items-start pt-16 box-border ">
          {/* put carousel component here and change bg-colour */}
        </div>
        <div className="h-[100%] lg:w-[50%] w-[90%] flex flex-col bg-white justify-start items-start lg:pl-10 pl-5 box-border ">
          <h1 className="text-2xl font-bold  mt-3 text-black">
            Black Printed T-Shirt
          </h1>
          <h1 className="text-[16px] text-[#000000a6] font-light mb-1">
            Men black printed t-shirt
          </h1>
          <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
            <h1 className="font-medium text-[23px] text-black">Rs 249</h1>
            <h1 className="font-medium text-[17px] text-[#00000094] mx-2 line-through">
              Rs 1299
            </h1>
            <h1 className="font-medium text-[15px] text-lightRed">25% off</h1>
          </div>
          <span className="text-[1rem] text-black font-[600] mt-1">
            Quantity :{" "}
            <span className="text-[1rem] text-black font-[600]">1</span>
          </span>

          <div className="h-[65px] w-[120px] flex items-start justify-start my-1 -ml-4">
            <div className="h-full w-[50%] flex flex-col items-center justify-start">
              <span className="text-[0.7rem] text-black  ">Color</span>
              <div
                style={{ backgroundColor: "black" }}
                className=" h-[33px] w-[33px] rounded-full"
              ></div>
              <span className="text-[0.6rem] text-black"> Black</span>
            </div>

            <div className="h-full w-[50%] flex flex-col items-center justify-start">
              <span className="text-[0.7rem] text-black ">Size</span>
              <div className=" h-[33px] w-[33px] border-[1px] border-black rounded-full flex text-black items-center justify-center text-[0.7rem]">
                M
              </div>
            </div>
          </div>

          <div className="h-[30px] w-[300px]  flex items-center justify-start">
            <img src="/svg/delivery.svg" alt="" className="h-[30px] w-[30px]" />
            <span className="text-[1rem] font-[600] text-[#00CC39] ml-3">
              {" "}
              Delevery within 7-10 days
            </span>
          </div>

          <div className="h-[300px] w-full flex items-center justify-center ">
            <div className="h-full w-[50%] flex flex-col justify-start items-start ">
              <h1 className="lg:text-lg text-xl font-medium my-2 text-black">
                Specifications
              </h1>

              <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col justify-start lg:items-center items-start">
                <TypeOfSpec Spec="Type" SpecDetails="Round Neck" />
                <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
              </div>

              <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                <TypeOfSpec Spec="Sleeve" SpecDetails="Half Sleeve" />
                <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
              </div>

              <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                <TypeOfSpec Spec="Fit" SpecDetails="Slim" />
                <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
              </div>

              <div className="lg:h-[25%] h-[15%] w-[100%] border-t-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                <TypeOfSpec Spec="Fabric" SpecDetails="Cotton" />
              </div>

              <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start ">
                <TypeOfSpec
                  Spec="Fabric Care"
                  SpecDetails="Gentele Machine Care"
                />
                <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
              </div>
            </div>

            <div className="h-full w-[50%] flex flex-col justify-start items-center  ">
              <h1 className="lg:text-lg text-xl font-medium my-3 text-black">
                Delivery Address
              </h1>

              <div className="min-h-[170px] w-[170px] border-[1px] border-[#00000013] rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-xs text-black"> Name</h1>
                <h1 className="text-xs mt-1 text-black">Locality </h1>
                <h1 className="text-xs mt-1 text-black">City </h1>
                <h1 className="text-xs mt-1 text-black">PinNumber </h1>
                <h1 className="text-xs mt-1 text-black">PhoneNumber </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderId;
