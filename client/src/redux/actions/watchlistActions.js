// import axios from "axios";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig";
import * as actionTypes from "../constants/watchlistConstants";

export const addToWatchlist = (movieId) => async (dispatch, getState) => {
	dispatch({
		type: actionTypes.ADD_TO_WATCHLIST,
		payload: {
			id: movieId,
		},
	});

	let movies = getState().watchlist.watchlistItems;
	console.log(movies);
};

export const removeFromWatchlist = (movieId) => (dispatch, getState) => {
	dispatch({
		type: actionTypes.REMOVE_FROM_WATCHLIST,
		payload: movieId,
	});

	localStorage.setItem(
		"watchlist",
		JSON.stringify(getState().watchlist.watchlistItems)
	);
};
