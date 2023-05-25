import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCrhJMmZBJPHfMtzzWbdvDRQO_fSD5btgc",
	authDomain: "imdb-clone-8dbda.firebaseapp.com",
	projectId: "imdb-clone-8dbda",
	storageBucket: "imdb-clone-8dbda.appspot.com",
	messagingSenderId: "1049637595267",
	appId: "1:1049637595267:web:85d516855f3925bf1893b6",
	measurementId: "G-N8H7QZSDLQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
