/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'

function Landing() {
  const router = useRouter()
  return (
    <div className='h-[80vh] w-full flex flex-col-reverse lg:flex-row justify-evenly items-center  bg-black pb-5 lg:pb-0'>
        <div className="lg:h-full h-[40%] lg:w-[50%] w-[84%] flex flex-col lg:items-left items-center justify-center lg:pl-48 box-border ">
            <h1 className=" leading-snug tracking-wide lg:w-[80%] w-[70%] lg:text-6xl text-4xl text-center lg:text-left font-semibold text-white font-MuseoModerno mb-1 ">Fasion Up Your Looks</h1>
            <h1 className="lg:text-[15px] text-[13px] text-white  lg:w-[80%] w-[85%] text-center lg:text-left tracking-wider">Discover Your Style and Unleash Your Confidence with Our Stunning Collection of Dresses!</h1>
            <button onClick={()=>router.push("/shop")} className='h-[43px] w-[150px] rounded-lg flex justify-center items-center font-medium bg-white mt-5 text-black'>Shop Now</button>
        </div>
        <div className="lg:h-full h-[60%] lg:w-[50%] w-[90%] flex items-center justify-center  relative lg:ml-0 ml-16 ">
            <div className="h-[30px] w-[30px] rounded-full bg-white -ml-20 shadow-ds "></div>
            <img className='h-[100%] w-[100%] absolute lg:top-7 right-10 ' src="/svg/Model.svg" alt=""  />
        </div>
    </div>
  )
}

export default Landing