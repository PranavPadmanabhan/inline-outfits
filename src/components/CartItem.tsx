/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";

type Loading = {
  removingItem: boolean;
  deletingItem: boolean;
};

function CartItem({
  description,
  finalPrice,
  image,
  name,
  price,
  offer,
  totalQuantity,
  product,
  getProducts,
}: {
  image: string;
  name: string;
  description: string;
  price: string | number;
  offer?: string | number;
  finalPrice: string | number;
  totalQuantity: number;
  product: any;
  getProducts: any;
}) {
  const [quantity, setQuantity] = useState<number>(totalQuantity);
  const [loading, setLoading] = useState<Loading>({
    removingItem: false,
    deletingItem: false,
  });
  const router = useRouter();

  const reduceQuantity = async (item: any, quantity: any) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (Object.keys(user).length > 0) {
        setLoading({ ...loading, removingItem: true });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/reduce`,
          {
            method: "put",
            body: JSON.stringify({
              cartItemId: item.cartItemId,
              productId: item.productId,
              phone: user.phone,
              color: item.color,
              size: item.size,
              quantity,
            }),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.error) {
          getProducts();
        }
        setLoading({ ...loading, removingItem: false });
      } else {
        return;
      }
    } catch (error) {
      setLoading({ ...loading, removingItem: false });
      ;
    }
  };

  const deleteItem = async (item: any) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (Object.keys(user).length > 0) {
        setLoading({ ...loading, deletingItem: true });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/remove`,
          {
            method: "put",
            body: JSON.stringify({
              cartItemId: item.cartItemId,
              productId: item.productId,
              phone: user.phone,
            }),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.error) {
          getProducts(user.phone, user.VerifiedUser);
        }
        setLoading({ ...loading, deletingItem: false });
      } else {
        return;
      }
    } catch (error) {
      setLoading({ ...loading, deletingItem: false });
      ;
    }
  };

  useEffect(() => {
    if (totalQuantity !== quantity) {
      reduceQuantity(product, quantity);
    }
  }, [quantity]);

  return (
    <div className="w-full lg:h-[28vh] h-[25vh] px-[2%] box-border flex lg:flex-row flex-col items-center justify-between my-8">
      <div className="w-full lg:w-[68%] h-[80%] lg:h-full flex items-center justify-start">
        <img
          src={image}
          alt=""
          className="h-[90%] lg:h-full lg:w-[40%] w-[35%] max-w-[180px] object-cover rounded-[20px]"
        />
        <div className="w-full h-full flex flex-col items-start justify-start pl-5 box-border">
          <span className="text-black font-[600] text-[1.1rem] mt-1">
            {name}
          </span>
          <p className="text-lightGray text-[0.9rem] font-[400] mb-0 lg:mb-2">
            {description}
          </p>
          <span className="text-black font-[600] text-[1.1rem] lg:text-[1.5rem]">
            ₹{offer ? finalPrice : price}{" "}
            {offer && (
              <>
                <span className="text-lightGray font-[400] text-[0.96rem] ml-[2px] line-through	">
                  ₹{offer ? price : ""}{" "}
                </span>
                <span className="text-lightRed opacity-60 font-[600] ml-1 text-[0.9rem] lg:text-[0.96rem]">
                  {" "}
                  {offer}% off
                </span>
              </>
            )}
          </span>
          <div className="w-full h-auto flex flex-row lg:flex-col items-center justify-start">
          <span className="text-black text-[1rem] font-[300]">
            size : <span className="font-[700]">{product?.size}</span>
          </span>
          <span className="text-black text-[1rem] font-[300] ml-3">
            color :{" "}
            <span
              style={{ color: product?.color?.code }}
              className="font-[700]"
            >
              {product?.color?.name}
            </span>
          </span>
          </div>
          <div className="min-w-[90px] lg:min-h-[35px] min-h-[30px] rounded-[5px] border-[1px] border-gray-500 mt-2 flex items-center justify-between px-1 box-border">
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
        </div>
      </div>
      <div className="w-full h-[40px] mt-1 flex sm:hidden items-center justify-between ">
      <button
          onClick={() => deleteItem(product)}
          className="w-[45%] h-full rounded-[10px] bg-white border-[1px] border-black flex items-center justify-center"
        >
          {loading.deletingItem ? (
            <ImSpinner4 color="black" size={22} className="animate-rotate" />
          ) : (
            <>
              {/* { totalQuantity === quantity &&   */}
              <img
                className="h-[15px] w-[15px] ml-1"
                src="/svg/trash.svg"
                alt=""
              />
              {/* } */}
              <h1 className="text-black text-[0.9rem] font-bold ml-3">
                {/* {totalQuantity === quantity ? "Delete" : "Save"} */}
                delete
              </h1>
            </>
          )}
        </button>
        <button
          onClick={() => router.push(`/checkout/${product.cartItemId}`)}
          className="w-[45%] h-full rounded-[10px] bg-black flex items-center justify-center "
        >
          <img className="h-[15px] w-[15px] ml-1" src="/svg/Cart.svg" alt="" />
          <h1 className="text-white text-[0.85rem] font-medium ml-2">
             Checkout
          </h1>
        </button>
      </div>
      <div className="hidden h-full w-[32%] lg:flex flex-col items-center justify-end px-[3%] box-border">
        <button
          onClick={() => deleteItem(product)}
          className="w-full min-h-[43px] rounded-[10px] bg-white border-[1px] border-black flex items-center justify-center mb-2"
        >
          {loading.deletingItem ? (
            <ImSpinner4 color="black" size={22} className="animate-rotate" />
          ) : (
            <>
              {/* { totalQuantity === quantity &&   */}
              <img
                className="h-[18] w-[18px] ml-1"
                src="/svg/trash.svg"
                alt=""
              />
              {/* } */}
              <h1 className="text-black text-[1rem] font-bold ml-3">
                {/* {totalQuantity === quantity ? "Delete" : "Save"} */}
                delete
              </h1>
            </>
          )}
        </button>
        <button
          onClick={() => router.push(`/checkout/${product.cartItemId}`)}
          className="w-full min-h-[43px] rounded-[10px] bg-black flex items-center justify-center mb-1"
        >
          <img className="h-[18] w-[18px] ml-1" src="/svg/Cart.svg" alt="" />
          <h1 className="text-white text-[1rem] font-medium ml-2">
            Proceed to Checkout
          </h1>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
