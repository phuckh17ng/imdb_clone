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
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
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
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
				profileImage: user.photoURL,
				watchlist: null,
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
		const user = res.user;

		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name: name,
			authProvider: "local",
			email,
			password: password,
			profileImage: require("./images/icons8-customer-96.png"),
			watchlist: [],
		});
		alert("create account successfully");
		return true;
	} catch (err) {
		console.error(err);
		alert(err.message);
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

const addMovieToWatchlist = async (uid, movie) => {
	const q = query(
		collection(db, "watchlist"),
		where("watchlistId", "==", uid + movie.id)
	);
	const docs = await getDocs(q);
	if (docs.docs.length === 0) {
		addDoc(collection(db, "watchlist"), {
			watchlistId: uid + movie.id,
			uid: uid,
			movieId: movie.id,
			image: movie.image,
			title: movie.title,
			fullTitle: movie.fullTitle,
			year: movie.year,
			imDbRating: movie.imDbRating,
			imDbRatingCount: movie.imDbRatingCount,
			description: movie.description,
		});
	}
};

const removeFromWatchlist = async (watchlistId) => {
	const q = query(
		collection(db, "watchlist"),
		where("watchlistId", "==", watchlistId)
	);
	const docs = await getDocs(q);
	docs.forEach((document) => {
		console.log(document);
		console.log(document.ref.id);
		deleteDoc(doc(db, "watchlist", document.ref.id));
	});
};

const updateUserName = async (uid, name) => {
	const q = query(collection(db, "users"), where("uid", "==", uid));
	const docs = await getDocs(q);
	docs.forEach((document) => {
		console.log(document.ref.id);
		updateDoc(doc(db, "users", document.ref.id), {
			name: name,
		});
		console.log("updated");
	});
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
	addMovieToWatchlist,
	updateUserName,
	removeFromWatchlist,
};
