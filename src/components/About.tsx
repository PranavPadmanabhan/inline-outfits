/* eslint-disable @next/next/no-img-element */
import React from 'react'

function About() {
  return (
    <div className='h-[500px] w-[90%]  flex justify-between items-center'>
        <div className="h-[100%] w-[55%] flex flex-col justify-start items-start pl-10 box-border">
        <h1 className="text-[1.7rem] tracking-wider text-[#A96500] font-MuseoModerno font-semibold  my-10">About Yolo</h1>
        <p className='text-[1.2rem]  text-[#000000a8] font-sans max-w-[80%] tracking-wider'>YOLO is an ecommerce platform that specializes in providing custom printed design t-shirts. With YOLO, customers have the opportunity to create unique and personalized t-shirts by selecting from a wide range of design options or uploading their own artwork. The platform offers a user-friendly interface, making it easy for customers to customize their t-shirts with different colors, fonts, and graphics.</p>
        </div>

        <div className="h-[85%] w-[50%]   flex items-start justify-start pl-[5%] box-border">
          <div style={{backgroundImage:'url(/svg/T5.svg)'}} className="w-[60%] h-[80%] rounded-lg bg-cover bg-center bg-no-repeat flex items-center justify-center">
            <img src="/svg/T5.svg" alt="" className="w-full h-full rounded-lg rotate-12" />
          </div>
        </div>
    </div>
      
  )
}

export default About