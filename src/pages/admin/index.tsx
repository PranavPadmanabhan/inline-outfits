import Header from '@/components/Header'
import Input from '@/components/Input';
import { passwordRegex, phoneRegex } from '@/constants/constants';
import { useAppContext } from '@/contexts/AppContext';
import { useStorageUpload } from '@thirdweb-dev/react';
import { Call, Key, User } from 'iconsax-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ImSpinner4 } from 'react-icons/im';

type state = {
  name: string;
  phone: string;
  password: string;
};

type Error = {
  name: string;
  phone: string;
  password: string;
};

type Loading = {
  signingUp: boolean;
  signingIn: boolean;
  sentingOtp: boolean;
  verifying: boolean;
};

const AdminPage = () => {

    const [file, setFile] = useState<any[]>([])

    const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload();

    const uploadFile = async () => {
        if (file.length > 0) {
          const uploadedData = await upload({
            data: file,
            options: {
              uploadWithGatewayUrl: true,
              uploadWithoutDirectory: false,
            },
          });
        } else {
          alert("Select one file");
        }
      };


      const [state, setState] = useState<state>({
        phone: "",
        name: "",
        password: "",
      });
      const [error, setError] = useState<Error>({
        password: "",
        name: "",
        phone: "",
      });
      const [loading, setLoading] = useState<Loading>({
        signingUp: false,
        signingIn: false,
        sentingOtp: false,
        verifying: false,
      });
    
      const [otpSent, setOtpSent] = useState<boolean>(false);
      const [otp, setOtp] = useState<string>("");
      const { setIsAuthModalVisible, setUser, authType, setAuthType } = useAppContext();
      const router = useRouter()

    
      useEffect(() => {
        setError({
          name: "",
          phone: "",
          password: "",
        });
        setState({
          name: "",
          password: "",
          phone: "",
        });
      }, [authType]);


      useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin")!)
        if(admin && Object.keys(admin).length > 0){
          router.replace("/admin/dashboard")
        }
      },[])
    
      const signup = async (e?: any) => {
        e?.preventDefault();
        if (
          state.name.trim().length !== 0 &&
          state.phone.trim().length !== 0 &&
          state.password.trim().length !== 0
        ) {
          try {
            setLoading({ ...loading, signingUp: true });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/signup`, {
              method: "post",
              body: JSON.stringify({
                name: state.name,
                phone: state.phone,
                password: state.password,
              }),
              headers: {
                apikey: process.env.NEXT_PUBLIC_API_KEY!,
                "Content-Type": "application/json",
              },
            })
            const data = await res.json();
            if (!data.error) {
              setUser(data.user);
              localStorage.setItem("admin", JSON.stringify(data.user));
              // onSignup()
              router.push("/admin/dashboard")
            } else {
              setUser({});
              localStorage.setItem("admin", JSON.stringify({}));
              setError({
                name: "",
                phone: "",
                password: data.error,
              });
            }
            setLoading({ ...loading, signingUp: false });
          } catch (error: any) {
            setLoading({ ...loading, signingUp: false });
            // ;
          }
        } else {
          if (
            state.name.trim().length === 0 &&
            state.phone.trim().length === 0 &&
            state.password.trim().length === 0
          ) {
            setError({
              name: "name is required",
              phone: "phone is required",
              password: "password is required",
            });
          } else if (
            state.phone.trim().length === 0 &&
            state.name.trim().length === 0
          ) {
            setError({
              name: "name is required",
              phone: "phone is required",
              password: "",
            });
          } else if (
            state.phone.trim().length === 0 &&
            state.password.trim().length === 0
          ) {
            setError({
              name: "",
              phone: "phone is required",
              password: "password is required",
            });
          } else if (
            state.name.trim().length === 0 &&
            state.password.trim().length === 0
          ) {
            setError({
              name: "name is required",
              phone: "",
              password: "password is required",
            });
          } else if (state.name.trim().length === 0) {
            setError({
              name: "name is required",
              phone: "",
              password: "",
            });
          } else if (state.password.trim().length === 0) {
            setError({
              name: "",
              phone: "",
              password: "password is required",
            });
          } else if (!passwordRegex.test(state.password)) {
            setError({
              name: "",
              phone: "",
              password: "password is weak",
            });
          } else {
            setError({
              name: "",
              phone: "phone is required",
              password: "",
            });
          }
        }
      };
    
      const onCaptchaVerify = async () => {
        // if (!window.recaptchaVerifier) {
        //   window.recaptchaVerifier = new RecaptchaVerifier(
        //     "recaptcha-container",
        //     {
        //       size: "invisible",
        //       callback: (response: any) => {
        //         onSignup();
        //       },
        //       "expired-callback": () => {},
        //     },
        //     auth
        //   );
        // }
      };
    
      const onSignup = async () => {
        // setLoading({ ...loading, sentingOtp: true });
        // onCaptchaVerify();
        // const appVerifier = window.recaptchaVerifier;
        // signInWithPhoneNumber(auth, `+91${state.phone}`, appVerifier)
        //   .then((confirmationResult) => {
        //     console.log(confirmationResult);
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).
        //     window.confirmationResult = confirmationResult;
        //     setLoading({ ...loading, sentingOtp: false });
        //     setOtpSent(true);
    
        //     // ...
        //   })
        //   .catch((error) => {
        //     // Error; SMS not sent
        //     // ...
        //     setLoading({ ...loading, sentingOtp: false });
        //     ;
    
        //     setOtpSent(false);
        //   });
      };
    
      const VerifyOTP = async (otp: number | string) => {
        // setLoading({ ...loading, verifying: true });
        // window.confirmationResult.confirm(otp).then(async (resp: any) => {
        //   try {
        //     console.log(resp.user);
        //     const res = await fetch(
        //       `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${state?.phone}`,
        //       {
        //         method:'put',
        //         body:JSON.stringify({
        //           phone: state.phone,
        //           password: state.password,
        //         }),
        //         headers: {
        //           apikey: process.env.NEXT_PUBLIC_API_KEY!,
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     );
        //     const data = await res.json();
        //     if (data.message) {
        //       setUser(data.user);
        //       localStorage.setItem("user", JSON.stringify(data.user));
        //     }
        //   } catch (error) {}
        //   setLoading({ ...loading, verifying: false });
        //   setIsAuthModalVisible(false);
        //   ;
        // });
      };
    
      const signin = async (e?: any) => {
        e?.preventDefault();
    
        if (state.phone.trim().length !== 0 && state.password.trim().length !== 0) {
          try {
            setLoading({ ...loading, signingIn: true });
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/signin`, {
              method: "post",
              headers: {
                apikey: process.env.NEXT_PUBLIC_API_KEY!,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phone: state.phone,
                password: state.password,
              }),
            })
             
            const data = await res.json();
            if (data.message) {
              setUser(data.user);
              localStorage.setItem("admin", JSON.stringify(data.user));
              // onSignup()
              router.push("/admin/dashboard")
            } else {
              setUser({});
              setError({
                name: "",
                phone: "",
                password: data.error,
              });
              localStorage.setItem("user", JSON.stringify({}));
            }
            setLoading({ ...loading, signingIn: false });
          } catch (error) {
            setLoading({ ...loading, signingIn: false });
          }
        } else {
          if (
            state.phone.trim().length === 0 &&
            state.password.trim().length === 0
          ) {
            setError({
              name: "",
              phone: "phone is required",
              password: "password is required",
            });
          } else if (state.password.trim().length === 0) {
            setError({
              name: "",
              phone: "",
              password: "password is required",
            });
          } else if (!passwordRegex.test(state.password)) {
            setError({
              name: "",
              phone: "",
              password: "password is weak",
            });
          } else {
            setError({
              name: "",
              phone: "phone is required",
              password: "",
            });
          }
        }
      };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start pt-[50px] lg:pt-[100px]'>
        <Header />
        <div className="relative lg:w-[80%] w-[85%]  lg:h-[70%] h-[50%] lg:rounded-[30px] rounded-[20px] bg-white flex items-center overflow-hidden justify-between">
        {otpSent ? (
          <div className="lg:w-1/2 w-full h-full flex flex-col items-center justify-start">
            <div
              className={`min-w-[120px] lg:min-h-[50px] min-h-[40px] lg:mt-8 mt-4 lg:mb-5 mb-3 flex items-center justify-center `}
            >
              <img className="h-[80%] w-[80%]" src="/svg/In&O.svg" alt="" />
            </div>
            <span className="text-black text-[0.8rem]  ">
              Please enter the OTP sent to <br />{" "}
              <span className="text-[0.9rem] font-[700] ">
                +91 {state.phone}
              </span>
            </span>
            {/* <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-1"></span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
                marginBottom: "10%",
              }}
              inputStyle={{
                height: 40,
                width: 35,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            /> */}
            <button
              onClick={() => VerifyOTP(otp)}
              className={`min-w-[160px] h-[40px] rounded-md bg-black flex items-center justify-center`}
            >
              {loading.verifying ? (
                <ImSpinner4
                  color="white"
                  size={24}
                  className="animate-rotate"
                />
              ) : (
                <h1 className="text-white text-[1rem] font-[500]">Verify</h1>
              )}
            </button>
          </div>
        ) : (
          <div className="lg:w-1/2 w-full h-full flex flex-col items-center justify-start">
            <div id="recaptcha-container"></div>
            <div
              className={`min-w-[120px] lg:min-h-[50px] min-h-[40px] ${
                authType === "login" ? "lg:mt-8 mt-4 ml-4 -mb-1" : "lg:mt-3 mt-0 ml-4 -mb-3"
              } lg:mb-6 mb-2 `}
            >
              <img className="h-[80%] w-[80%]" src="/svg/In&O.svg" alt="" />
            </div>
            {authType === "signup" && (
              <div className="w-[80%] h-auto flex flex-col items-start justify-start">
                <Input
                  classNames={{ wrapper: "w-full" }}
                  value={state.name}
                  PrefixIcon={User}
                  onChange={(e) => {
                    setState({ ...state, name: e.target.value });
                    if (e.target.value.trim().length == 0) {
                      setError({ ...error, name: "" });
                    } else if (e.target.value.length <= 3) {
                      setError({ ...error, name: "Invalid Name" });
                    } else {
                      setError({ ...error, name: "" });
                    }
                  }}
                  placeholder="name"
                  state={
                    state.name.trim().length === 0
                      ? "normal"
                      : state.name.length <= 3
                      ? "error"
                      : "success"
                  }
                />
                <h1
                  className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter h-[20px] w-full`}
                >
                  {error.name}
                </h1>
              </div>
            )}

            <div className="w-[80%] h-auto flex flex-col items-start justify-start">
              <Input
                value={state.phone}
                PrefixIcon={Call}
                classNames={{ wrapper: "w-full" }}
                onChange={(e) => {
                  setState({ ...state, phone: e.target.value });
                  if (e.target.value.trim().length === 0) {
                    setError({ ...error, phone: "" });
                  } else if (!phoneRegex.test(e.target.value)) {
                    setError({ ...error, phone: "Invalid phone" });
                  } else {
                    setError({ ...error, phone: "" });
                  }
                }}
                placeholder="phone"
                state={
                  state.phone.trim().length === 0
                    ? "normal"
                    : phoneRegex.test(state.phone)
                    ? "success"
                    : "error"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter h-[20px] w-full`}
              >
                {error.phone}
              </h1>
            </div>

            <div className="w-[80%] h-auto flex flex-col items-start justify-start">
              <Input
                value={state.password}
                type="password"
                PrefixIcon={Key}
                classNames={{ wrapper: "w-full" }}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                  if (e.target.value.trim().length === 0) {
                    setError({ ...error, password: "" });
                  } else if (!passwordRegex.test(e.target.value)) {
                    setError({ ...error, password: "Weak Password" });
                  } else {
                    setError({ ...error, password: "" });
                  }
                }}
                placeholder="password"
                state={
                  state.password.trim().length === 0
                    ? "normal"
                    : passwordRegex.test(state.password)
                    ? "success"
                    : "error"
                }
              />
              <h1
                className={`self-start text-[0.8rem] text-red-700 font-[700] font-inter h-[20px] w-full`}
              >
                {error.password}
              </h1>
            </div>
            <button
              className={`min-w-[160px] min-h-[40px] rounded-md bg-black flex items-center justify-center  ${
                authType === "login" ? "lg:mt-4 mt-2" : "mt-2"
              }`}
              onClick={authType === "login" ? signin : signup}
            >
              {loading.signingUp || loading.signingIn || loading.sentingOtp ? (
                <ImSpinner4
                  color="white"
                  size={24}
                  className="animate-rotate"
                />
              ) : (
                <h1 className="text-white text-[1rem] font-[500]">
                  {authType === "login" ? "Login" : "Sign Up"}
                </h1>
              )}
            </button>
            <button
              onClick={() =>
                setAuthType(authType === "login" ? "signup" : "login")
              }
              className="text-black text-[0.9rem] mt-2 bg-white "
            >
              {authType === "login"
                ? "New to In&O ? Create Account"
                : "Already have account? Login"}
            </button>
          </div>
        )}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center">
          <img
            src="/svg/T6.svg"
            alt=""
            className="w-[90%] h-[80%] object-fill rounded-[20px]"
          />
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(AdminPage),{ssr:false})