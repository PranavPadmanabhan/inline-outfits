import Carouselcomponent from "@/components/Carousel";
import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";

import React, { useEffect, useState } from "react";

type Loading = {
  loading: boolean;
};

function Order({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>({});
  const [loading, setLoading] = useState<Loading>({
    loading: false,
  });
  const [isConformationModalVisible, setIsConformationModalVisible] =
    useState<boolean>(false);
  const [changeType, setChangeType] = useState<"In Factory" | "Shipped" | null>(
    null
  );

  const getOrder = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin")!);
      setLoading({ ...loading, loading: true });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${admin?.phone}/${orderId}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setOrder(data);
        console.log(data);
      }
      setLoading({ ...loading, loading: false });
    } catch (error) {
      setLoading({ ...loading, loading: false });
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const RenderButtons = ({ status }: { status: string }) => {
    if (status === "Order Placed") {
      return (
        <div className="flex justify-between items-center w-[200px] h-[35px] my-2">
          <button
            onClick={() => {
              setChangeType("In Factory");
              setIsConformationModalVisible(true);
            }}
            className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]"
          >
            {" "}
            Send To Print
          </button>
          <button
            onClick={() => {
              setChangeType("Shipped");
              setIsConformationModalVisible(true);
            }}
            className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]"
          >
            {" "}
            Shipped
          </button>
        </div>
      );
    } else if (status === "In Factory") {
      return (
        <div className="flex justify-start items-center w-[200px] h-[35px] my-2">
          <button
            onClick={() => {
              setChangeType("Shipped");
              setIsConformationModalVisible(true);
            }}
            className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]"
          >
            {" "}
            Shipped
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  };

  return (
    <div className="h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]">
      <Header />

      <div className="h-[100%] w-full flex   items-center justify-start">
        <div className="h-[100%] w-[50%] flex items-center justify-center">
          {/* <img
            className="h-[80%] w-[80%] flex items-center justify-center"
            src="/svg/T4.svg"
            alt=""
          /> */}
          {Object.keys(order).length > 0 && (
            <Carouselcomponent images={order.product.product.images} />
          )}
        </div>

        <div className="h-[100%] w-[50%] flex flex-col items-center justify-center">
          <div className="w-full h-[85%] flex flex-col items-start justify-start ">
            <span className="text-black font-[600] text-[1.6rem] my-1 ">
              {order?.product?.product?.name}
            </span>
            <p className="text-lightGray text-[0.9rem] font-[400] ">
              {order?.product?.product?.description}
            </p>

            <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
              <h1 className="font-medium text-[23px] text-black">Rs {order?.product?.product?.price?.original}</h1>
              <h1 className="font-medium text-[17px] text-[#00000094] mx-2 line-through">
                Rs{" "}
                {Math.round(
                  order?.product?.product?.price?.original *
                    (100 /
                      (100 - parseFloat(order?.product?.product?.price?.offer)))
                )}
              </h1>
              <h1 className="font-medium text-[15px] text-lightRed">25% off</h1>
            </div>

            <span className="text-[0.9rem] font-[500] text-black mt-1">
              {" "}
              Quantity : <span>{order?.product?.quantity} </span>
            </span>

            <div className="h-[65px] w-[150px] flex items-start justify-start my-2 -ml-5">
              <div className="h-full w-[50%] flex flex-col items-center justify-start">
                <span className="text-[0.7rem] text-black  ">Color</span>
                <div
                  style={{ backgroundColor: order?.product?.color?.code }}
                  className=" h-[33px] w-[33px] rounded-full"
                ></div>
                <span className="text-[0.6rem] text-black">
                  {" "}
                  {order?.product?.color?.name}
                </span>
              </div>

              <div className="h-full w-[50%] flex flex-col items-center justify-start">
                <span className="text-[0.7rem] text-black ">Size</span>
                <div className=" h-[33px] w-[33px] border-[1px] border-black rounded-full flex text-black items-center justify-center text-[0.7rem]">
                  {order?.product?.size}
                </div>
              </div>
            </div>

            <span className="text-[1.2rem]  font-[700] text-black my-1">
              Delivery Address
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.Name}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.Address}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.LandMark}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.Locality}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.CityorDistrict}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.State}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.PinCode}
            </span>
            <span className="text-[1rem]   text-black ">
              {order?.address?.Phone}
            </span>

            {/* <div className="flex justify-between items-center w-[200px] h-[35px] my-3">
              <button className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#c5e610]">
                {" "}
                Send To Print
              </button>
              <button className="h-full w-[45%] rounded-md justify-center items-center flex text-[0.8rem] bg-[#00CCCC]">
                {" "}
                Shipped
              </button>
            </div> */}
            <RenderButtons status={order?.status} />
          </div>
        </div>
      </div>
      {isConformationModalVisible && Object.keys(order).length > 0 && (
        <ConfirmationModal
          order={order}
          setIsModalVisbile={setIsConformationModalVisible}
          changeType={changeType}
          get={getOrder}
        />
      )}
    </div>
  );
}

export default Order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderId = context.query.orderId;
  return {
    props: {
      orderId,
    },
  };
};
