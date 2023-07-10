import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import OrderedProduct from "@/components/OrderedProduct";
import TabBar from "@/components/TabBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "AllOrders" | "InFactory" | "Shipped" |"Delivered" |"Replacement Requests"
  >("AllOrders");
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [inFactory, setInFactory] = useState<any[]>([]);
  const [shippedOrders, setShippedOrders] = useState<any[]>([]);
  const [delivered, setDelivered] = useState<any[]>([]);
  const [replacements, setReplacements] = useState<any[]>([]);

  const [isConformationModalVisible, setIsConformationModalVisible] =
    useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<any>({});
  const [changeType, setChangeType] = useState<"In Factory" | "Shipped" |"Delivered" |"Replacement Requests"| null>(
    null
  );
  const router = useRouter();

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
        setAllOrders(
          data?.filter((item: any) => item.status === "Order Placed")
        );
        setInFactory(data?.filter((item: any) => item.status === "In Factory"));
        setShippedOrders(
          data?.filter((item: any) => item.status === "Shipped")
        );
        setDelivered(
          data?.filter((item: any) => item.status === "Delivered")
        );
        setReplacements(
          data?.filter((item: any) => item.status === "Requested Replacement")
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  const getUpdatedOrders = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin")!);
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
        setAllOrders(
          data?.filter((item: any) => item.status === "Order Placed")
        );
        setInFactory(data?.filter((item: any) => item.status === "In Factory"));
        setShippedOrders(
          data?.filter((item: any) => item.status === "Shipped")
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  const RenderTabs = () => {
    switch (activeTab) {
      case "AllOrders":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start gap-2 ">
            {allOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                deliverybtnClick={() =>{
                  setChangeType("Delivered");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
              />
            ))}
          </div>
        );

      case "InFactory":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start gap-2 ">
            {inFactory.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                deliverybtnClick={() =>{
                  setChangeType("Delivered");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
              />
            ))}
          </div>
        );

      case "Shipped":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start gap-2 ">
            {shippedOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                deliverybtnClick={() =>{
                  setChangeType("Delivered");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
              />
            ))}
          </div>
        );
        case "Delivered":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start gap-2 ">
            {delivered.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                deliverybtnClick={() =>{
                  setChangeType("Delivered");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
              />
            ))}
          </div>
        );
        case "Replacement Requests":
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start gap-2 ">
            {replacements.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                deliverybtnClick={() =>{
                  setChangeType("Delivered");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="min-h-[60vh] w-[90%]  grid grid-cols-2 place-content-start place-items-start  gap-2 ">
            {allOrders.map((item: any, i: number) => (
              <OrderedProduct
                key={i}
                color={item?.product?.color}
                description={item?.product?.product?.description}
                image={item?.product?.product?.images[0]}
                name={item?.product?.product?.name}
                size={item?.product?.size}
                status={item?.status}
                totalQuantity={item?.product?.quantity}
                factorybtnOnClick={() => {
                  setChangeType("In Factory");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                shippingbtnOnClick={() => {
                  setChangeType("Shipped");
                  setActiveOrder(item);
                  setIsConformationModalVisible(true);
                }}
                onClick={() => router.push(`/admin/dashboard/${item?.orderId}`)}
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

        <div className="h-[45px] w-[150px] bg-black rounded-md flex items-center justify-center -ml-[78%] my-5">
          Sort by date
        </div>

        <RenderTabs />
      </div>
      {isConformationModalVisible && Object.keys(activeOrder).length > 0 && (
        <ConfirmationModal
          order={activeOrder}
          setIsModalVisbile={setIsConformationModalVisible}
          changeType={changeType}
          get={getUpdatedOrders}
        />
      )}
    </div>
  );
}

export default Dashboard;
