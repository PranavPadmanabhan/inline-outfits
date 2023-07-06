import React from 'react'

type props =
{
    activeTab : "AllOrders" | "SendToPrint" | "Shipped";
    setActiveTab : React.Dispatch<React.SetStateAction<"AllOrders" | "SendToPrint" | "Shipped">>
}

function TabBar({activeTab,setActiveTab}:props) {
  return (
    <div className="h-[55px] w-[90%] bg-[#F5F5F5] flex items-center justify-between rounded-md p-2 box-border cursor-pointer">
    <span onClick={()=>setActiveTab("AllOrders")} className={`h-full w-[28%] ${activeTab=== "AllOrders"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>All Orders</span>
    <span onClick={()=>setActiveTab("SendToPrint")}  className={`h-full w-[28%] ${activeTab=== "SendToPrint"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>Send To Print</span>
    <span onClick={()=>setActiveTab("Shipped")} className={`h-full w-[28%] ${activeTab=== "Shipped"? "bg-black text-white " : "bg-[#F5F5F5] text-black cursor-pointer "}  flex items-center justify-center rounded-md`}>Shipped</span>
  </div>
  )
}

export default TabBar