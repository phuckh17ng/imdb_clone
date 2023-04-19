import axios from "axios";
import * as actionTypes from "../constants/watchlistConstants";

export const addToWatchlist = (movieId) => async (dispatch, getState) => {
	const { data } = await axios.get(
		`https://imdb-api.com/en/API/Title/k_hokq6b87/${movieId}`
	);

	dispatch({
		type: actionTypes.ADD_TO_WATCHLIST,
		payload: data,
	});

	localStorage.setItem(
		"watchlist",
		JSON.stringify(getState().watchlist.watchlistItems)
	);
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
