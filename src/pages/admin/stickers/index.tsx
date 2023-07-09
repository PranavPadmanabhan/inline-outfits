import Header from '@/components/Header'
import React from 'react'

function Stickers() {
  return (
   <div className="h-full w-full flex flex-col items-start justify-start  ">
    <Header/>
    <div className="h-full w-full grid grid-cols-6 gap-12   bg-white p-10 box-border">

<div className="h-[130px] w-[130px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-md">
    <img  className='h-[30px] w-[30px]' src="/svg/delete.svg  " alt="" />
    <span className='text-[0.7rem] text-black mt-1 '>Delete</span>
</div>

        
      

    </div>
   </div>
  )
}

export default Stickers