import Header from '@/components/Header'
import React from 'react'

function Products() {
  return (
    <div className="h-full w-full flex flex-col items-start justify-start  ">
      <Header/>
      <div className="h-full w-full grid grid-cols-2 gap-6   bg-white p-10 box-border">
      <div className="w-[75%] h-full  flex items-center justify-start px-3 box-border  bg-[#F4F4F4] rounded-md relative ">
      <img
        src=" /svg/T1.svg"
        alt=""
        className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-lg my-3"
      />
      <div className="w-[60%] h-full flex flex-col items-start justify-start pl-5 box-border ">
        <span className="text-black font-[600] text-[1.1rem] mt-5 ">
          Black Tshirt
        </span>
        <p className="text-lightGray text-[0.9rem] font-[400] mb-1">
          round neck black tshirt
        </p>

        <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
              <h1 className="font-medium text-[20px] text-black">Rs 399</h1>
              <h1 className="font-medium text-[16px] text-[#00000094] mx-2 line-through">
                Rs 499
              </h1>
              <h1 className="font-medium text-[15px] text-lightRed">25% off</h1>
            </div>
       
       <div className="h-[25px] w-[45px] flex items-center justify-between  absolute top-4 right-5">
        <img className='h-[18px] w-[18px]' src="/svg/edit.svg" alt="" />
        <img className='h-[18px] w-[18px]' src="/svg/delete.svg" alt="" />
       </div>
        
      </div>
    </div>
      </div>
    </div>
  )
}

export default Products