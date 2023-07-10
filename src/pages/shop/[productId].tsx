/* eslint-disable @next/next/no-img-element */

import Carouselcomponent from "@/components/Carousel";
import Colour from "@/components/Colour";
import Header from "@/components/Header";
import Size from "@/components/Size";
import Specification from "@/components/Specification";
import { useAppContext } from "@/contexts/AppContext";
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
  buyingItem: boolean;
};

function ShopItem({ productId }: { productId: any }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState<Loading>({
    gettingInformation: false,
    addingToCart: false,
    buyingItem: false,
  });
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [selectedColor, setSelectedColor] = useState<any>({});
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false)
  const { setIsAuthModalVisible, setCart } = useAppContext();
  const [error, seterror] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/product?id=${productId}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setProduct(data);
      }
      setLoading({ ...loading, gettingInformation: false });
    } catch (error) {
      setLoading({ ...loading, gettingInformation: false });
      ;
      setHasError(true)
    }
  };

  const addToCart = async (
    productId: string,
    type: "add" | "buy",
    callback?: (data: any) => void
  ) => {
    let errFinder = {
      color: Object.keys(selectedColor).length > 0,
      size: selectedSize? true:false,
      quantity: quantity > 0,
    };
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (
        Object.keys(selectedColor).length > 0 &&
        selectedSize &&
        quantity > 0
      ) {
        if (Object.keys(user).length > 0) {
          setLoading(
            type === "add"
              ? { ...loading, addingToCart: true }
              : { ...loading, buyingItem: true }
          );
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
            method: "post",
            body: JSON.stringify({
              productId,
              phone: user.phone,
              color: selectedColor,
              size: selectedSize,
              quantity: quantity,
            }),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!data.error) {
            setIsAddedToCart(true);
            getCart(setCart);
            callback?.(data.product);
          }
          setLoading(
            type === "add"
              ? { ...loading, addingToCart: false }
              : { ...loading, buyingItem: false }
          );
        } else {
          setIsAuthModalVisible(true);
        }
      } else {
        let allErrors: any[] = [];
        Object.values(errFinder).map((item, i) => {
          if (item === false) {
            allErrors = [...allErrors, Object.keys(errFinder)[i].toString()];
          } else {
            allErrors = allErrors.filter(
              (item) => item !== Object.keys(errFinder)[i].toString()
            );
          }
          seterror(allErrors);
        });
      }
    } catch (error) {
      setLoading(
        type === "add"
          ? { ...loading, addingToCart: false }
          : { ...loading, buyingItem: false }
      );
      ;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const buyItem = async (productId: any) => {
    await addToCart(productId, "buy", (product) => {
      router.push(`/checkout/${product.cartItemId}`);
    });
  };

  return (
    <div className="min-h-[100vh] w-full bg-white flex flex-col items-start justify-center scrollbar-hide pt-[50px] lg:pt-[100px]">
      <Header />
      {
          hasError && (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
             <h1 className="text-[1rem] text-black">Something went wrong!!</h1>
             <button onClick={getProduct} className="bg-transparent text-black text-[0.85rem] mt-1">Try again</button>
          </div>
          )
        }
      {loading.gettingInformation ? (
        <div className="h-[80vh]  w-full flex items-center justify-center">
          <ImSpinner4 color="black" size={36} className="animate-rotate" />
        </div>
      ) : (
        <div className="h-auto w-full flex lg:flex-row flex-col lg:items-start items-center justify-center">
          <div className="h-full lg:w-[40%] flex bg-white justify-center items-start pt-4 box-border ">
            <Carouselcomponent images={product?.images ?? []} />
          </div>
          <div className="h-full lg:w-[50%] w-[90%] flex flex-col bg-white justify-start items-start lg:pl-10 pl-5 box-border">
            <h1 className="text-2xl font-bold lg:mt-10 mt-3 text-black">
              {product?.name}
            </h1>
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
            {error.includes("quantity") && (
            <span className="text-[11px] font-medium text-red-500">
              quantity is required
            </span>
          )}
            <h1 className="lg:text-xs text-sm mt-2 text-black">Colors</h1>
            <div className="h-[50px] w-auto  flex justify-between items-center my-2">
              {/* <Colour colour="black" colourName="Black" />

                <Colour colour="white" colourName="White" />
                <Colour colour="red" colourName="Red" /> */}

              {product?.colors?.map((item: any, i: number) => (
                <Colour
                  key={i}
                  isActive={selectedColor == item}
                  onClick={() => handleClickSizeColor(item)}
                  colour={item.code}
                  colourName={item.name}
                />
              ))}
            </div>
            {error.includes("color") && (
            <span className="text-[11px] font-medium text-red-500">
              color is required
            </span>
          )}
            <h1 className="lg:text-xs text-sm mt-2 text-black">Size</h1>
            <div className="h-[50px] w-[300px] flex justify-between items-center my-2">
              {product?.sizes?.map((item:any, i:number) => (
                <Size
                  key={i}
                  isActive={selectedSize === item}
                  onClick={() => handleClickSizeButton(item)}
                  size={item}
                />
              ))}
              <div className="text-xs w-[100px] ">Size Chart</div>
            </div>
            {error.includes("size") && (
            <span className="text-[11px] font-medium text-red-500 ">
              size is required
            </span>
          )}
            <div className="min-h-[45px] w-[260px] flex justify-between items-center my-2  ">
              <div
                onClick={() => {
                  if (isAddedToCart) return;
                  addToCart(productId, "add");
                }}
                className="h-full min-h-[40px] w-[47%] rounded-md bg-black flex items-center justify-evenly cursor-pointer"
              >
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
                onClick={() => buyItem(productId)}
                className="h-full min-h-[40px] w-[47%] rounded-md  flex items-center justify-evenly border-[1px] border-black cursor-pointer "
              >
                {loading.buyingItem ? (
                  <ImSpinner4
                    color="black"
                    size={16}
                    className="animate-rotate"
                  />
                ) : (
                  <>
                    <img
                      className="h-[15px] w-[15px]"
                      src="/svg/buy.svg"
                      alt=""
                    />
                    <h1 className=" text-xs font-medium -ml-2 text-black">
                      Buy Now
                    </h1>
                  </>
                )}
              </div>
            </div>

            <h1 className="lg:text-lg text-xl font-medium my-3 text-black">
              Specifications
            </h1>

            <div className="lg:h-[300px] h-[500px] lg:w-[70%] w-[95%] mb-5">
              <Specification details={product.details} quantity={quantity} size={selectedSize} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ShopItem), { ssr: false });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query.productId;

  return {
    props: {
      productId,
    },
  };
};
