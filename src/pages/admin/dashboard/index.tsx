import Header from "@/components/Header";
import OrderedProduct from "@/components/OrderedProduct";
import TabBar from "@/components/TabBar";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "AllOrders" | "InFactory" | "Shipped"
  >("AllOrders");
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [inFactory, setInFactory] = useState<any[]>([]);
  const [shippedOrders, setShippedOrders] = useState<any[]>([]);

  const getOrders = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin")!);
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${admin?.phone}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setAllOrders(data);
        setInFactory(data?.filter((item: any) => item.status === "In Factory"));
        setShippedOrders(
          data?.filter((item: any) => item.status === "Shipped")
        );
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

  const RenderTabs = () => {
    switch (activeTab) {
      case "AllOrders":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 gap-2 ">
            {allOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.products[0]?.product?.color}
                description={item?.products[0]?.product?.description}
                image={item?.products[0]?.product?.images[0]}
                name={item?.products[0]?.product?.name}
                size={item?.products[0]?.product?.size}
                status={item?.status}
                totalQuantity={item?.products[0]?.product?.quantity}
              />
            ))}
          </div>
        );

      case "InFactory":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 gap-2 ">
            {inFactory.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.products[0]?.product?.color}
                description={item?.products[0]?.product?.description}
                image={item?.products[0]?.product?.images[0]}
                name={item?.products[0]?.product?.name}
                size={item?.products[0]?.product?.size}
                status={item?.status}
                totalQuantity={item?.products[0]?.product?.quantity}
              />
            ))}
          </div>
        );

      case "Shipped":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 gap-2 ">
           {shippedOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.products[0]?.product?.color}
                description={item?.products[0]?.product?.description}
                image={item?.products[0]?.product?.images[0]}
                name={item?.products[0]?.product?.name}
                size={item?.products[0]?.product?.size}
                status={item?.status}
                totalQuantity={item?.products[0]?.product?.quantity}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="min-h-[] w-[90%]  grid grid-cols-2 gap-2 ">
           {allOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.products[0]?.product?.color}
                description={item?.products[0]?.product?.description}
                image={item?.products[0]?.product?.images[0]}
                name={item?.products[0]?.product?.name}
                size={item?.products[0]?.product?.size}
                status={item?.status}
                totalQuantity={item?.products[0]?.product?.quantity}
              />
            ))}
          </div>
        );
    }
  };
  return (
    <div className="min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]">
      <Header />
      <div className="h-full w-full flex  flex-col items-center justify-start">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="h-[45px] w-[150px] bg-black rounded-md -ml-[78%] my-5">
          Sort by date
        </div>

        <RenderTabs />
      </div>
      {/* {loading && <ProductUpload/>} */}
    </div>
  );
}

export default Dashboard;
