import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import TopBarProgress from "react-topbar-progress-indicator";

function Shop() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.error) {
        setProducts(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      ;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-start pt-[50px] lg:pt-[100px]">
       <Head>
        <title>In&O-Shop</title>
      </Head>
      <Header />
      {
        loading && <TopBarProgress />
      }
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ImSpinner4 color="black" size={36} className="animate-rotate" />
        </div>
      ) : (
        <div className="w-full h-full grid lg:grid-cols-4 grid-cols-2 place-content-start place-items-center overflow-y-scroll scrollbar-hide pt-5 box-border gap-x-0 gap-y-3 lg:gap-x-6 lg:gap-y-6">
          {products.map((product: any, i: number) => (
            <ProductItem
              key={i}
              onClick={() => router.push(`/shop/${product.productId}`)}
              image={product.images[0]}
              nameofT={product.name}
              details={product.description}
              offprice={product.price.original}
              realprice={Math.round(
                product.price.original *
                  (100 / (100 - parseFloat(product.price.offer)))
              )}
              off={product.price.offer}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Shop), { ssr: false });
