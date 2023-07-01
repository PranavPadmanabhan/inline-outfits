import Axios from "@/config/AxiosConfig";

export const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  
  export const createRazorpayOrder = async (price:any) => {
    try {
      // Make an API call to your server to create the Razorpay order
      const response = await Axios.post('/payment/initiate',{
        price:price
      });
      return response.data;
    } catch (error) {
      console.log("hello")

    }
  };
  