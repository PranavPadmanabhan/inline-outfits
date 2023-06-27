/* eslint-disable @next/next/no-img-element */

import Carouselcomponent from "@/components/Carousel";
import Colour from "@/components/Colour";
import Header from "@/components/Header";
import Personalize from "@/components/Personalize";
import Size from "@/components/Size";
import Specification from "@/components/Specification";
import Axios from "@/config/AxiosConfig";
import { useAppContext } from "@/contexts/AppContext";
import AuthLayout from "@/layout/AuthLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ImSpinner4 } from "react-icons/im";
import { getCart } from "../cart";
import dynamic from "next/dynamic";

type Loading = {
  gettingInformation: boolean;
  addingToCart: boolean;
};

function ShopItem({ productId }: { productId: any }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState<Loading>({
    gettingInformation: false,
    addingToCart: false,
  });

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [selectedColor, setSelectedColor] = useState<any>({});
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const { setIsAuthModalVisible,setCart } = useAppContext();
  const [quantity, setQuantity] = useState<number>(0)

  const handleClickSizeButton = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  const handleClickSizeColor = (color: any) => {
    if (selectedColor === color) {
      setSelectedColor({});
    } else {
      setSelectedColor(color);
    }
  };

  const getProduct = async () => {
    try {
      setLoading({ ...loading, gettingInformation: true });
      const res = await Axios.get(`/products/product?id=${productId}`);
      const data = await res.data;
      if (!data.error) {
        setProduct(data);
      }
      setLoading({ ...loading, gettingInformation: false });
    } catch (error) {
      setLoading({ ...loading, gettingInformation: false });
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (Object.keys(selectedColor).length > 0 && selectedSize) {
        if (Object.keys(user).length > 0) {
          setLoading({ ...loading, addingToCart: true });
          const res = await Axios.post(`/cart`, {
            productId,
            phone: user.phone,
            color: selectedColor,
            size: selectedSize,
            quantity:1
          });
          const data = await res.data;
          if (!data.error) {
            setIsAddedToCart(true);
            getCart(setCart)
          }
          setLoading({ ...loading, addingToCart: false });
        } else {
          setIsAuthModalVisible(true);
        }
      } else {
        return;
      }
    } catch (error) {
      setLoading({ ...loading, addingToCart: false });
    }
  };

  useEffect(() => {
    getProduct();
  }, []);



  return (
      <div className="min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide">
        <Header />
        {loading.gettingInformation ? (
          <div className="h-[80vh]  w-full flex items-center justify-center">
            <ImSpinner4 color="black" size={36} className="animate-rotate" />
          </div>
        ) : (
          <div className="h-auto w-full flex items-start justify-center">
            <div className="h-full w-[40%] flex bg-white justify-center items-start pt-4 box-border ">
              <Carouselcomponent images={product?.images ?? []} />
            </div>
            <div className="h-full w-[50%] flex flex-col bg-white justify-start items-start pl-10">
              <h1 className="text-2xl font-bold mt-10 text-black">{product?.name}</h1>
              <h1 className="text-[16px] text-[#000000a6] font-light my-1">
                {product?.description}
              </h1>
              <div className="h-[20px] w-[100%] flex items-center justify-start my-2">
                <h1 className="font-medium text-[23px] text-black">
                  Rs {product?.price?.original}
                </h1>
                <h1 className="font-medium text-[17px] text-[#00000094] mx-2 line-through">
                  Rs{" "}
                  {Math.round(
                    product?.price?.original *
                      (100 / (100 - parseFloat(product?.price?.offer)))
                  )}
                </h1>
                <h1 className="font-medium text-[15px] text-lightRed">
                  {product?.price?.offer}% off
                </h1>
              </div>


              <div className="min-w-[90px] min-h-[35px] rounded-[5px] border-[1px] border-gray-500 mt-2 flex items-center justify-between px-1 box-border">
            <button
              onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
              className="text-black text-[1.2rem] font-[500] ml-1"
            >
              &#45;
            </button>
            <span className="text-black text-[1.3rem] font-[500] ">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-black text-[1.3rem] font-[500] mr-1"
            >
              +
            </button>
          </div>


              <h1 className="text-xs mt-2 text-black">Colors</h1>
              <div className="h-[50px] w-auto  flex justify-between items-center my-2">
                {/* <Colour colour="black" colourName="Black" />

                <Colour colour="white" colourName="White" />
                <Colour colour="red" colourName="Red" /> */}

                {
                  product?.colors?.map((item:any,i:number) => (
                    <Colour key={i} isActive={selectedColor == item} onClick={() => handleClickSizeColor(item)} colour={item.code} colourName={item.name} />
                  ))
                }
              </div>

              <h1 className="text-xs mt-2 text-black">Size</h1>
              <div className="h-[50px] w-[300px] flex justify-between items-center my-2">
                {sizes.map((item, i) => (
                  <Size
                    key={i}
                    isActive={selectedSize === item}
                    onClick={() => handleClickSizeButton(item)}
                    size={item}
                  />
                ))}
                <div className="text-xs w-[100px] ">Size Chart</div>
              </div>
              <div className="min-h-[45px] w-[260px] flex justify-between items-center my-2  ">
                <div onClick={() => {
                  if(isAddedToCart) return
                  addToCart(productId)
                }} className="h-full min-h-[40px] w-[47%] rounded-md bg-black flex items-center justify-evenly cursor-pointer">
                  {loading.addingToCart ? (
                    <>
                      <ImSpinner4
                        color="white"
                        size={16}
                        className="animate-rotate"
                      />
                      <h1 className="text-white text-xs font-medium ">
                        Adding To Cart..
                      </h1>
                    </>
                  ) : isAddedToCart ? (
                    <>
                      <AiOutlineCheck color="white" size={18} />
                      <h1 className="text-white text-xs font-medium ">
                        Add To Cart
                      </h1>
                    </>
                  ) : (
                    <>
                      <img
                        className="h-[15px] w-[15px]"
                        src="/svg/Cart.svg"
                        alt=""
                      />
                      <h1 className="text-white text-xs font-medium ">
                        Add To Cart
                      </h1>
                    </>
                  )}
                </div>
                <div
                  onClick={() => router.push("/delivery")}
                  className="h-full min-h-[40px] w-[47%] rounded-md  flex items-center justify-evenly border-[1px] border-black cursor-pointer "
                >
                  <img
                    className="h-[15px] w-[15px]"
                    src="/svg/buy.svg"
                    alt=""
                  />
                  <h1 className=" text-xs font-medium -ml-2 text-black">Buy Now</h1>
                </div>
              </div>

              <h1 className="text-lg font-medium my-3 text-black">Specifications</h1>

              <div className="h-[300px] w-[70%]  mb-5">
                <Specification details={product.details} />
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default dynamic(() => Promise.resolve(ShopItem),{ssr:false});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query.productId;

  return {
    props: {
      productId,
    },
  };
};
