import React from "react";
import Personalize from "./Personalize";
import ProductItem from "./ProductItem";

function TeesShowCase({ products }: { products: any[] }) {
  return (
    <div className="h-[140vh] w-full flex flex-col justify-start items-center my-5">
      <h1 className=" leading-snug tracking-wide  text-6xl font-semibold  font-MuseoModerno  mt-10">
        Fasion Up Your Looks
      </h1>
      <h1 className="text-2xl tracking-wider text-[#A96500] font-MuseoModerno font-semibold -ml-[950px] my-2 ">
        Latest Trending{" "}
      </h1>
      <div className="h-[60vh] w-[90%] grid grid-cols-4  place-items-center">
        {products.slice(0, 4).map((product: any, i: number) => (
          <ProductItem
            key={i}
            image={product.images[0]}
            nameofT={product.name}
            details={product.description}
            offprice={product.price.original}
            realprice={Math.round(product.price.original * (100/(100 - parseFloat(product.price.offer))))}
            off={product.price.offer}
          />
        ))}
        {/* <ProductItem
          image="/svg/T3.svg"
          nameofT="Stripped Tees"
          details="Stripped Tees white and black colour"
          offprice={399}
          realprice={599}
          off={33}
        />
        <ProductItem
          image="/svg/T2.svg"
          nameofT="Stripped Tees"
          details="Stripped Tees white and black colour"
          offprice={399}
          realprice={599}
          off={33}
        />

        <ProductItem
          image="/svg/T1.svg"
          nameofT="Stripped Tees"
          details="Stripped Tees white and black colour"
          offprice={399}
          realprice={599}
          off={33}
        /> */}
      </div>
      <h1 className="text-2xl tracking-wider text-[#A96500] font-MuseoModerno font-semibold -ml-[890px] mt-10 mb-4">
        {" "}
        Personalize your tees
      </h1>
      <div className="h-[60vh] w-[90%] flex items-center justify-start">
        <Personalize personalizedT="/svg/T1.svg" />
        <Personalize personalizedT="/svg/T2.svg" />
        <Personalize personalizedT="/svg/T3.svg" />
        <Personalize personalizedT="/svg/T4.svg" />
      </div>
    </div>
  );
}

export default TeesShowCase;
