/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";
import { getCart } from "../cart";
import Axios from "@/config/AxiosConfig";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";
import { createRazorpayOrder, loadRazorpayScript } from "@/utils/razorpay";
import OrderItem from "@/components/OrderItem";
import styles from "@/styles/Extras.module.css";
import { ImSpinner4 } from "react-icons/im";

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
  placingOrder:boolean
};

function Delivery() {
  const [newAddress, SetnewAddress] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState<number>(50);
  const [user, setUser] = useState<any>({});
  const [address, setAddress] = useState<Address>({} as Address);
  const [error, setError] = useState<any[]>([]);
  const [loading, setLoading] = useState<Loading>({ saving: false,placingOrder:false });
  const [totalAmount, settotalAmount] = useState<any>(0);
  const [selectedAddress, setSelectedAddress] = useState<any>({});

  const { cart, setCart } = useAppContext();

  useEffect(() => {
    getCart(setCart, null, settotalAmount);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      const res = await Axios.get(`/auth/user/${user?.phone}`);
      const data = await res.data;
      if (!data.error) {
        setUser(data);
      }
    } catch (error) {
      console.clear();
    }
  };

  const updateAddress = async () => {
    try {
      if (
        address.address.trim().length > 0 &&
        address.alternateNumber.trim().length > 0 &&
        address.city.trim().length > 0 &&
        address.name.trim().length > 0 &&
        address.pinCode.trim().length > 0 &&
        address.state.trim().length > 0 &&
        address.locality.trim().length > 0
      ) {
        setLoading({ ...loading, saving: true });
        const user = JSON.parse(localStorage.getItem("user")!);
        const res = await Axios.put(`/user/${user?.phone}`, {
          addresses: [...user.addresses, address],
        });
        const data = await res.data;
        if (!data.error) {
          setUser(data);
          setError([]);
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
      console.clear();
    }
  };

  const initializePayment = async () => {
    // Load Razorpay script asynchronously
    if (Object.keys(selectedAddress).length > 5) {
      setError(error?.filter((item: string) => item !== "emptyAddress"));
      const user = JSON.parse(localStorage.getItem("user")!);
      await loadRazorpayScript();

      // Create Razorpay order
      const order = await createRazorpayOrder(totalAmount + deliveryFee);

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
          placeOrder()
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
      setLoading({...loading,placingOrder:true})
      const res = await Axios.post("/orders", {
        phone: user.phone,
        products: cart?.products!,
        address,
        price:totalAmount + deliveryFee
      });
      const data = await res.data;
      if(!data.error){
        alert(data?.message)
      }
      setLoading({...loading,placingOrder:false})

    } catch (error) {
      setLoading({...loading,placingOrder:false})

    }
  };

  return (
    <div className="h-screen w-full  flex flex-col  items-center justify-start overflow-y-scroll scrollbar-hide ">
      <Header />
      {loading.placingOrder ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
        <>
        <ImSpinner4 color="black" size={36} className="animate-rotate" />
        <p className="text-black text-[1rem] mt-1 text-center">Do not close the window or <br/> press back button</p>
        </>
      </div>
      ):(
        <div className="w-full h-full flex items-start justify-center">
        <div className="h-auto   w-[50%] flex flex-col items-start justify-start  box-border  ">
          <h1 className="text-lg font-medium my-2 text-black mt-3 ml-3">
            Delivery Items
          </h1>
          <div
            className={`${styles.scroll} flex flex-col items-center justify-start w-full h-[30vh] rounded-lg border-[1px] ml-3 border-[#00000013] overflow-y-scroll`}
          >
            {cart?.products?.map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className="w-full h-auto flex flex-col items-center justify-start "
                >
                  <OrderItem
                    name={item.product.name}
                    description={item.product.description}
                    image={item.product.images[0]}
                    finalPrice={item.product.price.original}
                    price={Math.round(
                      (item?.product.price?.original * 100) /
                        (100 - parseFloat(item?.product?.price?.offer))
                    )}
                    offer={item?.product?.price?.offer}
                    totalQuantity={item.quantity}
                    color={item?.color}
                    size={item?.size}
                  />
                  <div className="min-h-[1px] w-[95%] bg-gray-300"></div>
                </div>
              );
            })}
          </div>

          <h1 className="text-lg font-medium my-2  text-black mt-3 ml-3">
            Delivery Addresses
          </h1>
          <div className="min-h-[50px] w-[87%] flex flex-col items-start justify-start ml-3 border-[1px] border-[#00000013] rounded-lg my-5">
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
              />
            )}
          </div>
          <div className="min-h-[32%] h-auto w-[100%]  grid grid-cols-3 gap-y-2 place-content-start place-items-center  box-border">
            {user?.addresses?.map((item: any, i: number) => (
              <GivenAddress
                onClick={() => setSelectedAddress(item)}
                key={i}
                Delete="/svg/delete.svg"
                AddressType={item.isHomeAddress ? "Home" : "Office"}
                Name={item.name}
                Locality={item.locality}
                City={item.city}
                PinNumber={item.pinCode}
                PhoneNumber={item.phone}
                isSelected={item === selectedAddress}
              />
            ))}
            {/* <GivenAddress
              Delete="/svg/delete.svg"
              AddressType="/svg/office.svg"
              Name="Athul Vishnu"
              Locality="Karamel"
              City="Payyanur"
              PinNumber={670307}
              PhoneNumber={9999999999}
            /> */}
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
                  ₹{totalAmount ?? 0}
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
            <div className="w-full h-[15%] mb-2 flex items-center justify-between border-b-black border-b-[1px] border-dashed my-8">
              <span className="ml-4 text-black font-[400] text-[1rem]">
                Total
              </span>
              <span className="ml-4 mr-2 text-black font-[600] text-[1.5rem]">
                ₹{totalAmount + deliveryFee ?? 0}
              </span>
            </div>

            {/* <span className="my-3 ml-4 text-black font-[350] text-[0.9rem] ">
              You saved 500 on this order
            </span> */}
            <button
              onClick={initializePayment}
              className="self-center w-[80%] min-h-[43px] rounded-[10px] bg-black flex items-center justify-center mb-1 mt-12"
            >
              <img
                className="h-[18] w-[18px] ml-1"
                src="/svg/Cart.svg"
                alt=""
              />
              <h1 className="text-white text-[1rem] font-medium ml-2">
                Proceed & Pay
              </h1>
            </button>
            {error?.includes("emptyAddress") && (
              <span className="text-[11px] font-medium text-red-500 self-center ">
                select any address
              </span>
            )}
          </div>
        </div>
      </div>
      )
      }
      
    </div>
  );
}

export default dynamic(() => Promise.resolve(Delivery), { ssr: false });
