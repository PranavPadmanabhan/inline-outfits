/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useAppContext } from "@/contexts/AppContext";
import { getCart } from "@/pages/cart";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Extras.module.css";
import { Detector } from "react-detect-offline";
import { MdPortableWifiOff } from "react-icons/md";

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
    setIsProductUploadModalVisible
  } = useAppContext();
  const [isNavbarOptionsVisible, setIsNavbarOptionsVisible] =
    useState<boolean>(false);
    const [adminUser, setAdminUser] = useState<any>({})

  useEffect(() => {
    setIsOptionsVisible(false);
  }, [router.pathname]);

  useEffect(() => {
    getCart(setCart);
  }, [router.pathname, isAuthModalVisible]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setUser(user);
    } else {
      setUser({});
    }
  }, []);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin")!);
    if (admin) {
      setAdminUser(admin);
    } else {
      setAdminUser({});
    }
  }, []);

  const logout = () => {
    if (router.pathname.includes("admin")) {
      localStorage.setItem("admin", JSON.stringify({}));
      setAdminUser({});
      router.replace("/admin");
    } else {
      localStorage.setItem("user", JSON.stringify({}));
      window.location.reload();
      setIsOptionsVisible(false);
      setUser({});
    }
  };

  return (
    <div className="w-[100%] fixed top-0 z-[100] lg:min-h-[95px] min-h-[60px] flex flex-col items-center justify-center bg-white">
      <Detector
        render={({ online }) => {
          if (online) {
            return <div />;
          } else {
            return (
              <div className="lg:fixed relative top-0 w-full min-h-[25px] bg-red-500 flex items-center justify-center ">
                <MdPortableWifiOff color="black" size={16} />
                <h1 className="text-black text-[0.7rem] ml-1 font-normal">
                  bad internet connection..
                </h1>
              </div>
            );
          }
        }}
      />
      <div
        className={`w-full h-full flex items-center justify-between ${
          isNavbarOptionsVisible
            ? "border-b-[1px] border-b-[#00000057]"
            : "border-none"
        } mt-0 lg:mt-4`}
      >
        <div className="lg:min-h-[50px] lg:w-[12%] h-full w-[20%] ml-3 lg:ml-10">
          {" "}
          <img className="h-[80%] w-[80%]" src="/svg/In&O.svg" alt="" />
        </div>
        <div className="h-full w-[45%] hidden  lg:flex items-center justify-evenly">
          {router.pathname.includes("admin") && Object.keys(adminUser).length>0  ? (
            <button
              onClick={() => router.push("/admin/dashboard")}
              className={`text-[1rem] ${
                router.pathname === "/admin/dashboard"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black  cursor-pointer`}
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/")}
              className={`text-[1rem] ${
                router.pathname === "/"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black  cursor-pointer`}
            >
              Home
            </button>
          )}
          {router.pathname.includes("admin") && Object.keys(adminUser).length>0 ? (
            <button
            onClick={() => router.push("/admin/stickers")}
              className={`text-[1rem] ${
                router.pathname === "/admin/stickers"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black  cursor-pointer`}
            >
              Stickers
            </button>
          ) : (
            <button
              onClick={() => router.push("/shop")}
              className={`text-[1rem] ${
                router.pathname === "/shop"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black  cursor-pointer`}
            >
              Shop
            </button>
          )}
          {router.pathname.includes("admin") && Object.keys(adminUser).length>0? (
            <h1
            onClick={() => router.push("/admin/products")}
              className={`text-[1rem] ${
                router.pathname === "/admin/products"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black cursor-pointer`}
            >
              Products
            </h1>
          ) : (
            <h1
              className={`text-[1rem] ${
                router.pathname === "/contact"
                  ? "border-b-[1px] border-b-black"
                  : "border-none"
              } font-medium text-black  cursor-pointer`}
            >
              Contact Us
            </h1>
          )}
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
                    {!router.pathname.includes("admin") && (
                      <div
                        onClick={() => router.push("/profile")}
                        className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer"
                      >
                        <span className="text-black font-[600] text-[1rem] ">
                          My Account
                        </span>
                      </div>
                    )}
                    {!router.pathname.includes("admin") && (
                      <div onClick={() => router.push("/orders")} className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border cursor-pointer">
                        <span className="text-black font-[600] text-[1rem]">
                          My Orders
                        </span>
                      </div>
                    )}
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
                    {!router.pathname.includes("admin") && (
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
                    )}
                    {!router.pathname.includes("admin") && (
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
                    )}
                  </>
                )}
                {/* <div className="w-full min-h-[45px] border-b-[1px] border-b-thin_border flex items-center justify-start pl-1 box-border">
                    <span className="text-black font-[600] text-[1rem]">Profile</span>
                </div> */}
              </div>
            )}
          </button>
          {(Object.keys(user).length > 0 || Object.keys(adminUser).length>0 ) && (
            <button
              onClick={() => {
                if (router.pathname.includes("admin")) {
                  setIsProductUploadModalVisible(true)
                } else {
                  router.push("/cart");
                }
              }}
              className="flex justify-center items-center min-h-[40px] min-w-[130px] bg-black rounded-md "
            >
              {!router.pathname.includes("admin") && (
                <img className="h-[15px] w-[15px]" src="/svg/Cart.svg" alt="" />
              )}
              {router.pathname.includes("admin") && Object.keys(adminUser).length>0 ? (
                <div className="relative text-white text-sm font-medium ml-2 flex items-center justify-center">
                  Add Product
                </div>
              ) : (
                <div className="relative text-white text-sm font-medium ml-2 flex items-center justify-center">
                  Cart
                  <span className="absolute left-5 -top-2 min-h-[20px] min-w-[17px] rounded-full bg-red-500 ml-1 text-white text-[10px]">
                    {cart?.products?.length ?? 0}
                  </span>
                </div>
              )}
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
            } w-[25px] h-[3px] bg-black rounded-x-[20px] duration-500 cursor-pointer`}
          ></div>
          <div
            className={`${
              isNavbarOptionsVisible
                ? styles.secondLineOpen
                : styles.secondLineClosed
            } w-[25px] h-[3px] bg-black rounded-x-[20px] duration-500 cursor-pointer`}
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
                onClick={() => {
                  setIsNavbarOptionsVisible(false);
                  router.push("/profile");
                }}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">My Account</h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setIsNavbarOptionsVisible(false);
                  router.push("/orders");
                }}
                className="w-full min-h-[50px] flex items-center justify-center px-5 "
              >
                <div className="w-full h-full flex items-center justify-center border-b-[1px] border-b-[#0000003d] cursor-pointer">
                  <h1 className="text-black text-[1.4rem] font-[800] ">My Orders</h1>
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
