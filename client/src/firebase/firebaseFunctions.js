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
import { child, getDatabase, push, ref, update } from "firebase/database";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { auth, db } from "./firebaseConfig";
import { seat } from "./seat";
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
				role: "user",
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
			role: "user",
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

// const updateUserImage = async (uid, selectedImage) => {
// 	const storage = getStorage();
// 	const storageRef = ref(storage, `userImages/${uid}`);
// 	await uploadBytes(storageRef, selectedImage);
// };

// const updateBannerMovie = async (movieId, selectedImage) => {
// 	console.log(selectedImage);
// 	const storage = getStorage();
// 	const storageRef = ref(storage, `banner/${movieId}`);
// 	let bannerImg;
// 	await uploadBytes(storageRef, selectedImage);
// 	await getDownloadURL(storageRef).then((url) => {
// 		bannerImg = url;
// 	});
// 	return bannerImg;
// };

const addShowingMovieSeat = async (name, cinema, day, time) => {
	const q = query(
		collection(db, "seat"),
		where("name", "==", name),
		where("cinema", "==", cinema),
		where("day", "==", day),
		where("time", "==", time)
	);
	const docs = await getDocs(q);

	let data = {
		name: name,
		cinema: cinema,
		day: day,
		time: time,
		allSeat: seat,
	};

	// const unsubscribe = onSnapshot(q, (snapshot) => {
	// 	snapshot.docChanges().forEach((change) => {
	// 	  if (change.type === "added") {
	// 		  console.log("New Ticket: ", change.doc.data());
	// 	  }
	// 	  if (change.type === "modified") {
	// 		  console.log("Modified: ", change.doc.data());
	// 	  }
	// 	  if (change.type === "removed") {
	// 		  console.log("Removed: ", change.doc.data());
	// 	  }
	// 	});
	//   });;
	// const unsubscribe = onSnapshot(q, (querySnapshot) => {
	// 	let cities;
	// 	querySnapshot.forEach((doc) => {
	// 		cities = doc.data();
	// 	});
	// 	console.log("Current Seat: ", cities);
	// 	return cities;
	// });

	if (docs.docs.length === 0) {
		addDoc(collection(db, "seat"), data);
	} else {
		docs.forEach((doc) => {
			data = doc.data();
		});
	}
	return data;
};
const getAllSeatRealTime = (name, cinema, day, time) => {
	const q = query(
		collection(db, "seat"),
		where("name", "==", name),
		where("cinema", "==", cinema),
		where("day", "==", day),
		where("time", "==", time)
	);
	onSnapshot(q, (querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(doc?.data());
			return doc?.data();
		});
	});
	// console.log(cities);
	// return cities;
};
const seatPaymentFunc = async (form) => {
	const q = query(
		collection(db, "seat"),
		where("name", "==", form.movieName),
		where("cinema", "==", form.movieCinema),
		where("day", "==", form.movieDay),
		where("time", "==", form.movieTime)
	);
	const docs = await getDocs(q);
	docs.forEach((document) => {
		// data = [...data, doc?.data()];

		for (let i = 0; i < form.seat.length; i++) {
			const seatId = form.seat[i];
			let updatedObj = {
				[`allSeat.${seatId}.name`]: form.name,
				[`allSeat.${seatId}.email`]: form.email,
				[`allSeat.${seatId}.phoneNumber`]: form.phoneNumber,
				[`allSeat.${seatId}.status`]: "selected",
				seatSelected: arrayUnion(seatId),
			};
			updateDoc(doc(db, "seat", document.ref.id), updatedObj);
		}
	});
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
	getAllSeatRealTime,
	logInWithEmailAndPassword,
	logout,
	registerWithEmailAndPassword,
	removeFromWatchlist,
	seatPaymentFunc,
	sendPasswordReset,
	signInWithFacebook,
	signInWithGoogle,
	updateUserName,
};
