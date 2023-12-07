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
import * as actionTypes from "../constants/watchlistConstants";

export const getWatchlist = (uid) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_WATCHLIST_REQUEST });
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

		dispatch({
			type: actionTypes.GET_WATCHLIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_WATCHLIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUserWatchlist = (userId, movieId) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_USER_WATCHLIST_REQUEST });
		var data = [];
		const q = query(
			collection(db, "watchlist"),
			where("watchlistId", "==", userId + movieId)
		);
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			data = [];
		} else {
			docs.forEach((doc) => {
				data = doc?.data();
			});
		}
		dispatch({
			type: actionTypes.GET_USER_WATCHLIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_USER_WATCHLIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addMovieToWatchlist = (uid, movie) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.ADD_MOVIE_TO_WATCHLIST_REQUEST });
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

		dispatch({
			type: actionTypes.ADD_MOVIE_TO_WATCHLIST_SUCCESS,
			payload: { isAdded: true },
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ADD_MOVIE_TO_WATCHLIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const removeFromWatchlist = (watchlistId) => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_REQUEST,
		});
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

		dispatch({
			type: actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS,
			payload: { isAdded: false },
		});
	} catch (error) {
		dispatch({
			type: actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
