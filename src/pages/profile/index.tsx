/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import Axios from "@/config/AxiosConfig";
import { useAppContext } from "@/contexts/AppContext";
import dynamic from "next/dynamic";
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
  const [address, setAddress] = useState<Address>({} as Address);
  const [error, setError] = useState<error>({} as error);
  const [loading, setLoading] = useState<Loading>({ saving: false });
  const [states, setStates] = useState<State>({
    email: "",
    name: "",
  });
  const [addresses, setAddresses] = useState<any[]>([])
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
      const res = await Axios.get(`/auth/user/${user?.phone}`);
      const data = await res.data;
      if (!data.error) {
        setStates({name:data.name,email:data?.email});
        setAddresses(data?.addresses)
      }
    } catch (error) {
      console.clear();
    }
  };

  const updateAddress = async (isAddressOnly: boolean) => {
    try {
      if (isAddressOnly) {
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
          const res = await Axios.put(`/auth/user/${user?.phone}`, {
            addresses: [...user.addresses, address],
          });
          const data = await res.data;
          if (!data.error) {
            setUser(data);
          }
          setLoading({ ...loading, saving: false });
        } else {
          Object.values(address).map((item, i) => {
            if (item.trim().length <= 0) {
              setError({
                ...error,
                [item.toString()]: `${Object.keys(address)[i]} is empty `,
              });
            }
          });
        }
      } else {
        try {
          if (user?.name !== states?.name || user?.email !== states?.email) {
            setLoading({ ...loading, saving: true });
            const user = JSON.parse(localStorage.getItem("user")!);
            const res = await Axios.put(`/auth/user/${user?.phone}`, {
              ...states
            });
            const data = await res.data;
            console.log(data)
            if (!data.error) {
              setUser(data);
            }
            setLoading({ ...loading, saving: false });
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      setLoading({ ...loading, saving: false });
      console.clear();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
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
          <div className="min-h-[32%] h-auto w-[100%]  grid grid-cols-3 gap-y-2 place-content-center place-items-center  box-border">
            {addresses?.map((item: any, i: number) => (
              <GivenAddress
                key={i}
                Delete="/svg/delete.svg"
                AddressType={item.isHomeAddress ? "Home" : "Office"}
                Name={item.name}
                Locality={item.locality}
                City={item.city}
                PinNumber={item.pinCode}
                PhoneNumber={"+91" + item.phone}
              />
            ))}
          </div>

          <div className="min-h-[50px] w-[87%] flex flex-col items-start justify-start  border-[1px] border-[#00000013] rounded-lg ml-10 my-5">
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
                error={[]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
