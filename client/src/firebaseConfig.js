import { initializeApp } from "firebase/app";
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import "firebase/compat/firestore";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import {
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
} from "firebase/storage";

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
const facebookProvider = new FacebookAuthProvider();

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

const signInWithFacebook = async () => {
	try {
		const res = await signInWithPopup(auth, facebookProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "facebook",
				// email: user.email,
				// profileImage: user.photoURL,
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
			isAdded: true,
		});
	} else {
		docs.forEach((document) => {
			updateDoc(doc(db, "watchlist", document.ref.id), {
				isAdded: true,
			});
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
		updateDoc(doc(db, "watchlist", document.ref.id), {
			isAdded: false,
		});
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

const updateUserImage = async (uid) => {
	const storage = getStorage();
	const listRef = ref(storage, `images/${uid}`);

	// Find all the prefixes and items.
	await listAll(listRef)
		.then((res) => {
			res.prefixes.forEach((folderRef) => {
				// All the prefixes under listRef.
				// You may call listAll() recursively on them.
			});
			res.items.forEach((itemRef) => {
				// All the items under listRef.
				getDownloadURL(itemRef);
				console.log(getDownloadURL(itemRef));
			});
		})
		.catch((error) => {
			// Uh-oh, an error occurred!
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
	updateUserImage,
	signInWithFacebook,
};
