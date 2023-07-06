/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createRazorpayOrder, loadRazorpayScript } from "@/utils/razorpay";
import OrderItem from "@/components/OrderItem";
import { ImSpinner4 } from "react-icons/im";
import { useRouter } from "next/router";
import { getCart } from "@/pages/cart";

type Address = {
  name: string;
  phone: string;
  locality: string;
  pinCode: string;
  address: string;
  city: string;
  state: string;
  landMark: string;
  alternateNumber: string;
};

type error = {
  name: string;
  phone: string;
  locality: string;
  pinCode: string;
  address: string;
  city: string;
  state: string;
  landMark: string;
  alternateNumber: string;
};

type Loading = {
  saving: boolean;
  placingOrder: boolean;
};

function IndividualDeliveryAddress({ cartItemId }: { cartItemId: string }) {
  const [newAddress, SetnewAddress] = useState(false);
  const [cartItem, SetCartItem] = useState<any>({});
  const [deliveryFee, setDeliveryFee] = useState<number>(50);
  const [user, setUser] = useState<any>({});
  const [isHomeAddress, setIsHomeAddress] = useState<boolean>(true);
  const [address, setAddress] = useState<Address>({
    address: "",
    alternateNumber: "",
    city: "",
    landMark: "",
    locality: "",
    name: "",
    phone: "",
    pinCode: "",
    state: "",
  });
  const [error, setError] = useState<any>([]);
  const [loading, setLoading] = useState<Loading>({
    saving: false,
    placingOrder: false,
  });
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const router = useRouter();
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const { cart, setCart } = useAppContext();

  useEffect(() => {
    getCart(setCart, setLoadingProduct, null, SetCartItem, cartItemId);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${user?.phone}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        setUser(data);
        localStorage.setItem("user",JSON.stringify(data))
      }
    } catch (error) {}
  };

  const updateAddress = async () => {
    try {
      if (
        address.address.trim().length > 0 &&
        address.city.trim().length > 0 &&
        address.name.trim().length > 0 &&
        address.pinCode.trim().length > 0 &&
        address.state.trim().length > 0 &&
        address.locality.trim().length > 0
      ) {
        setLoading({ ...loading, saving: true });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${user?.phone}`,
          {
            method: "put",
            body: JSON.stringify({
                addresses : [...user?.addresses, { ...address, isHomeAddress }]
            }),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.error) {
          getUser();
          setError([]);
          SetnewAddress(false);
        }
        setLoading({ ...loading, saving: false });
      } else {
        let allErrors: string[] = [];
        Object.values(address).map((item, i) => {
          if (item.trim().length <= 0) {
            if (!allErrors.includes(Object.keys(address)[i].toString())) {
              allErrors = [...allErrors, Object.keys(address)[i].toString()];
            }
          } else {
            allErrors = allErrors.filter(
              (item) => item !== Object.keys(address)[i].toString()
            );
          }
          setError(allErrors);
        });
      }
    } catch (error) {
      setLoading({ ...loading, saving: false });
    }
  };

  const initializePayment = async () => {
    // Load Razorpay script asynchronously
    if (Object.keys(selectedAddress).length > 5) {
      setError(error?.filter((item: string) => item !== "emptyAddress"));
      await loadRazorpayScript();

      // Create Razorpay order
      const order = await createRazorpayOrder(
        parseInt(cartItem?.product?.price?.original.toString()) *
          cartItem?.quantity +
          deliveryFee
      );

      // Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZOR_PAY_ID!,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "In&O",
        description: "Payment for your In&O purchase",
        handler: function (response: any) {
          // Handle the payment success
          // console.log("Payment Successful!", response);
          placeOrder();
        },
        prefill: {
          name: user.name,
          // email: "john@example.com",
          contact: user.phone,
        },
      };
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } else {
      setError([...error, "emptyAddress"]);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading({ ...loading, placingOrder: true });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "post",
        body: JSON.stringify({
          phone: user.phone,
          products: [cartItem],
          address: selectedAddress,
          price:
            parseInt(cartItem?.product?.price?.original.toString()) *
              cartItem?.quantity +
            deliveryFee,
        }),
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.error) {
        alert(data?.message);
        getCart(setCart);
        router.push("/shop");
      }
      setLoading({ ...loading, placingOrder: false });
    } catch (error) {
      setLoading({ ...loading, placingOrder: false });
    }
  };

  return (
    <div className="relative h-screen w-full  flex flex-col  items-center justify-start overflow-y-scroll scrollbar-hide pt-[50px] lg:pt-[100px]">
      <Header />
      {loadingProduct ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <>
            <ImSpinner4 color="black" size={36} className="animate-rotate" />
          </>
        </div>
      ) : loading.placingOrder ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <>
            <ImSpinner4 color="black" size={36} className="animate-rotate" />
            <p className="text-black text-[1rem] mt-1 firsttext-center">
              Do not close the window or <br /> press back button
            </p>
          </>
        </div>
      ) : (
        <div className="w-full h-full flex lg:hidden items-start justify-center">
          <div className="h-auto w-full sm:w-[50%] flex flex-col items-start justify-start  box-border  ">
            <h1 className="hidden sm:block text-lg font-medium my-2 ml-3 text-black ">
              Delivery Address
            </h1>
            <div className="min-h-[50px] self-center w-[95%] flex flex-col items-start justify-start border-[1px] border-[#00000013] rounded-lg my-5">
              <div className="h-[100%] w-[100%] flex items-center justify-between pl-5 pr-2 pt-1 box-border">
                <h1 className="text-lg font-medium text-black">
                  Add a new address
                </h1>
                {newAddress ? (
                  <AiOutlineMinus
                    onClick={() => SetnewAddress(!newAddress)}
                    className=" cursor-pointer m-1"
                    size={24}
                    color="black"
                  />
                ) : (
                  <AiOutlinePlus
                    onClick={() => SetnewAddress(!newAddress)}
                    className=" cursor-pointer m-1"
                    size={24}
                    color="black"
                  />
                )}
              </div>
              {newAddress && (
                <NewAddress
                  address={address}
                  setAddress={setAddress}
                  loading={loading.saving}
                  updateAddress={updateAddress}
                  error={error}
                  setIsHome={setIsHomeAddress}
                  isHome={isHomeAddress}
                />
              )}
            </div>
            <div className="min-h-[32%] self-center h-auto w-[100%] grid grid-cols-2 gap-y-2 gap-x-2 place-content-center place-items-center px-2 box-border">
              {user?.addresses?.map((item: any, i: number) => (
                <GivenAddress
                  key={i}
                  onClick={() => setSelectedAddress(item)}
                  Delete="/svg/delete.svg"
                  AddressType={item.isHomeAddress ? "Home" : "Office"}
                  Name={item.name}
                  Locality={item.locality}
                  City={item.city}
                  PinNumber={item.pinCode}
                  PhoneNumber={"+91" + item.phone}
                  isSelected={item === selectedAddress}
                />
              ))}
            </div>
            {error?.includes("emptyAddress") && (
              <span className="text-[11px] font-medium text-red-500 self-center ">
                select any address
              </span>
            )}
          </div>
        </div>
      )}
      {!loadingProduct && !newAddress && (
        <div className="fixed bottom-0 bg-white flex lg:hidden items-center justify-between w-full min-h-[60px] border-t-[1px] border-t-black  px-5 box-border">
          <span className=" text-black font-[600] text-[1.2rem]">
            Total : ₹
            {parseInt(cartItem?.product?.price?.original.toString()) *
              cartItem?.quantity +
              deliveryFee ?? 0}
          </span>
          <button
            onClick={initializePayment}
            className="self-center w-[50%] h-[60%] min-h-[40px] rounded-[10px] bg-black flex items-center justify-center"
          >
            <img
              className="h-[13px] w-[13px] ml-1"
              src="/svg/Cart.svg"
              alt=""
            />
            <h1 className="text-white text-[0.8rem] font-medium ml-2">
              Place Order
            </h1>
          </button>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(IndividualDeliveryAddress), {
  ssr: false
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cartItemId = context.query.cartItemId;
  return {
    props: {
      cartItemId,
    },
  };
};
