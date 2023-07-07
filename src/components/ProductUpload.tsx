import { useAppContext } from "@/contexts/AppContext";
import { CloseCircle } from "iconsax-react";
import React from "react";

function ProductUpload() {
  const  { setIsProductUploadModalVisible} =  useAppContext()
  return (
    <div className="fixed top-0 z-[100] h-[100vh] w-[100vw] bg-[#0000005b] flex items-center justify-center">
      <div className="relative h-[70%] w-[70%] bg-white   rounded-md flex items-center justify-center p-5 box-border ">
      <CloseCircle
          onClick={() => setIsProductUploadModalVisible(false)}
          className="absolute cursor-pointer top-4 right-4 "
          size="25"
          color="black"
        />
        <div className="h-full w-[50%] flex flex-col items-start justify-start ">
          <h1 className=" text-black text-[1.3rem] font-[600]  my-1 ">
            Upload Product
          </h1>

          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
            type="text"
            placeholder="Product Name"
          />
          <input
            className="text-[0.7rem] text-black h-[70px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
            type="text"
            placeholder="Product Description"
          />
          <div className="h-[40px] w-[70%] flex items-center justify-between">
            <input
              className="text-[0.7rem] text-black h-full w-[48%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
              type="text"
              placeholder="Actual Amount"
            />
            <input
              className="text-[0.7rem] text-black h-full w-[48%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
              type="text"
              placeholder="Offer Amount"
            />
          </div>
          <h1 className="text-[0.7rem] text-[#818080] my-2 ml-1">
            Available Colours
          </h1>

          <div className="h-[36px] w-[70%] flex items-center justify-start">
            <div className="h-[35px] border-[1px] border-[#0d0f8b] w-[35px] rounded-full mx-1"></div>
            <div className="h-[35px] border-[1px] border-[#0d0f8b] w-[35px] rounded-full mx-1"></div>
            <div className="h-[35px] border-[1px] border-[#0d0f8b] w-[35px] rounded-full mx-1"></div>
            <div className="h-[35px] border-[1px] border-[#0d0f8b] w-[35px] rounded-full mx-1"></div>
          </div>

          <div className="text-[0.7rem] text-[#807979] h-[40px] w-[50%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1]  px-1 box-border my-2 flex items-center justify-between ">
            Add Colour
            <button className="h-[80%] w-[60px] bg-black  flex items-center justify-center rounded-md text-white">
              Add
            </button>
          </div>

          <h1 className="text-[0.7rem] text-[#818080] my-1 ml-1">
            Available Colours
          </h1>

          <div className="h-[36px] w-[70%] flex items-center justify-start">
            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              XS
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              S
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              L
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              XL
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              XXL
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              3XL
            </div>

            <div className="h-[33px] border-[1px] border-black w-[33px] rounded-full mx-1 flex items-center justify-center text-[0.8rem]">
              4XL
            </div>
          </div>

          <div className="text-[0.7rem] text-[#807979] h-[40px] w-[60%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1]  px-1 box-border my-2 flex items-center justify-between ">
            Choose Image File
            <button className="h-[90%] w-[80px] bg-black  flex items-center justify-center rounded-md text-white">
              Upload
            </button>
          </div>
        </div>



<div className="h-full w-[50%] flex flex-col items-start justify-start ">

<input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2 mt-10"
            type="text"
            placeholder="Neck Type"
          />


<input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Sleeve Type"
          />

<input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fit"
          />

<input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fabric Type"
          />

<input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fabric Care"
          />


<button className="h-[35px] w-[100px] bg-black text-white rounded-md flex items-center justify-center text-[0.7rem] mt-[70px] ml-72 "> Add Product</button>

</div>



      </div>
    </div>
  );
}

export default ProductUpload;
