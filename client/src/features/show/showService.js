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
import {
	addShowingMovieFunc,
	updateBannerMovie,
} from "../../firebase/firebaseFunctions";

export const getShowingMovies = createAsyncThunk(
	"showingMovies/get",
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
		console.log(movieId, banner);
		let imgURL;
		try {
			await updateBannerMovie(movieId, banner).then((url) => {
				console.log(url);
				imgURL = url;
			});
			console.log(imgURL);
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
