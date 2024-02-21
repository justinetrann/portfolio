import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5ps_8KqwPYAFMrpPiPbiofj6Vp23NAEs",
  authDomain: "portfolio-justine.firebaseapp.com",
  projectId: "portfolio-justine",
  storageBucket: "portfolio-justine.appspot.com",
  messagingSenderId: "702247769098",
  appId: "1:702247769098:web:ea45e80faace3a9bfb7bf3",
  measurementId: "G-XDKZHHVBKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);