import React from 'react'
import Header from './Header'

function UploadSticker() {
  return (
    
    <div className="h-full w-full flex flex-col items-start justify-start  ">
        <Header/>
        <div className="h-full w-full flex items-center justify-center bg-[#000000bd]">
            <div className="h-[80%] w-[30%] flex flex-col items-start justify-start bg-white p-5 box-border rounded-lg">
<span className='text-[1.2rem] text-black font-[700]'>Upload Sticker</span>

<input className='bg-[#F1F1F1] h-[40px] w-[100%] text-[0.8rem] p-2 box-border rounded-lg outline-none text-[#797777] my-5' type="text" placeholder='Sticker Name' />



<div className="text-[0.7rem] text-[#807979] h-[40px] w-[100%] rounded-lg bg-[#F1F1F1]  px-1 box-border my-2 flex items-center justify-between ">
            Choose  File
            <button className="h-[80%] w-[80px] bg-black  flex items-center justify-center rounded-md text-white">
              Choose
            </button>
          </div>

          <span className='text-[0.8rem] text-black font-[400] my-2'>Preview</span>

          <div className=" h-[40%] w-[80%] rounded-lg bg-[#F1F1F1] ml-10 "></div>

          <button className="h-[35px] w-[100px] bg-black  text-[0.7rem]  flex items-center justify-center rounded-md text-white mt-3 ml-52">
              Add Product
            </button>




            </div> 
        </div>
    </div>
  )
}

export default UploadSticker