// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-agent-ai-ca66b.firebaseapp.com",
  projectId: "multi-agent-ai-ca66b",
  storageBucket: "multi-agent-ai-ca66b.firebasestorage.app",
  messagingSenderId: "1009634439975",
  appId: "1:1009634439975:web:69fb63e4b4cffe04216f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()