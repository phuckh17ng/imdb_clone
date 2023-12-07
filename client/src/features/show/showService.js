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
import { updateBannerMovie } from "../../firebase/firestoreFunctions";

export const getShowingMovies = createAsyncThunk(
	"showingMovie/getAll",
	async (thunkAPI) => {
		try {
			var data = [];
			const q = query(collection(db, "showing-movie"));
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

export const getShowingMovie = createAsyncThunk(
	"showingMovie/get",
	async (movieId, thunkAPI) => {
		try {
			var data = [];
			const q = query(
				collection(db, "showing-movie"),
				where("movieId", "==", movieId)
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

export const addMovieBanner = createAsyncThunk(
	"showingMovie/addBanner",
	async ({ movieId, banner }, thunkAPI) => {
		let imgURL;
		try {
			await updateBannerMovie(movieId, banner).then((url) => {
				imgURL = url;
			});
			return imgURL;
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

export const addShowingMovie = createAsyncThunk(
	"showingMovie/add",
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
