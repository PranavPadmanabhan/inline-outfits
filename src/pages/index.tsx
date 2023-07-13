import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Landing from "@/components/Landing";

import TeesShowCase from "@/components/TeesShowCase";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

function Index() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center justify-start scrollbar-hide pt-[60px] lg:pt-[100px]">
      <Head>
        <title>In&O | Home</title>
      </Head>
      <Header />
      {loading && <TopBarProgress />}
      <Landing />
      <TeesShowCase products={products} />
      <About />
      <Footer />
    </div>
  );
}

export default Index;
