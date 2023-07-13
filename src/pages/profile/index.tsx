/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import { useAppContext } from "@/contexts/AppContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useState } from "react";
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
};

type State = {
  name: string;
  email: string;
};

function Profile() {
  const [newAddress, SetnewAddress] = useState(false);
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
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState<Loading>({ saving: false });
  const [states, setStates] = useState<State>({
    email: "",
    name: "",
  });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isHomeAddress, setIsHomeAddress] = useState<boolean>(true);
  const { user, setUser } = useAppContext();

  useEffect(() => {
    getUser();
    setStates({
      name: user?.name,
      email: user?.email,
    });
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
        setStates({ name: data.name, email: data?.email });
        setAddresses(data?.addresses);
      }
    } catch (error) {}
  };

  const updateAddress = async (isAddressOnly: boolean, addresses?: any) => {
    try {
      if (isAddressOnly) {
        if (
          address.address?.trim().length > 0 &&
          address.city?.trim().length > 0 &&
          address.name?.trim().length > 0 &&
          address.pinCode?.trim().length > 0 &&
          address.state?.trim().length > 0 &&
          address.locality?.trim().length > 0
        ) {
          setLoading({ ...loading, saving: true });
          const user = JSON.parse(localStorage.getItem("user")!);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${user?.phone}`,
            {
              method: "put",
              body: JSON.stringify({
                addresses: addresses
                  ? addresses
                  : [...user?.addresses, { ...address, isHomeAddress }],
              }),
              headers: {
                apikey: process.env.NEXT_PUBLIC_API_KEY!,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if (!data.error) {
            setUser(data);
            getUser();
            SetnewAddress(false);
          }
          setLoading({ ...loading, saving: false });
        } else {
          let allErrors: string[] = [];
          Object.values(address).map((item, i) => {
            if (!item || item?.trim().length <= 0) {
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
      } else {
        try {
          if (user?.name !== states?.name || user?.email !== states?.email) {
            setLoading({ ...loading, saving: true });
            const user = JSON.parse(localStorage.getItem("user")!);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${user?.phone}`,
              {
                method: "put",
                body: JSON.stringify({
                  ...states,
                }),
                headers: {
                  apikey: process.env.NEXT_PUBLIC_API_KEY!,
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await res.json();
            if (!data.error) {
              setUser(data);
            }
            setLoading({ ...loading, saving: false });
          }
        } catch (error) {}
      }
    } catch (error) {
      setLoading({ ...loading, saving: false });
      // ;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start pt-[50px] lg:pt-[100px]">
       <Head>
        <title>In&O | My Account</title>
      </Head>
      <Header />

      <div className="h-full w-full flex items-start justify-start  overflow-y-scroll scrollbar-hide">
        <div className="h-[100%] w-[50%] flex flex-col items-start justify-start  mt-10 pl-20 box-border ">
          <h1 className="font-semibold text-lg text-black ">
            Personal Information
          </h1>
          <div className="h-[55px] w-[48%]  flex items-center justify-between mt-3 ">
            <input
              className="text-xs text-black h-[55px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
              type="text"
              placeholder="Name"
              value={states?.name}
              onChange={(e) => setStates({ ...states, name: e.target.value })}
            />
          </div>

          <h1 className="font-semibold text-lg mt-8 text-black">
            Email Address
          </h1>

          <input
            className="text-xs text-black h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border mt-3 "
            type="text"
            placeholder="example@gmail.com"
            value={states?.email!}
            onChange={(e) => setStates({ ...states, name: e.target.value })}
          />

          <h1 className="font-semibold text-lg mt-8 text-black">
            Phone Number
          </h1>

          <input
            className="text-xs text-black h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border mt-3 "
            type="text"
            placeholder="phone"
            readOnly
            value={user?.phone}
          />

          <button
            onClick={() => updateAddress(false)}
            className="h-[40px] w-[130px] rounded-lg bg-black text-sm text-white mt-10 flex items-center justify-center"
          >
            {loading.saving ? (
              <ImSpinner4 size={22} color="white" className="animate-rotate" />
            ) : (
              <h1 className="text-white text-[1rem]">Update</h1>
            )}
          </button>
        </div>

        <div className="min-h-[100%] w-[50%] flex flex-col items-start justify-start  mt-5 px-10 box-border">
          <div className="min-h-[32%] h-auto w-[100%]  grid grid-cols-3 gap-y-2 lg:gap-x-1 place-content-center place-items-center  box-border">
            {addresses?.map((item: any, i: number) => {
              return (
                <GivenAddress
                  key={i}
                  Delete="/svg/delete.svg"
                  get={getUser}
                  user={user}
                  id={item._id}
                  AddressType={item.isHomeAddress ? "Home" : "Office"}
                  Name={item.name}
                  Locality={item.locality}
                  City={item.city}
                  PinNumber={item.pinCode}
                  PhoneNumber={"+91" + item.phone}
                />
              );
            })}
          </div>

          <div className="min-h-[50px] w-[87%] flex flex-col items-start justify-start  border-[1px] border-[#00000013] rounded-lg my-5">
            <div className="h-[100%] w-[100%] flex items-center justify-between px-5 pt-1 box-border">
              <h1 className="text-lg font-medium text-black">
                Add a new address
              </h1>
              <img
                onClick={() => SetnewAddress(!newAddress)}
                className="h-[35px] w-[35px]"
                src="/svg/add.svg"
                alt="w-screen h-screen flex flex-col items-center justify-start"
              />
            </div>
            {newAddress && (
              <NewAddress
                address={address}
                setAddress={setAddress}
                loading={loading.saving}
                updateAddress={() => updateAddress(true)}
                error={error}
                isHome={isHomeAddress}
                setIsHome={setIsHomeAddress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
