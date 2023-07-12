/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";

import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import InfiniteScroll from "react-infinite-scroller";
import OrderId from "../orders/[OrderId]";

function Cart() {
  // const [cart, setCart] = useState<any>([]);
  const { cart, setCart } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(50);
  const router = useRouter();

  const getData = async () => {
    getCart(setCart, setLoading, setTotalAmount);
  };

  useEffect(() => {
    getCart(setCart, setLoading, setTotalAmount);
  }, []);

  return (
    // <div className="relative h-screen w-full flex flex-col items-center justify-start pt-[50px] lg:pt-[100px] ">
    //   <Header />
    //   {cart?.products?.length <= 0 && !loading && (
    //     <div className="w-screen h-full flex items-center justify-center">
    //       <span className="text-black text-[1.4rem] font-semibold ">
    //         Your Cart is Empty
    //       </span>
    //     </div>
    //   )}
    //   {loading ? (
    //     <div className="w-full h-full flex items-center justify-center">
    //       <ImSpinner4 color="black" size={36} className="animate-rotate" />
    //     </div>
    //   ) : (
    //     <div
    //       className={`w-full flex flex-col lg:flex-row items-center justify-start lg:justify-between pb-[70px] lg:pb-0`}
    //     >
    //       <div className="w-full lg:w-[65%] h-full flex flex-col items-center justify-start bg-white ">
    //         {cart?.products?.length > 0 && (
    //           <InfiniteScroll
    //             className="w-full h-full flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide"
    //             pageStart={0}
    //             loadMore={() => null}
    //             hasMore={true || false}
    //             loader={<div className="loader" key={0}></div>}
    //           >
    //             {cart?.products?.map((item: any, i: number) => (
    //               <div
    //                 key={i}
    //                 className="w-full h-auto flex flex-col items-center justify-start "
    //               >
    //                 <CartItem
    //                   name={item?.product?.name}
    //                   description={item?.product?.description}
    //                   image={item?.product?.images[0]}
    //                   product={item}
    //                   finalPrice={item?.product?.price?.original ?? 0}
    //                   price={Math.round(
    //                     item?.product?.price?.original *
    //                       (100 /
    //                         (100 - parseFloat(item?.product?.price?.offer)))
    //                   )}
    //                   offer={item?.product?.price?.offer}
    //                   totalQuantity={item?.quantity}
    //                   getProducts={getData}
    //                 />
    //                 <div className="min-h-[1px] w-[95%] bg-gray-300"></div>
    //               </div>
    //             ))}
    //           </InfiniteScroll>
    //         )}
    //       </div>
    //       {cart?.products?.length > 0 && (
    //         <div className="hidden w-[35%] h-full bg-white lg:flex flex-col items-center justify-start">
    //           <div className="w-[70%] h-[72%] min-h-[60vh] border-[1px] border-gray-400 rounded-[10px] flex flex-col px-[5%] pt-4 box-border ">
    //             <div className="w-full h-[20%] flex flex-col items-start justify-start border-b-[2px] border-dashed">
    //               <span className="mb-2 ml-4 text-black font-[600] text-[1.2rem] ">
    //                 Delivery
    //               </span>
    //               <span className="mb-2 ml-4 text-black font-[400] text-[1rem]">
    //                 Delivery within 10 working days
    //               </span>
    //             </div>
    //             <div className="w-full h-[45%] flex flex-col items-start justify-start border-b-gray-300 border-b-[2px] border-dashed mt-2">
    //               <span className="mb-2 ml-4 text-black font-[600] text-[1.2rem] ">
    //                 Subtotal
    //               </span>
    //               <div className="w-full h-auto mb-2 flex items-center justify-between">
    //                 <span className="ml-4 text-black font-[400] text-[1rem]">
    //                   Net Amount
    //                 </span>
    //                 <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
    //                   ₹{totalAmount}
    //                 </span>
    //               </div>
    //               <div className="w-full h-auto mb-2 flex items-center justify-between">
    //                 <span className="ml-4 text-black font-[400] text-[1rem]">
    //                   Delivery
    //                 </span>
    //                 <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
    //                   ₹50
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="w-full h-[15%] mb-2 flex items-center justify-between border-b-gray-300 border-b-[2px] border-dashed">
    //               <span className="ml-4 text-black font-[400] text-[1rem]">
    //                 Total
    //               </span>
    //               <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
    //                 ₹{totalAmount + deliveryFee}
    //               </span>
    //             </div>
    //             <button
    //               onClick={() => {
    //                 if (totalAmount > 300) {
    //                   router.push("/checkout");
    //                 } else {
    //                   return;
    //                 }
    //               }}
    //               className="self-center w-[80%] min-h-[43px] rounded-[10px] bg-black flex items-center justify-center mb-1"
    //             >
    //               <img
    //                 className="h-[18] w-[18px] ml-1"
    //                 src="/svg/Cart.svg"
    //                 alt=""
    //               />
    //               <h1 className="text-white text-[1rem] font-medium ml-2">
    //                 Proceed to Checkout
    //               </h1>
    //             </button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   )}
    //   {cart?.products?.length > 0 && !loading && (
    //     <div className="fixed bottom-0 bg-white flex lg:hidden items-center justify-between w-full min-h-[60px] border-t-[1px] border-t-black  px-5 box-border">
    //       <span className=" text-black font-[600] text-[1.2rem]">
    //         Total : ₹{totalAmount ? totalAmount + deliveryFee : "0"}
    //       </span>
    //       <button
    //         onClick={() => {
    //           if (totalAmount > 300) {
    //             router.push("/checkout");
    //           } else {
    //             return;
    //           }
    //         }}
    //         className="self-center w-[50%] h-[60%] min-h-[40px] rounded-[10px] bg-black flex items-center justify-center"
    //       >
    //         <img
    //           className="h-[13px] w-[13px] ml-1"
    //           src="/svg/Cart.svg"
    //           alt=""
    //         />
    //         <h1 className="text-white text-[0.8rem] font-medium ml-2">
    //           Proceed to Checkout
    //         </h1>
    //       </button>
    //     </div>
    //   )}
    // </div>


<OrderId/>

  );
}

export default Cart;

export const getCart = async (
  setCart: any,
  setLoading?: any,
  setTotalAmount?: any,
  setCartItem?: any,
  checkoutId?: any
) => {
  try {
    setLoading?.(true);
    const user = JSON.parse(localStorage.getItem("user")!);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/${user?.phone}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!data.error) {
      setCart(data);
      if (data.products.length > 0) {
        let total = 0;
        data.products.map((item: any) => {
          total +=
            parseInt(item.product.price.original.toString()) *
            parseInt(item.quantity.toString());
        });
        setTotalAmount?.(total);
        if (setCartItem && checkoutId) {
          const filtered = data?.products?.filter(
            (item: any) => item.cartItemId === checkoutId
          );
          if (filtered?.length > 0) {
            setCartItem(filtered[0]);
          }
        }
      }
    } else {
      if (data.error.includes("Cart Doesnot exists")) {
        localStorage.setItem("user", JSON.stringify({}));
      }
    }
    setLoading?.(false);
  } catch (error) {
    setLoading?.(false);
  }
};
