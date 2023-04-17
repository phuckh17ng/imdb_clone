import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBtSyM0k-9zYKiVt-Cr1sf9DJw_oOtZ_Rk",
	authDomain: "test1-eb299.firebaseapp.com",
	projectId: "test1-eb299",
	storageBucket: "test1-eb299.appspot.com",
	messagingSenderId: "741772489639",
	appId: "1:741772489639:web:9d9aeaf849facdb0e9fc82",
	measurementId: "G-M7EJ9N6ZFD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
