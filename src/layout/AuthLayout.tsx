import AuthModal from "@/components/AuthModal";
import ProductUpload from "@/components/ProductUpload";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {

  const { isAuthModalVisible,isProductUploadModalVisible } = useAppContext()

  return (
    <div className="relative w-full min-h-screen overflow-y-scroll bg-white flex items-center justify-center scrollbar-hide">
      {children}
      { isAuthModalVisible && <AuthModal /> }
      { isProductUploadModalVisible && <ProductUpload /> }
    </div>
  );
}

export default AuthLayout;
