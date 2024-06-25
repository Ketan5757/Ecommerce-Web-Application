// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB56NhX1KcGzzDSPhvzcCZYdpjnt7olNQc",
  authDomain: "techtitans-8dec1.firebaseapp.com",
  projectId: "techtitans-8dec1",
  storageBucket: "techtitans-8dec1.appspot.com",
  messagingSenderId: "923108720093",
  appId: "1:923108720093:web:c6bc35fecb9405b53c0a34",
  measurementId: "G-C4ZE03FX10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export{app , auth};