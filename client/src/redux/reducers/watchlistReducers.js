// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
import * as actionTypes from "../constants/watchlistConstants";

export const watchlistReducer = (state = { watchlistItems: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_WATCHLIST_REQUEST:
			return {
				loading: true,
				watchlistItems: [],
			};
		case actionTypes.GET_WATCHLIST_SUCCESS:
			return {
				watchlistItems: action.payload,
				loading: false,
			};
		case actionTypes.GET_WATCHLIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const addToWatchlistReducer = (
	state = { watchlistItems: [] },
	action
) => {
	switch (action.type) {
		// case actionTypes.ADD_MOVIE_TO_WATCHLIST:
		// 	const q = query(
		// 		collection(db, "watchlist"),
		// 		where("watchlistId", "==", action.payload.watchlistId)
		// 	);
		// 	const docs = await getDocs(q);
		// 	var watchlistMovies = {};
		// 	docs.forEach((doc) => {
		// 		console.log(doc.data());
		// 		watchlistMovies = doc.data();
		// 	});

		// 	return {
		// 		loading: true,
		// 		movie: action.playload,
		// 	};
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_SUCCESS:
			return { ...state, watchlistItems: [...state, action.payload] };
		// case actionTypes.ADD_MOVIE_TO_WATCHLIST_FAIL:
		// 	return {
		// 		loading: false,
		// 		movie: [],
		// 		error: action.payload,
		// 	};
		default:
			return state;
	}
};
