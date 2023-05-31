import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getUserWatchlist = createAsyncThunk(
	"watchlist/get",
	async (uid, thunkAPI) => {
		try {
			var data = [];
			const q = query(
				collection(db, "watchlist"),
				where("uid", "==", uid),
				where("isAdded", "==", true)
			);
			const docs = await getDocs(q);
			docs.forEach((doc) => {
				data = [...data, doc?.data()];
			});
			return data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addToWatchlist = createAsyncThunk(
	"watchlist/add",
	async (movie, thunkAPI) => {
		try {
			let data = {
				watchlistId: movie?.uid + movie.id,
				uid: movie?.uid,
				movieId: movie.id,
				image: movie.image,
				title: movie.title,
				fullTitle: movie.fullTitle,
				year: movie.year,
				imDbRating: movie.imDbRating,
				imDbRatingCount: movie.imDbRatingCount,
				description: movie.description,
				isAdded: true,
			};
			const q = query(
				collection(db, "watchlist"),
				where("watchlistId", "==", movie?.uid + movie.id)
			);
			const docs = await getDocs(q);

			if (docs.docs.length === 0) {
				addDoc(collection(db, "watchlist"), {
					watchlistId: movie?.uid + movie.id,
					uid: movie?.uid,
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
			return data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.error(message, error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteFromWatchlist = createAsyncThunk(
	"watchlist/delete",
	async (watchlistId, thunkAPI) => {
		try {
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

			return watchlistId;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.error(message, error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
