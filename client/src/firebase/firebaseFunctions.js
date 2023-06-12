import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
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
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { auth, db } from "./firebaseConfig";

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
			profileImage: require("../images/icons8-customer-96.png"),
			watchlist: [],
		});
		toast("Create account successfully!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
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
		updateDoc(doc(db, "users", document.ref.id), {
			name: name,
		});
		console.log("updated");
	});
};

const updateUserImage = async (uid, selectedImage) => {
	const storage = getStorage();
	const storageRef = ref(storage, `userImages/${uid}`);
	await uploadBytes(storageRef, selectedImage);
};

const logout = () => {
	signOut(auth);
};

const addShowingMovieFunc = async (movie) => {
	addDoc(collection(db, "showing-movie"), {
		movieId: movie.movieId,
		userAdd: movie.userAdd,
		dayCreate: movie.dayCreate,
		_name: movie._name,
		_gerne: movie._gerne,
		_actor: movie._actor,
		_director: movie._director,
		_type: movie._type,
		_trailer: movie._trailer,
		_banner: movie._banner,
		_cinema: movie._cinema,
		_day: movie._day,
		_time: movie._time,
	});
};

export {
	addMovieToWatchlist,
	addShowingMovieFunc,
	logInWithEmailAndPassword,
	logout,
	registerWithEmailAndPassword,
	removeFromWatchlist,
	sendPasswordReset,
	signInWithFacebook,
	signInWithGoogle,
	updateUserImage,
	updateUserName,
};
