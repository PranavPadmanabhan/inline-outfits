import React from 'react'
type props ={
    personalizedT : string;
}

function Personalize({personalizedT}:props) {
  return (
    <div className="h-[100%] w-[25%]  flex flex-col justify-start items-start">
         <img className=' w-[80%] items-center ' src={personalizedT} alt=""  />
    </div>
  )
}

export default Personalize