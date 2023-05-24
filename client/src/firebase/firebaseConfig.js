import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDIe4ydGxAxw_5egv7fRtDfJdUm4zO47ig",
	authDomain: "imdb-testing1.firebaseapp.com",
	projectId: "imdb-testing1",
	storageBucket: "imdb-testing1.appspot.com",
	messagingSenderId: "191179270054",
	appId: "1:191179270054:web:58702da1d26990c2d0d167",
	measurementId: "G-9MEMZLSGY2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
