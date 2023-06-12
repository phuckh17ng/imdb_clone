import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../config/db.js";
import { ShowingMovies } from "../models/ShowingMovies.js";
const addShowingMovies = async (req, res) => {
	try {
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
		}
		res.send(req.body);
		// console.log(req.body);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getShowingMovies = async (req, res) => {
	try {
		// var data = [];
		// const q = query(collection(db, "watchlist"), where("isAdded", "==", false));
		// const docs = await getDocs(q);
		// docs.forEach((doc) => {
		// 	// res.json(doc.data());
		// 	data = [...data, doc?.data()];
		// });
		res.send(res.json(data));
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

export { addShowingMovies, getShowingMovies };
