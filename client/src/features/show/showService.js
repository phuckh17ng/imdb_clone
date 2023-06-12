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
import { addShowingMovieFunc } from "../../firebase/firebaseFunctions";

export const getShowingMovies = createAsyncThunk(
	"showingMovies/get",
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

export const addShowingMovie = createAsyncThunk(
	"showingMovies/add",
	async (movie, thunkAPI) => {
		try {
			addShowingMovieFunc(movie);
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
