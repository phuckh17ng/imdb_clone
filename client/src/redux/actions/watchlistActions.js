import axios from "axios";
import * as actionTypes from "../constants/watchlistConstants";

export const addToWatchlist = (movieId) => async (dispatch, getState) => {
	// try {
	// const { data } = await axios.get(
	// 	`https://imdb-api.com/en/API/Title/k_ed69mhut/${movieId}`
	// );

	dispatch({
		type: actionTypes.ADD_TO_WATCHLIST,
		payload: {
			movieId: movieId,
		},
	});

	localStorage.setItem(
		"watchlist",
		JSON.stringify(getState().watchlist.watchlistItems)
	);
	// } catch (error) {
	// 	dispatch({
	// 		type: actionTypes.GET_MOVIES_FAIL,
	// 		payload:
	// 			error.response && error.response.data.message
	// 				? error.response.data.message
	// 				: error.message,
	// 	});
	// }
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
