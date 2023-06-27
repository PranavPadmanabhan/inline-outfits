/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type props = {
  image: string;
  nameofT: string;
  details: string;
  offprice: number;
  realprice: number;
  off: number;
  onClick?: () => void;
};

function ProductItem({
  image,
  nameofT,
  details,
  offprice,
  realprice,
  off,
  onClick,
}: props) {
  const router = useRouter();
  return (
    <div
      onClick={onClick}
      className="h-[100%] w-[80%] flex flex-col justify-start items-center  cursor-pointer"
    >
      <img
        className=" w-[100%] h-[80%] items-center object-cover rounded-[20px] mb-1 pointer-events-none"
        src={image}
        alt=""
      />
      {/* <LazyLoadImage
        className="w-[100%] h-full items-center object-cover rounded-[20px] mb-1 pointer-events-none"
        alt={""}
        effect="blur"
        src={image} // use normal <img> attributes as props
      /> */}
      <h1 className="self-start text-[1.2rem] font-[700] text-black ">{nameofT}</h1>
      <h2 className="self-start text-[0.8rem] font-medium text-black">{details}</h2>
      <div className="self-start h-[20px] w-[100%] flex items-center justify-start">
        <h1 className="font-[600] text-[13px] text-black">Rs {offprice}</h1>
        <h1 className="font-medium text-[11px] text-[#00000094] mx-2 line-through  ">
          Rs {realprice}
        </h1>
        <h1 className="font-semibold text-[11px] text-lightRed ">{off}% off</h1>
      </div>
    </div>
  );
}

export default ProductItem;
