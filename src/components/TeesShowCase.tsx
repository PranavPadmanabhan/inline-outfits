import React from "react";
import Personalize from "./Personalize";
import ProductItem from "./ProductItem";
import { useRouter } from "next/router";

function TeesShowCase({ products }: { products: any[] }) {
  const router = useRouter();

  return (
    <div className="lg:h-[140vh] h-auto min-h-[70vh] w-full bg-white flex flex-col justify-start items-center my-5">
      <h1 className=" leading-snug tracking-wide  lg:text-6xl text-3xl font-semibold text-black font-MuseoModerno  lg:mt-10 mt-3 ">
        Fasion Up Your Looks
      </h1>
      <h1 className="lg:text-2xl text-xl tracking-wider text-[#A96500] font-MuseoModerno font-semibold lg:-ml-[950px] my-2 ">
        Latest Trending{" "}
      </h1>
      <div className="lg:h-[60vh] h-auto w-[90%] grid lg:grid-cols-4 grid-cols-1 place-items-center">
        {products.slice(0, 4).map((product: any, i: number) => (
          <ProductItem
            onClick={() => router.push("/shop")}
            key={i}
            image={product.images[0]}
            nameofT={product.name}
            details={product.description}
            offprice={product.price.original}
            realprice={Math.round(
              product.price.original *
                (100 / (100 - parseFloat(product.price.offer)))
            )}
            off={product.price.offer}
            className="h-[50vh]"
          />
        ))}
      </div>
      <h1 className="text-2xl tracking-wider text-[#A96500] font-MuseoModerno font-semibold lg:-ml-[890px] mt-10 mb-4">
        {" "}
        Personalize your tees
      </h1>
      <div className="lg:h-[60vh] lg:gap-y-0 gap-y-4 h-auto w-[90%] flex lg:flex-row flex-col items-center justify-start">
        <Personalize personalizedT="/svg/T1.svg" />
        <Personalize personalizedT="/svg/T2.svg" />
        <Personalize personalizedT="/svg/T3.svg" />
        <Personalize personalizedT="/svg/T4.svg" />
      </div>
    </div>
  );
}

export default TeesShowCase;
