/* eslint-disable @next/next/no-img-element */
import React from 'react'

function About() {
  return (
    <div className='lg:h-[500px] h-[700px] w-[90%]  flex lg:flex-row flex-col justify-between items-center  mb-12 lg:mb-1  '>
        <div className="lg:h-[100%] h-[55%] lg:w-[55%]  flex flex-col justify-start lg:items-start items-center lg:pl-10 box-border">
        <h1 className="lg:text-[1.7rem] text-[1.5rem] tracking-wider text-[#A96500] font-MuseoModerno font-semibold my-5 lg:my-10 ">About In&O</h1>
        <p className='lg:text-[1.2rem] text-[1.1rem]  text-[#000000a8] font-sans lg:max-w-[80%] max-w-[95%] lg:text-start text-center tracking-wider'>In&O is an ecommerce platform that specializes in providing custom printed design t-shirts. With In&O, customers have the opportunity to create unique and personalized t-shirts by selecting from a wide range of design options or uploading their own artwork. The platform offers a user-friendly interface, making it easy for customers to customize their t-shirts with different colors, fonts, and graphics.</p>
        </div>

        <div className="lg:h-[85%] h-[45%] lg:w-[50%]   flex lg:items-start items-center justify-start pl-[5%] box-border lg:mt-0 mt-10">
          <div style={{backgroundImage:'url(/svg/T5.svg)'}} className="lg:w-[60%] lg:h-[80%] h-[85%] rounded-lg bg-cover bg-center bg-no-repeat flex items-center justify-center">
            <img src="/svg/T5.svg" alt="" className="w-full h-full rounded-lg rotate-12" />
          </div>
        </div>
    </div>
      
  )
}

export default About