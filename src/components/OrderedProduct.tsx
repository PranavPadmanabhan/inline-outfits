import React from 'react'

function OrderedProduct() {
  return (
    




    <div className="w-[75%] h-full flex items-center justify-start px-3 box-border  bg-[#F4F4F4] rounded-md ">
    <img
      src="/svg/T4.svg"
      alt=""
      className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-[20px] my-3"
    />
    <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
      <span className="text-black font-[600] text-[1.1rem] mt-2 ">
        black t shirt
      </span>
      <p className="text-lightGray text-[0.9rem] font-[400] mb-1">
        Naruto black t shirt
      </p>
      <span className="text-black text-[0.9rem] font-[300] flex  items-center">
          Quantity : <span className="font-[500] ml-1">1</span>
        </span>
        <span className="text-black text-[0.9rem] font-[300] flex  items-center">
          size : <span className="font-[500] ml-1">L</span>
        </span>
        <span className="text-black text-[0.9rem] font-[300] flex items-center">
          color :
          <span className="font-[500] ml-1 ">black</span>
        </span>

      <div className="flex justify-between items-center w-[200px] h-[35px] my-2">
        <button className='h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]'> Send To Print</button>
        <button className='h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]'> Shipped</button>

        

       
        
      </div>
    </div>
  </div>




  )
}

export default OrderedProduct