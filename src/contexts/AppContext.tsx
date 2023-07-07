import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type AppContext = {
  isAuthModalVisible: boolean;
  setIsAuthModalVisible: Dispatch<SetStateAction<boolean>>;
  isOptionsVisible: boolean;
  setIsOptionsVisible: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  authType:"login" | "signup";
  setAuthType:Dispatch<SetStateAction<"login" | "signup">>;
  cart:any;
  setCart:any
  isProductUploadModalVisible: boolean;
  setIsProductUploadModalVisible: Dispatch<SetStateAction<boolean>>;
};

const appContext = React.createContext<AppContext>({} as AppContext);

function AppContextProvider({ children }: { children: React.ReactNode|any }) {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState<boolean>(false);
  const [isProductUploadModalVisible, setIsProductUploadModalVisible] = useState<boolean>(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [user, setUser] = useState<any>({})
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [cart, setCart] = useState<any>([]);
  const router = useRouter()


  const value = {
    isAuthModalVisible,
    setIsAuthModalVisible,
    isOptionsVisible,
    setIsOptionsVisible,
    user,
    setUser,
    authType,
    setAuthType,
    cart,
    setCart,
    isProductUploadModalVisible,
    setIsProductUploadModalVisible
  };

  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user")!)
    if(user){
      setUser(user)
    }
    else {
      setUser({})
    }
  },[])


  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export default AppContextProvider;

export const useAppContext: () => AppContext = () => useContext(appContext);


