// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	addDoc,
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate;
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
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		console.log(user.uid);
		console.log(docs);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
				profileImage: user.photoURL,
				password: user.password,
			});
		}
	} catch (err) {
		console.error(err);
		console.log(err.message);
	}
};

const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		console.log(res);
		const user = res.user;
		console.log(name);

		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name: name,
			authProvider: "local",
			email,
			password: password,
			profileImage: require("./images/icons8-customer-96.png"),
		});
		alert("create account successfully");
		return true;
	} catch (err) {
		console.error(err);
		alert(err.message);
		return false;
	}
};
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		console.log("Password reset link sent!");
	} catch (err) {
		console.error(err);
		console.log(err.message);
	}
};

const logout = () => {
	signOut(auth);
};
export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
