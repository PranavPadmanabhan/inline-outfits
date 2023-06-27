import React, { Dispatch, SetStateAction } from "react";

function NewAddress({
  address,
  setAddress,
  loading,
  updateAddress,
}: {
  address: any;
  setAddress: Dispatch<SetStateAction<any>>;
  loading: boolean;
  updateAddress: any;
}) {
  return (
    <div className="h-[470px] w-[94%] flex flex-col justify-start items-start mt-2 ml-4 ">
      <div className="h-[130px] w-[90%] grid grid-cols-2  mt-1">
        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start ">
          <input
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Name"
          />

          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start ">
          <input
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Mobile Number"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start mt-3">
          <input
            value={address.locality}
            onChange={(e) =>
              setAddress({ ...address, locality: e.target.value })
            }
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Locality"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>

        <div className="h-[55px] w-[90%] flex flex-col justify-between items-start mt-3">
          <input
            value={address.pinCode}
            onChange={(e) =>
              setAddress({ ...address, pinCode: e.target.value })
            }
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Pin Code"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>
      </div>

      <div className="h-[85px] w-[90%] flex flex-col items-start justify-between mt-3">
        <input
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          className="text-xs text-[#0000004b] h-[70px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
          type="text"
          placeholder="Address"
        />
        <span className="text-[11px] font-medium text-red-500 ml-2 ">
          error
        </span>
      </div>

      <div className="h-[110px] w-[90%] grid grid-cols-2  mt-2">
        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="District/Town/City"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>

        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Select State"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>
        </div>

        <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
          <input
            value={address.landMark}
            onChange={(e) =>
              setAddress({ ...address, landMark: e.target.value })
            }
            className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
            type="text"
            placeholder="Landmark(optional)"
          />
          <span className="text-[11px] font-medium text-red-500 ml-2 ">
            error
          </span>

          </div>

          <div className="h-[55px] w-[90%] flex flex-col items-start justify-between mt-3">
            <input
              value={address.alternateNumber}
              onChange={(e) =>
                setAddress({ ...address, alternateNumber: e.target.value })
              }
              className="text-xs text-[#0000004b] h-[40px] w-[100%] rounded-lg border-[1px] border-[#00000021] outline-none p-3 box-border "
              type="text"
              placeholder="Alternate number (optional)"
            />

            <span className="text-[11px] font-medium text-red-500 ml-2 ">
              error
            </span>
          </div>
          </div>
        

        <div className="h-[20px] w-[200px] flex items-center justify-evenly mt-10">
          <h1 className=" text-[11px] text-black">Address Type </h1>
          <input
            id="horizontal-list-radio-license"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ml-2 "
          />
          <h1 className=" text-[11px] text-black">Home</h1>
          <input
            id="horizontal-list-radio-id"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ml-2 "
          />
          <h1 className="text-[11px] text-black">Office </h1>
        </div>
        <button
          onClick={updateAddress}
          className=" h-[40px] w-[120px] bg-black text-xs text-white my-3 rounded-lg tracking-wide ml-[300px]"
        >
          {loading ? "Saving.." : "Save"}
        </button>
      
    </div>
  );
}

export default NewAddress;
