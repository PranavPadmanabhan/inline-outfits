import AuthModal from "@/components/AuthModal";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {

  const { isAuthModalVisible } = useAppContext()

  return (
    <div className="relative w-full min-h-screen overflow-y-scroll bg-white flex items-center justify-center scrollbar-hide">
      {children}
      { isAuthModalVisible && <AuthModal /> }
    </div>
  );
}

export default AuthLayout;
