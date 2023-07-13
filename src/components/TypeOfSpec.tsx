import React from 'react'

type props ={
    Spec: any;
    SpecDetails : any;
}

function TypeOfSpec({Spec,SpecDetails}:props) {
  return (
    <div className="lg:h-[100%] h-[100%] lg:w-[100%]  flex flex-col bg-transparent justify-evenly items-start">
    <h1 className="text-[12px] text-[#0000008e]">
        {Spec}
    </h1>
    <h1 className="text-[16px] text-black">
        {SpecDetails}
    </h1>
</div>
  )
}

export default TypeOfSpec