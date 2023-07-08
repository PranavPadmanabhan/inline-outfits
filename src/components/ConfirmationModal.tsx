import React, { Dispatch, SetStateAction, useState } from "react";
import { ImSpinner4 } from "react-icons/im";

function ConfirmationModal({
  order,
  setIsModalVisbile,
  changeType,
  get,
}: {
  setIsModalVisbile: Dispatch<SetStateAction<boolean>>;
  order: any;
  changeType: "In Factory" | "Shipped" | null;
  get?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const updateStatus = async (type: "ToFactory" | "shipping") => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin")!);
      if (Object.keys(admin).length > 0) {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/update/admin`,
          {
            method: "put",
            body: JSON.stringify({
              phone: admin?.phone,
              orderId: order?.orderId,
              status: type === "ToFactory" ? "In Factory" : "Shipped",
            }),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.error) {
          get?.();
        }
        setLoading(false);
        setIsModalVisbile(false);
      } else {
        return;
      }
    } catch (error) {
      setLoading(false);
      setIsModalVisbile(false);
    }
  };

  return (
    <div className="fixed top-0 z-[100] w-full h-full flex items-center justify-center backdrop-blur-md">
      <div className="w-[40%] h-[40%] max-w-[180px] max-h-[170px] lg:max-w-[350px] lg:max-h-[200px] shadow-modal_header rounded-[20px] bg-white flex flex-col items-center justify-between p-5 box-border">
        <h1 className="text-black text-[1.3rem] font-MuseoModerno mb-2">
          Confirmation
        </h1>
        <p className=" text-[0.9rem] text-gray-600 text-center font-[300]">
          {" "}
          Are you sure? You want to change order status from &quot;{order?.status}&quot; to &quot;{changeType}&quot;
        </p>
        <div className="w-full h-auto flex items-center justify-evenly">
          <button
            onClick={() => setIsModalVisbile(false)}
            className="w-[35%] min-h-[40px] rounded-md bg-white text-black border-2 border-black"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              updateStatus(
                changeType === "In Factory" ? "ToFactory" : "shipping"
              )
            }
            className="w-[35%] min-h-[40px] rounded-md bg-black text-white flex items-center justify-center"
          >
            {loading ? (
              <ImSpinner4 color="white" size={22} className="animate-rotate" />
            ) : (
              <span className="text-white text-[1rem]">Change It</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
