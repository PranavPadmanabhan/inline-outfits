import AuthModal from "@/components/AuthModal";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {

  const { isAuthModalVisible } = useAppContext()

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {children}
      { isAuthModalVisible && <AuthModal /> }
    </div>
  );
}

export default AuthLayout;
