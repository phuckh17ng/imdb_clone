// import axios from "axios";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../../firebaseConfig";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import * as actionTypes from "../constants/watchlistConstants";

export const addMovieToWatchlist =
	(uid, movie) => async (dispatch, getState) => {
		dispatch({ type: actionTypes.ADD_MOVIE_TO_WATCHLIST });
		var data;
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
			} else {
				docs.forEach((document) => {
					updateDoc(doc(db, "watchlist", document.ref.id), {
						isAdded: true,
					});
				});
			}
			let movies = getState().watchlist.watchlistItems;
			console.log(movies);

			dispatch({
				type: actionTypes.ADD_MOVIE_TO_WATCHLIST_SUCCESS,
				payload: data,
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

export const getMovieFromWatchlist =
	(uid, movieId) => async (dispatch, getState) => {
		try {
			dispatch({ type: actionTypes.GET_WATCHLIST_REQUEST });

			var data;
			const q = query(
				collection(db, "watchlist"),
				where("watchlistId", uid + movieId)
			);
			const docs = await getDocs(q);
			docs.forEach((doc) => {
				data = doc.data();
			})
			dispatch({
				type: actionTypes.GET_WATCHLIST_SUCCESS,
				payload: data,
			});

			let movies = getState().watchlist.watchlistItems;
			console.log(movies);
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

// export const removeFromWatchlist = (movieId) => (dispatch, getState) => {
// 	dispatch({
// 		type: actionTypes.REMOVE_MOVIE_FROM_WATCHLIST,
// 		payload: movieId,
// 	});

// 	localStorage.setItem(
// 		"watchlist",
// 		JSON.stringify(getState().watchlist.watchlistItems)
// 	);
// };
