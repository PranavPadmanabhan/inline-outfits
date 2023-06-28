/* eslint-disable @next/next/no-img-element */
import GivenAddress from "@/components/GivenAddress";
import Header from "@/components/Header";
import NewAddress from "@/components/NewAddress";
import Axios from "@/config/AxiosConfig";
import dynamic from "next/dynamic";
import React, { useState } from "react";

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

function Profile() {
  const [newAddress, SetnewAddress] = useState(false);
  const [user, setUser] = useState<any>({});
  const [address, setAddress] = useState<Address>({} as Address);
  const [error, setError] = useState<error>({} as error);
  const [loading, setLoading] = useState<Loading>({ saving: false });

  const getUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")!);
      const res = await Axios.get(`/user/${user?.phone}`);
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
          <div className="h-[55px] w-[550px]  flex items-center justify-between mt-3 ">
            <input
              className="text-xs text-[#0000004b] h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
              type="text"
              placeholder="First Name"
            />
            <input
              className="text-xs text-[#0000004b] h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
              type="text"
              placeholder="Second Name"
            />
          </div>

          <h1 className="font-semibold text-lg mt-8 text-black">
            Email Address
          </h1>

          <input
            className="text-xs text-[#0000004b] h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border mt-3 "
            type="text"
            placeholder="example@gmail.com"
          />

          <h1 className="font-semibold text-lg mt-8 text-black">
            Phone Number
          </h1>

          <input
            className="text-xs text-[#0000004b] h-[55px] w-[48%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border mt-3 "
            type="text"
            placeholder="0123456789"
          />

          <button className="h-[40px] w-[130px] rounded-lg bg-black text-sm text-white mt-10">
            Update
          </button>
        </div>

        <div className="min-h-[100%] w-[50%] flex flex-col items-start justify-start  mt-5 px-10 box-border">
          <div className="min-h-[32%] h-auto w-[90%]  grid grid-cols-3 gap-x-2 gap-y-2 place-content-center place-items-center px-8  box-border">
            <GivenAddress
              Delete="/svg/delete.svg"
              AddressType="Home"
              Name="Athul Vishnu"
              Locality="Karamel"
              City="Payyanur"
              PinNumber={"670307"}
              PhoneNumber={"9999999999"}
            />
            <GivenAddress
              Delete="/svg/delete.svg"
              AddressType="Home"
              Name="Athul Vishnu"
              Locality="Karamel"
              City="Payyanur"
              PinNumber={"670307"}
              PhoneNumber={"9999999999"}
            />
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
                updateAddress={updateAddress}
                error={null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
