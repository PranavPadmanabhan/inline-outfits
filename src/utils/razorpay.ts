
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/initiate`, {
        method: "post",
        body: JSON.stringify({
          price:price
        }),
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          "Content-Type": "application/json",
        },
      })
      return response.json();
    } catch (error) {
      
    }
  };
  