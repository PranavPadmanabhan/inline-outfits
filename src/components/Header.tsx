/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useAppContext } from "@/contexts/AppContext";
import { getCart } from "@/pages/cart";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Extras.module.css";

function Header() {
  const router = useRouter();
  const {
    isOptionsVisible,
    setIsOptionsVisible,
    setIsAuthModalVisible,
    isAuthModalVisible,
    user,
    setUser,
    setAuthType,
    cart,
    setCart,
  } = useAppContext();
  const [isNavbarOptionsVisible, setIsNavbarOptionsVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsOptionsVisible(false);
  }, [router.pathname]);

  useEffect(() => {
    getCart(setCart).then(() => console.clear());
  }, [router.pathname, isAuthModalVisible]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setUser(user);
    } else {
      setUser({});
    }
  }, []);

  const logout = () => {
    localStorage.setItem("user", JSON.stringify({}));
    setUser({});
    window.location.reload();
    setIsOptionsVisible(false);
  };

  return (
    <div className="w-[100%] fixed top-0 z-[100] lg:min-h-[95px] min-h-[60px] flex flex-col items-center justify-center bg-white">
      <div
        className={`w-full h-full flex items-center justify-between ${
          isNavbarOptionsVisible
            ? "border-b-[1px] border-b-[#00000057]"
            : "border-none"
        }`}
      >
        <div className="lg:min-h-[50px] lg:w-[12%] h-full w-[20%] ml-3 lg:ml-10">
          {" "}
          <img className="h-[80%] w-[80%]" src="/svg/In&O.svg" alt="" />
        </div>
        <div className="h-full w-[45%] hidden  lg:flex items-center justify-evenly">
          <h1
            onClick={() => router.push("/")}
            className={`text-[1rem] ${
              router.pathname === "/"
                ? "border-b-[1px] border-b-black"
                : "border-none"
            } font-medium  cursor-pointer text-black`}
          >
            Home
          </h1>
          <button
            onClick={() => router.push("/shop")}
            className={`text-[1rem] ${
              router.pathname === "/shop"
                ? "border-b-[1px] border-b-black"
                : "border-none"
            } font-medium text-black`}
          >
            Shop
          </button>
          <h1
            className={`text-[1rem] ${
              router.pathname === "/contact"
                ? "border-b-[1px] border-b-black"
                : "border-none"
            } font-medium text-black`}
          >
            Contact Us
          </h1>
          <button className="relative h-auto w-auto flex flex-col items-center justify-center">
            <img
              onClick={() => setIsOptionsVisible(!isOptionsVisible)}
              src="/svg/profile.svg"
              alt=""
              className="h-[22px] w-[22px] object-fill cursor-pointer"
            />
            {isOptionsVisible && (
              <div className="absolute z-[1000] top-[40px] -right-6 min-h-[45px] rounded-[20px] w-[250px] bg-white flex flex-col items-center justify-start px-3 box-border overflow-hidden shadow-modal_header">
                {Object.keys(user).length > 1 ? (
                  <>
                    <div
                      onClick={() => router.push("/profile")}
                      className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer"
                    >
                      <span className="text-black font-[600] text-[1rem] ">
                        Your Account
                      </span>
                    </div>
                    <div className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer">
                      <span className="text-black font-[600] text-[1rem]">
                        My Orders
                      </span>
                    </div>
                    <div
                      onClick={logout}
                      className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer"
                    >
                      <span className="text-red-500 font-[600] text-[1rem]">
                        Log Out
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        setAuthType("login");
                        setIsAuthModalVisible(true);
                        setIsOptionsVisible(false);
                      }}
                      className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer"
                    >
                      <span className="text-black font-[600] text-[1rem] ">
                        Login
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setAuthType("signup");
                        setIsAuthModalVisible(true);
                        setIsOptionsVisible(false);
                      }}
                      className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer"
                    >
                      <span className="text-black font-[600] text-[1rem] ">
                        SignUp
                      </span>
                    </div>
                  </>
                )}
                {/* <div className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border">
                    <span className="text-black font-[600] text-[1rem]">Profile</span>
                </div> */}
              </div>
            )}
          </button>
          {Object.keys(user).length > 0 && (
            <button
              onClick={() => router.push("/cart")}
              className="flex justify-center items-center min-h-[40px] min-w-[130px] bg-black rounded-md "
            >
              <img className="h-[15px] w-[15px]" src="/svg/Cart.svg" alt="" />
              <div className="relative text-white text-sm font-medium ml-2 flex items-center justify-center">
                Cart
                <span className="absolute left-5 -top-2 min-h-[20px] min-w-[17px] rounded-full bg-red-500 ml-1 text-white text-[10px]">
                  {cart?.products?.length ?? 0}
                </span>
              </div>
            </button>
          )}
        </div>
        <div
          onClick={() => setIsNavbarOptionsVisible(!isNavbarOptionsVisible)}
          className="h-[60px] w-[70px] flex lg:hidden flex-col items-center justify-center"
        >
          <div
            className={`${
              isNavbarOptionsVisible
                ? styles.firstLineOpen
                : styles.firstLineClosed
            } w-[25px] h-[3px] bg-black rounded-x-[20px] duration-700 cursor-pointer`}
          ></div>
          <div
            className={`${
              isNavbarOptionsVisible
                ? styles.secondLineOpen
                : styles.secondLineClosed
            } w-[25px] h-[3px] bg-black rounded-x-[20px] duration-700 cursor-pointer`}
          ></div>
        </div>
      </div>
      {isNavbarOptionsVisible && (
        <div
          className={`${
            isNavbarOptionsVisible ? styles.drawerOpen : styles.drawerClose
          } w-full h-auto duration-700 bg-white flex flex-col items-center justify-start`}
        >
          <div
            onClick={() => {
              setIsNavbarOptionsVisible(false);
              router.push("/");
            }}
            className="w-full min-h-[50px] flex items-center justify-center px-5 "
          >
            <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
              <h1 className="text-black text-[1.4rem] font-[800] ">Home</h1>
            </div>
          </div>
          <div
            onClick={() => {
              setIsNavbarOptionsVisible(false);
              router.push("/shop");
            }}
            className="w-full min-h-[50px] flex items-center justify-center px-5 "
          >
            <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
              <h1 className="text-black text-[1.4rem] font-[800] ">Shop</h1>
            </div>
          </div>
          <div
            onClick={() => {
              setIsNavbarOptionsVisible(false);
              router.push("/");
            }}
            className="w-full min-h-[50px] flex items-center justify-center px-5 "
          >
            <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
              <h1 className="text-black text-[1.4rem] font-[800] ">
                Contact Us
              </h1>
            </div>
          </div>
          {Object.keys(user).length > 0 ? (
            <>
              <div
                onClick={() => {
                  setIsNavbarOptionsVisible(false);
                  router.push("/cart");
                }}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">Cart</h1>
                </div>
              </div>
              <div
                onClick={logout}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">
                    Log out
                  </h1>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setIsNavbarOptionsVisible(false);
                  setAuthType("login");
                  setIsAuthModalVisible(true);
                }}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">
                    Log In
                  </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setIsNavbarOptionsVisible(false);
                  setAuthType("signup");
                  setIsAuthModalVisible(true);
                }}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">
                    Sign Up
                  </h1>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
