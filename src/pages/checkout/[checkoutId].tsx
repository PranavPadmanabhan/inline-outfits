/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";
import { getCart } from "../cart";
import { GetServerSideProps } from "next";
import Axios from "@/config/AxiosConfig";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createRazorpayOrder, loadRazorpayScript } from "@/utils/razorpay";

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
};

function IndividualDelivery({ checkoutId }: { checkoutId: string }) {
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
  const [loading, setLoading] = useState<Loading>({ saving: false });

  const { cart, setCart } = useAppContext();

  useEffect(() => {
    getCart(setCart, null, null, SetCartItem, checkoutId);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      const res = await Axios.get(`/auth/user/${user?.phone}`);
      const data = await res.data;
      if (!data.error) {
        setUser(data);
        // console.log(data)
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
        const user = JSON.parse(localStorage.getItem("user")!);
        console.log(user);
        let addresses: any[] = [];
        if (user?.addresses) {
          addresses = [...user?.addresses, { ...address, isHomeAddress }];
        } else {
          addresses = [{ ...address, isHomeAddress }];
        }
        const res = await Axios.put(`/auth/user/${user?.phone}`, {
          addresses,
        });
        const data = await res.data;
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
      console.log(error);
      setLoading({ ...loading, saving: false });
    }
  };

  const initializePayment = async () => {
    // Load Razorpay script asynchronously
    const user = JSON.parse(localStorage.getItem("user")!)
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
        console.log("Payment Successful!", response);
        alert("Successfull")
      },
      prefill: {
        name: user.name ,
        // email: "john@example.com",
        contact: user.phone
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="h-screen w-full  flex flex-col  items-center justify-start overflow-y-scroll scrollbar-hide ">
      <Header />
      <div className="w-full h-full flex items-start justify-center">
        <div className="h-auto   w-[50%] flex flex-col items-start justify-start  box-border  ">
          <h1 className="text-lg font-medium my-2 ml-10 text-black">
            Delivery Address
          </h1>
          <div className="min-h-[32%] h-auto w-[90%]  grid grid-cols-3 gap-y-2 place-content-center place-items-center px-7  box-border">
            {user?.addresses?.map((item: any, i: number) => (
              <GivenAddress
                key={i}
                Delete="/svg/delete.svg"
                AddressType={item.isHomeAddress ? "Home" : "Office"}
                Name={item.name}
                isSelected
                Locality={item.locality}
                City={item.city}
                PinNumber={item.pinCode}
                PhoneNumber={"+91" + item.phone}
              />
            ))}
          </div>

          <div className="min-h-[50px] w-[87%] flex flex-col items-start justify-start  border-[1px] border-[#00000013] rounded-lg ml-10 my-5">
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
        </div>

        <div className="h-auto  w-[30%] flex flex-col items-center justify-center  ml-16">
          <div className="w-[85%]  h-[65%] min-h-[60vh] border-[1px] border-[#00000013] rounded-[10px] flex flex-col px-[5%] pt-8 box-border mt-4">
            <div className="w-full h-[12%] flex flex-col items-start justify-start border-b-[2px] border-dashed">
              <span className="mb-2 ml-4 text-black font-[600] text-[1.2rem] ">
                Price Details
              </span>
            </div>
            <div className="w-full h-[45%] flex flex-col items-start justify-evenly border-b-black border-b-[1px] border-dashed mt-4">
              <div className="w-full h-auto mb-2 flex items-center justify-between">
                <span className="ml-4 text-black font-[400] text-[1rem]">
                  Net Amount
                </span>
                <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
                  ₹
                  {parseInt(cartItem?.product?.price?.original.toString()) *
                    cartItem?.quantity}
                </span>
              </div>

              <div className="w-full h-auto mb-2 flex items-center justify-between">
                <span className="ml-4 text-black font-[400] text-[1rem]">
                  Delivery
                </span>
                <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
                  ₹{deliveryFee}
                </span>
              </div>
            </div>
            <div className="w-full h-[15%] mb-2 flex items-center justify-between border-b-black border-b-[1px] border-dashed my-4">
              <span className="ml-4 text-black font-[400] text-[1rem]">
                Total
              </span>
              <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
                ₹
                {parseInt(cartItem?.product?.price?.original.toString()) *
                  cartItem?.quantity +
                  deliveryFee}
              </span>
            </div>

            {/* <span className="my-3 ml-4 text-black font-[350] text-[0.9rem] ">
              You saved 500 on this order
            </span> */}
            <button onClick={initializePayment} className="self-center w-[80%] min-h-[43px] rounded-[10px] bg-black flex items-center justify-center mb-1 mt-6">
              <img
                className="h-[18] w-[18px] ml-1"
                src="/svg/Cart.svg"
                alt=""
              />
              <h1 className="text-white text-[1rem] font-medium ml-2">
                Proceed & Pay
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(IndividualDelivery), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkoutId = context.query.checkoutId;
  return {
    props: {
      checkoutId,
    },
  };
};
