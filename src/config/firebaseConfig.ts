// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASBiq9tMRgNfuD0ymXtgEFwsnmv43c7ek",
  authDomain: "ecommerce-44479.firebaseapp.com",
  projectId: "ecommerce-44479",
  storageBucket: "ecommerce-44479.appspot.com",
  messagingSenderId: "855640429497",
  appId: "1:855640429497:web:29bfcc1b2c89b2731f5c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)