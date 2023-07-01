/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'

function Landing() {
  const router = useRouter()
  return (
    <div className='h-[80vh] w-full flex justify-evenly items-center  bg-black '>
        <div className="h-full w-[50%] flex flex-col items-left justify-center pl-48 box-border  ">
            <h1 className=" leading-snug tracking-wide w-[80%] text-6xl font-semibold text-white font-MuseoModerno ">Fasion Up Your Looks</h1>
            <h1 className="text-[15px] text-white w-[80%] tracking-wider">Discover Your Style and Unleash Your Confidence with Our Stunning Collection of Dresses!</h1>
            <button onClick={()=>router.push("/shop")} className='h-[43px] w-[150px] rounded-lg flex justify-center items-center font-medium bg-white mt-5 text-black'>Shop Now</button>
        </div>
        <div className="h-full w-[50%] flex items-center justify-center  relative  ">
            <div className="h-[30px] w-[30px] rounded-full bg-white -ml-20 shadow-ds "></div>
            <img className='h-[100%] w-[100%] absolute top-7 right-10 ' src="/svg/Model.svg" alt=""  />
        </div>
    </div>
  )
}

export default Landing