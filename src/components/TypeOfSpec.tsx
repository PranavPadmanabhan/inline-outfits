import React from 'react'

type props ={
    Spec: any;
    SpecDetails : any;
}

function TypeOfSpec({Spec,SpecDetails}:props) {
  return (
    <div className="h-[100%] w-[50%] flex flex-col justify-evenly items-start">
    <h1 className="text-[12px] text-[#0000008e]">
        {Spec}
    </h1>
    <h1 className="text-[16px] ">
        {SpecDetails}
    </h1>
</div>
  )
}

export default TypeOfSpec