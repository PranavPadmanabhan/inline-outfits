import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import TeesShowCase from "@/components/TeesShowCase";
import React, { useEffect, useState } from "react";

function Index() {
  const [products, setProducts] = useState<any>([]);

  const getProducts = async () => {
    try {
       fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json"
        },
      }).then((res) =>res.json()).then(data => {
        setProducts(data)
      })
    } catch (error) {
      ;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center justify-start scrollbar-hide pt-[60px] lg:pt-[100px]">
      <Header />
      <Landing />
      <TeesShowCase products={products} />
      <About />
      <Footer />
    </div>
  );
}

export default Index;
