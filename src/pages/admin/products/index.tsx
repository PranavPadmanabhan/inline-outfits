/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";

function Products() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
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
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      setDeleting(true);
      const admin = JSON.parse(localStorage.getItem("admin")!);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/admin`,
        {
          method: "delete",
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            phone: admin?.phone,
          }),
        }
      );
      const data = await res.json();
      setDeleting(false);
      if (!data.error) {
        getProducts();
      }
    } catch (error) {
      setDeleting(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-start  lg:pt-[100px] pt-[50px]">
      <Header />
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <ImSpinner4 color="black" size={28} className="animate-rotate" />
        </div>
      ) : (
        <div className="min-h-[90vh] w-full grid grid-cols-2 gap-6   bg-white p-10 box-border">
          {products.map((item: any, i: number) => (
            <div
              key={i}
              className="w-full h-full max-h-[200px] min-w-[300px] max-w-[400px]  flex items-center justify-start px-3 box-border  bg-[#F4F4F4] rounded-md relative "
            >
              <img
                src={item?.images[0]}
                alt=""
                className="h-full w-[40%] max-h-[170px] max-w-[140px] object-cover rounded-lg my-3"
              />
              <div className="w-[60%] h-full flex flex-col items-start justify-start pl-5 box-border ">
                <span className="text-black font-[600] text-[1.1rem] mt-5 ">
                  {item?.name}
                </span>
                <p className="text-lightGray text-[0.9rem] font-[400] mb-1">
                  {item?.description}
                </p>
                <div className="h-[20px] w-[100%] flex items-center justify-start my-1">
                  <h1 className="font-medium text-[20px] text-black">
                    Rs {item.price.original}
                  </h1>
                  <h1 className="font-medium text-[16px] text-[#00000094] mx-2 line-through">
                    Rs{" "}
                    {Math.round(
                      item.price.original *
                        (100 / (100 - parseFloat(item.price.offer)))
                    )}
                  </h1>
                  <h1 className="font-medium text-[15px] text-lightRed">
                    {item.price.offer}% off
                  </h1>
                </div>

                <div className="h-[25px] w-[45px] flex items-center justify-between  absolute top-4 right-5">
                  <img
                    className="h-[18px] w-[18px] cursor-pointer"
                    src="/svg/edit.svg"
                    alt=""
                  />
                  {deleting ? (
                    <ImSpinner4
                      color="black"
                      size={18}
                      className="animate-rotate"
                    />
                  ) : (
                    <img
                      onClick={() => deleteProduct(item?.productId)}
                      className="h-[18px] w-[18px] cursor-pointer"
                      src="/svg/delete.svg"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
