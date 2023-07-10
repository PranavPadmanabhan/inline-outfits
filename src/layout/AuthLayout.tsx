import AuthModal from "@/components/AuthModal";
import OrderPlaced from "@/components/OrderPlaced";
import ProductUpload from "@/components/ProductUpload";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {

  const { isAuthModalVisible,isProductUploadModalVisible,isUpdating,product,orderPlaced } = useAppContext()

  return (
    <div className="relative w-full min-h-screen overflow-y-scroll bg-white flex items-center justify-center scrollbar-hide">
      {children}
      { isAuthModalVisible && <AuthModal /> }
      { isProductUploadModalVisible && <ProductUpload isUpdating={isUpdating} product={product} /> }
      { orderPlaced && <OrderPlaced /> }
    </div>
  );
}

export default AuthLayout;
