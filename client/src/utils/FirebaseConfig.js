import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBrFhlOyRZiWWnIIIHXnXzHx-UNpcxxJeM",
    authDomain: "whatsapp-clone-97dd2.firebaseapp.com",
    projectId: "whatsapp-clone-97dd2",
    storageBucket: "whatsapp-clone-97dd2.firebasestorage.app",
    messagingSenderId: "203112824760",
    appId: "1:203112824760:web:2847b427d24ed7da75994d",
    measurementId: "G-R1Q872HCXJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);