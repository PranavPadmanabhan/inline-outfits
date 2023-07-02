import React from 'react'
type props ={
    personalizedT : string;
}

function Personalize({personalizedT}:props) {
  return (
    <div className="h-[100%]   lg:w-[25%]  flex flex-col justify-start lg:items-start items-center">
         <img className=' w-[80%] items-center ' src={personalizedT} alt=""  />
    </div>
  )
}

export default Personalize