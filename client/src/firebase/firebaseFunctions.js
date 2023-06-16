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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

const updateBannerMovie = async (movieId, selectedImage) => {
	console.log(selectedImage);
	const storage = getStorage();
	const storageRef = ref(storage, `banner/${movieId}`);
	let bannerImg;
	await uploadBytes(storageRef, selectedImage);
	await getDownloadURL(storageRef).then((url) => {
		bannerImg = url;
	});
	return bannerImg;
};

const seat = [
	{ seat: "0", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "1", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "2", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "3", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "4", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "5", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "6", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "7", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "8", name: "", email: "", phoneNumber: "", status: "none" },
	{ seat: "9", name: "", email: "", phoneNumber: "", status: "none" },
];
const addShowingMovieSeat = async (cinema, day, time) => {
	const q = query(
		collection(db, "seat"),
		where("cinema", "==", cinema),
		where("day", "==", day),
		where("time", "==", time)
	);
	const docs = await getDocs(q);

	let data = {
		cinema: cinema,
		day: day,
		time: time,
		_A: seat,
		_B: seat,
		_C: seat,
		_D: seat,
		_E: seat,
		_F: seat,
		_G: seat,
		_H: seat,
	};
	if (docs.docs.length === 0) {
		addDoc(collection(db, "seat"), data);
	} else {
		docs.forEach((doc) => {
			data = doc.data();
		});
	}
	return data;
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
	addShowingMovieSeat,
	logInWithEmailAndPassword,
	logout,
	registerWithEmailAndPassword,
	removeFromWatchlist,
	sendPasswordReset,
	signInWithFacebook,
	signInWithGoogle,
	updateBannerMovie,
	updateUserImage,
	updateUserName,
};
