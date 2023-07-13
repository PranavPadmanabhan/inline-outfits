/* eslint-disable @next/next/no-img-element */
import React from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts/AppContext";

function OrderPlaced() {
  const router = useRouter();
  const { setOrderPlaced } = useAppContext();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start fixed top-0  ">
      <Header />
      <div className="h-full w-full  flex items-center justify-center fixed top-0 rounded-lg overflow-hidden bg-transparent backdrop-blur-[2px] z-[100]">
        <div className="h-[45%] w-[40%] flex bg-white flex-col items-center justify-start bg-SuccessPopper rounded-lg shadow-2xl bg-cover  ">
          <img src="/gif/animation2.gif" alt="" className="h-[130px] w-[130px] mt-7" />
          <span className="text-[2.0rem] text-black font-extrabold -mt-3">
            Order Placed
          </span>
          <button
            onClick={() => {
              setOrderPlaced(false);
              router.push("/shop");
            }}
            className=" h-[40px] w-[130px] text-[0.8rem] text-white bg-black flex items-center justify-center rounded-md mt-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
