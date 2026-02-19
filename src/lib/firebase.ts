// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmdxQ1wdc3lnNkHZlskedqiJfE4AIOCIY",
    authDomain: "xgram-535be.firebaseapp.com",
    projectId: "xgram-535be",
    storageBucket: "xgram-535be.firebasestorage.app",
    messagingSenderId: "249355477437",
    appId: "1:249355477437:web:587bd669f2664939acb2d4",
    measurementId: "G-7EE3C1GXXY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics;

if (typeof window !== "undefined") {
    isSupported().then((supported: boolean) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export const auth = getAuth(app);
export { app, analytics };
