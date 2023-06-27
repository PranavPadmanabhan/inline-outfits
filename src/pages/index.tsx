import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import TeesShowCase from "@/components/TeesShowCase";

// const TeesShowCase = React.lazy(() => import("@/components/TeesShowCase"))
import Axios from "@/config/AxiosConfig";
import AuthLayout from "@/layout/AuthLayout";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

function Index() {

  const [products, setProducts] = useState<any>([])

  const getProducts = async() => {
    try {
      const res = await Axios.get("/products")
      const data = await res.data
      if(!data.error){
        setProducts(data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getProducts()
  },[])

  return (
      <div className="min-h-screen bg-white w-full flex flex-col items-center justify-start scrollbar-hide">
        <Header />
        <Landing />
        <TeesShowCase products={products} />
        <About />
        <Footer />
      </div>
  );
}

export default Index;
