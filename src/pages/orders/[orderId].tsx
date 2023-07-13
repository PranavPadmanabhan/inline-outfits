/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import TypeOfSpec from "@/components/TypeOfSpec";
import { GetServerSideProps } from "next";
import { ImSpinner4 } from "react-icons/im";
import Carouselcomponent from "@/components/Carousel";
import { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import Head from "next/head";


type Loading = {
  gettingInformation: boolean;
};

function Order({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<Loading>({
    gettingInformation: false,
  });
  const [order, setOrder] = useState<any>({});
  const [hasError, setHasError] = useState<boolean>(false);

  const getOrder = async () => {
    try {
      setLoading({ ...loading, gettingInformation: true });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/order/${orderId}`,
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
      }
      setLoading({ ...loading, gettingInformation: false });
    } catch (error) {
      setLoading({ ...loading, gettingInformation: false });
      setHasError(true);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[80px]">
       <Head>
        <title>In&O | My Order - {orderId.slice(0,7)}</title>
      </Head>
      <Header />
      {loading.gettingInformation && <TopBarProgress />}
      {loading.gettingInformation ? (
        <div className="h-[80vh]  w-full flex items-center justify-center">
          <ImSpinner4 color="black" size={36} className="animate-rotate" />
        </div>
      ) : (
        <div className="h-[100%] w-[100%] flex items-start justify-center ">
          <div className="h-full lg:w-[40%] flex bg-white justify-center items-start pt-16 box-border ">
           
            <Carouselcomponent images={order?.product?.product?.images??[]} />
          </div>
          <div className="h-[100%] lg:w-[50%] w-[90%] flex flex-col bg-white justify-start items-start lg:pl-10 pl-5 box-border ">
            <h1 className="text-2xl font-bold  mt-3 text-black">
              {order?.product?.product?.name}
            </h1>
            <h1 className="text-[16px] text-[#000000a6] font-light mb-1">
              {order?.product?.product?.description}
            </h1>
            <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
              <h1 className="font-medium text-[23px] text-black">
                Rs {order?.product?.product?.price?.original}
              </h1>
              <h1 className="font-medium text-[17px] text-[#00000094] mx-2 line-through">
                Rs{" "}
                {Math.round(
                  order?.product?.product?.price?.original *
                    (100 /
                      (100 - parseFloat(order?.product?.product?.price?.offer)))
                )}
              </h1>
              <h1 className="font-medium text-[15px] text-lightRed">
                {" "}
                {order?.product?.product?.price?.offer}% off
              </h1>
            </div>
            <span className="text-[1rem] text-black font-[600] mt-1">
              Quantity :{" "}
              <span className="text-[1rem] text-black font-[600]">
                {" "}
                {order?.product?.quantity}
              </span>
            </span>

            <div className="h-[65px] w-[120px] flex items-start justify-start my-1 -ml-4">
              <div className="h-full w-[50%] flex flex-col items-center justify-start">
                <span className="text-[0.7rem] text-black  ">Color</span>
                <div
                  style={{ backgroundColor: order?.product?.color?.code }}
                  className=" h-[33px] w-[33px] rounded-full"
                ></div>
                <span className="text-[0.6rem] text-black">
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

            <div className="h-[30px] w-[300px]  flex items-center justify-start">
              <img
                src="/svg/delivery.svg"
                alt=""
                className="h-[30px] w-[30px]"
              />
              <span className="text-[1rem] font-[600] text-[#00CC39] ml-3">
                {" "}
                Delevery within 7-10 days
              </span>
            </div>

            <div className="h-[300px] w-full flex items-center justify-center ">
              <div className="h-full w-[50%] flex flex-col justify-start items-start ">
                <h1 className="lg:text-lg text-xl font-medium my-2 text-black">
                  Specifications
                </h1>

                <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col justify-start lg:items-center items-start">
                  <TypeOfSpec
                    Spec="Type"
                    SpecDetails={order?.product?.product?.details?.neckType}
                  />
                  <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
                </div>

                <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                  <TypeOfSpec
                    Spec="Sleeve"
                    SpecDetails={order?.product?.product?.details?.sleeveType}
                  />
                  <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
                </div>

                <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                  <TypeOfSpec
                    Spec="Fit"
                    SpecDetails={order?.product?.product?.details?.fit}
                  />
                  <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
                </div>

                <div className="lg:h-[25%] h-[15%] w-[100%] border-t-[1px] border-[#00000025] flex  lg:flex-row flex-col  justify-start lg:items-center items-start mb-1">
                  <TypeOfSpec
                    Spec="Fabric"
                    SpecDetails={order?.product?.product?.details?.fabric}
                  />
                </div>

                <div className="h-[25%] w-[100%] border-t-[1px] border-[#00000025] flex lg:flex-row flex-col  justify-start lg:items-center items-start ">
                  <TypeOfSpec
                    Spec="Fabric Care"
                    SpecDetails={order?.product?.product?.details?.fabricCare}
                  />
                  <div className="h-[1px] w-[100%] bg-[#00000025] lg:hidden"></div>
                </div>
              </div>

              <div className="h-full w-[50%] flex flex-col justify-start items-center  ">
                <h1 className="lg:text-lg text-xl font-medium my-3 text-black">
                  Delivery Address
                </h1>

                <div className="min-h-[170px] w-[170px] border-[1px] border-[#00000013] rounded-lg flex flex-col items-center justify-center">
                  <h1 className="text-xs text-black">
                    {" "}
                    {order?.address?.Name}
                  </h1>
                  <h1 className="text-xs text-black">
                    {" "}
                    {order?.address?.Address}
                  </h1>
                  <h1 className="text-xs mt-1 text-black">
                    {order?.address?.Locality}{" "}
                  </h1>
                  <h1 className="text-xs mt-1 text-black">
                    {order?.address?.CityOrDistrict}{" "}
                  </h1>
                  <h1 className="text-xs mt-1 text-black">
                    {order?.address?.State}{" "}
                  </h1>
                  <h1 className="text-xs mt-1 text-black">
                    {order?.address?.PinCode}{" "}
                  </h1>
                  <h1 className="text-xs mt-1 text-black">
                    {order?.address?.Phone}{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
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
