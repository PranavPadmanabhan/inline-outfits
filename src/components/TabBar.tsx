import React from 'react'

type props =
{
    activeTab : "AllOrders" | "InFactory" | "Shipped" | "Delivered" |"Replacement Requests";
    setActiveTab : React.Dispatch<React.SetStateAction<"AllOrders" | "InFactory" | "Shipped"|"Delivered" |"Replacement Requests">>
}

function TabBar({activeTab,setActiveTab}:props) {
  return (
    <div className="h-[55px] w-[90%] bg-[#F5F5F5] flex items-center justify-between rounded-md p-2 box-border cursor-pointer">
    <span onClick={()=>setActiveTab("AllOrders")} className={`h-full w-[28%] ${activeTab=== "AllOrders"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>All Orders</span>
    <span onClick={()=>setActiveTab("InFactory")}  className={`h-full w-[28%] ${activeTab=== "InFactory"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>In Factory</span>
    <span onClick={()=>setActiveTab("Shipped")} className={`h-full w-[28%] ${activeTab=== "Shipped"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>Shipped</span>
    <span onClick={()=>setActiveTab("Delivered")} className={`h-full w-[28%] ${activeTab=== "Delivered"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>Delivered</span>
    <span onClick={()=>setActiveTab("Replacement Requests")} className={`h-full w-[28%] ${activeTab=== "Replacement Requests"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>Replacements</span>
  </div>
  )
}

export default TabBar