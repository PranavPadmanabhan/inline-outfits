import Header from '@/components/Header'
import Ordered from '@/components/Ordered'
import dynamic from 'next/dynamic';
import React from 'react'

function Order() {
  return (
    <div className=" h-screen w-full  flex flex-col  items-center justify-start overflow-y-scroll scrollbar-hide pt-[50px] lg:pt-[100px]">
        <Header/>
        <div className="h-full w-[90%] grid  grid-cols-2 place-content-start place-items-center overflow-y-scroll scrollbar-hide pt-5 box-border gap-x-0 gap-y-3 lg:gap-x-6 lg:gap-y-6">
            <Ordered deliveryState="Delivered"/>
            <Ordered deliveryState="Delivery expected by June 29"/>
            <Ordered deliveryState="Delivery expected by June 29"/>
            <Ordered deliveryState="Delivery expected by June 29"/>
        </div>
    </div>
  )
}
export default dynamic(() => Promise.resolve(Order), {
    ssr: false,
  });