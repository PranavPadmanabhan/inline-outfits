import Header from '@/components/Header';
import OrderedProduct from '@/components/OrderedProduct';
import React from 'react'

function Orders() {
  return (
    <div className='min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]'>
<Header/>
<div className="h-full w-full flex  flex-col items-center justify-start">
  <div className="h-[55px] w-[90%] bg-[#F5F5F5] flex items-center justify-between rounded-md p-2 box-border">
    <span className='h-full w-[28%] bg-black text-white   flex items-center justify-center rounded-md'>All Orders</span>
    <span className='h-full w-[28%]   flex items-center justify-center rounded-md'>Send To Print</span>
    <span className='h-full w-[28%]  flex items-center justify-center rounded-md'>Shipped</span>
  </div>

  <div className="h-[45px] w-[150px] bg-black rounded-md -ml-[78%] my-5">Sort by date</div>

<div className="min-h-[200px] w-[90%]  grid grid-cols-2 gap-2 ">
  <OrderedProduct/>
  <OrderedProduct/>
  <OrderedProduct/>
  <OrderedProduct/>
  <OrderedProduct/>
  <OrderedProduct/>
  <OrderedProduct/>
 
</div>


</div>

    </div>
  )
}

export default Orders;