import Header from '@/components/Header';
import OrderedProduct from '@/components/OrderedProduct';
import ProductUpload from '@/components/ProductUpload';
import TabBar from '@/components/TabBar';
import React, { useState } from 'react'

function Orders() {

  const [activeTab, setActiveTab] = useState <"AllOrders" | "SendToPrint" | "Shipped"> ("AllOrders")
  // const [loading, setLoading] = useState(false)
  const RenderTabs =()=>{
switch (activeTab) {
  case "AllOrders":
    return(<div className="min-h-[200px] w-[90%]  grid grid-cols-2 gap-2 ">
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
   
  </div>)
    
    case "SendToPrint" :
      
    return(<div className="min-h-[200px] w-[90%]  grid grid-cols-2 gap-2 ">
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
   
  </div>)

    
case "Shipped" :
      
return(<div className="min-h-[200px] w-[90%]  grid grid-cols-2 gap-2 ">
<OrderedProduct/>
<OrderedProduct/>
<OrderedProduct/>
<OrderedProduct/>
<OrderedProduct/>
<OrderedProduct/>
<OrderedProduct/>

</div>)
    

  default:
    return(<div className="min-h-[200px] w-[90%]  grid grid-cols-2 gap-2 ">
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
    <OrderedProduct/>
   
  </div>)
   
}

  }
  return (
    <div  className='min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]'>
<Header/>
<div  className="h-full w-full flex  flex-col items-center justify-start">
 <TabBar activeTab={activeTab}
 setActiveTab={setActiveTab}
 />

  <div className="h-[45px] w-[150px] bg-black rounded-md -ml-[78%] my-5">Sort by date</div>

<RenderTabs/>


</div>
{/* {loading && <ProductUpload/>} */}
    </div>
  )
}

export default Orders;