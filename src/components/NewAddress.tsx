import React, { Dispatch, SetStateAction } from "react";

function NewAddress({
  address,
  setAddress,
  loading,
  updateAddress,
  error,
  setIsHome,
  isHome
}: {
  address: any;
  setAddress: Dispatch<SetStateAction<any>>;
  loading: boolean;
  updateAddress: any;
  error: any[];
  setIsHome?: any;
  isHome?:boolean
}) {
  return (
    <div className="h-[470px] w-[94%] flex flex-col justify-start items-start mt-2 ml-4 ">
      <div className="h-[130px] w-[90%] grid grid-cols-2  mt-1">
        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start ">
          <input
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Name"
          />

          {error.includes("name") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              name is required
            </span>
          )}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start ">
          <input
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Mobile Number"
          />
          {error.includes("phone") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              phone is required
            </span>
          )}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start mt-3">
          <input
            value={address.locality}
            onChange={(e) =>
              setAddress({ ...address, locality: e.target.value })
            }
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Locality"
          />
          {error.includes("locality") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              locality is required
            </span>
          )}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start mt-3">
          <input
            value={address.pinCode}
            onChange={(e) =>
              setAddress({ ...address, pinCode: e.target.value })
            }
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Pin Code"
          />
          {error.includes("pinCode") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              pinCode is required
            </span>
          )}
        </div>
      </div>

      <div className="h-[85px] w-[90%] flex flex-col items-start justify-between mt-3">
        <input
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          className="text-xs text-black h-[70px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
          type="text"
          placeholder="Address"
        />
        {error.includes("address") && (
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            address is required
          </span>
        )}
      </div>

      <div className="h-[110px] w-[90%] grid grid-cols-2  mt-2">
        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="District/Town/City"
          />
          {error.includes("city") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              city is required
            </span>
          )}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Select State"
          />
          {error.includes("state") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              state is required
            </span>
          )}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.landMark}
            onChange={(e) =>
              setAddress({ ...address, landMark: e.target.value })
            }
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Landmark(optional)"
          />
          {/* {error.includes("landMark") && (
            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              landMark is required
            </span>
          )} */}
        </div>

        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.alternateNumber}
            onChange={(e) =>
              setAddress({ ...address, alternateNumber: e.target.value })
            }
            className="text-xs text-black h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000067] outline-none p-3 box-border "
            type="text"
            placeholder="Alternate number (optional)"
          />

          {/* <span className="text-[11px] font-medium text-red-500 ml-2 ">
            {error?.alternateNumber}
          </span> */}
        </div>
      </div>

      <div className="h-[20px] w-[200px] flex items-center justify-evenly mt-10">
        <h1 className=" text-[11px] text-black">Address Type </h1>
        <input
          onClick={() => setIsHome?.(true)}
          id="horizontal-list-radio-license"
          type="radio"
          readOnly
          value=""
          name="list-radio"
          defaultChecked={isHome!}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ml-2 "
        />
        <h1 onClick={() => setIsHome?.(true)} className=" text-[11px] text-black cursor-pointer">Home</h1>
        <input
          onClick={() => setIsHome?.(false)}
          id="horizontal-list-radio-id"
          type="radio"
          value=""
          readOnly
          name="list-radio"
          defaultChecked={!isHome!}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ml-2 "
        />
        <h1 onClick={() => setIsHome?.(false)} className="text-[11px] text-black cursor-pointer">Office </h1>
      </div>
      <button
        onClick={updateAddress}
        className="self-start h-[40px] w-[120px] bg-black text-xs text-white my-6 rounded-lg tracking-wide"
      >
        {loading ? "Saving.." : "Save"}
      </button>
    </div>
  );
}

export default NewAddress;
