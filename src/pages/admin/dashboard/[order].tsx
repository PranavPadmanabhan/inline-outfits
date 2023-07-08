import Header from '@/components/Header'
import React from 'react'

function Order() {
  return (
<div className="h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]">
    <Header/>
    <div className="h-[100%] w-full flex   items-center justify-start">
        <div className="h-[100%] w-[50%] flex items-center justify-center">
            <img className='h-[80%] w-[80%] flex items-center justify-center' src="/svg/T4.svg" alt="" />
        </div>

<div className="h-[100%] w-[50%] flex flex-col items-center justify-center">
    
    
    

<div className="w-full h-[85%] flex flex-col items-start justify-start ">
        <span className="text-black font-[600] text-[1.6rem] my-1 ">
          black t shirt
        </span>
        <p className="text-lightGray text-[0.9rem] font-[400] ">
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

            <span className="text-[0.9rem] font-[500] text-black mt-1"> Quantity : <span >1 </span></span>


            <div className="h-[65px] w-[150px] flex items-start justify-start my-2 -ml-5">
                <div className="h-full w-[50%] flex flex-col items-center justify-between">
                    <span className='text-[0.7rem] text-black  '>Colour</span>
                    <div className=" h-[33px] w-[33px] bg-black rounded-full"></div>
                    <span className='text-[0.6rem] text-black'> black</span>
                </div>

                <div className="h-full w-[50%] flex flex-col items-center justify-between">
                    <span className='text-[0.7rem] text-black  '>Size</span>
                    <div className=" h-[33px] w-[33px] border-[1px] border-black rounded-full flex items-center justify-center text-[0.7rem]">M</div>
                    <span className='text-[0.6rem] text-black'> black</span>
                </div>
            </div>

            <span className='text-[1.2rem]  font-[700] text-black my-1'>Delivery Address</span>
            <span className='text-[1rem]   text-black '>Name</span>
            <span className='text-[1rem]   text-black '>Address</span>
            <span className='text-[1rem]   text-black '>land mark</span>
            <span className='text-[1rem]   text-black '>locality</span>
            <span className='text-[1rem]   text-black '>district</span>
            <span className='text-[1rem]   text-black '>pin code</span>
            <span className='text-[1rem]   text-black '>phone number</span>

            <div className="flex justify-between items-center w-[200px] h-[35px] my-3">
          <button  className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]">
            {" "}
            Send To Print
          </button>
          <button  className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
            {" "}
            Shipped
          </button>
        </div>



       
         
        
        
      </div>    
    
    
     </div>

    </div>
</div>
  )
}

export default Order