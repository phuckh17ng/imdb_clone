import { createAsyncThunk } from "@reduxjs/toolkit";
import {
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

export const adminGetAllMovie = createAsyncThunk(
	"admin/getAll",
	async (thunkAPI) => {
		try {
			var data = [];
			const q = query(
				collection(db, "showing-movie"),
				where("isDeleted", "==", false)
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

export const adminAddMovieBanner = createAsyncThunk(
	"admin/addBanner",
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

export const adminAddShowingMovie = createAsyncThunk(
	"admin/addMovie",
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

export const adminRemoveMovie = createAsyncThunk(
	"admin/removeMovie",
	async (movieId, thunkAPI) => {
		try {
			const q = query(
				collection(db, "showing-movie"),
				where("movieId", "==", movieId)
			);
			const docs = await getDocs(q);
			docs.forEach((document) => {
				updateDoc(doc(db, "showing-movie", document.ref.id), {
					isDeleted: true,
				});
			});

			return movieId;
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

export const adminUndoRemoveMovie = createAsyncThunk(
	"admin/undoRemoveMovie",
	async (movieId, thunkAPI) => {
		try {
			const q = query(
				collection(db, "showing-movie"),
				where("movieId", "==", movieId)
			);
			const docs = await getDocs(q);
			docs.forEach((document) => {
				updateDoc(doc(db, "showing-movie", document.ref.id), {
					isDeleted: false,
				});
			});

			return movieId;
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
