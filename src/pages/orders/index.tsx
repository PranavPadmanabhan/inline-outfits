import Header from "@/components/Header";
import Ordered from "@/components/Ordered";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";

function Order() {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();

  const getOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${user?.phone}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setOrders(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className=" h-screen w-full  flex flex-col  items-center justify-start overflow-y-scroll scrollbar-hide pt-[50px] lg:pt-[100px]">
      <Header />
      {
        !loading && orders.length === 0 && <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-black text-[1rem]">Your OrderList is empty</h1>
      </div>
      }
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <ImSpinner4 color="black" size={30} className="animate-rotate" />
        </div>
      ) : (
        <div className="h-full w-[90%] grid  grid-cols-2 place-content-start place-items-center overflow-y-scroll scrollbar-hide pt-5 box-border gap-x-0 gap-y-3 lg:gap-x-6 lg:gap-y-6">
          {orders?.map((order: any, i: number) => (
            <Ordered key={i} order={order} deliveryState={order.status} />
          ))}
        </div>
      )}
    </div>
  );
}
export default dynamic(() => Promise.resolve(Order), {
  ssr: false,
});
