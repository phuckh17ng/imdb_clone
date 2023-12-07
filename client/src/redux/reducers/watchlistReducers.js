import * as actionTypes from "../constants/watchlistConstants";

export const watchlistReducer = (state = { watchlistMovies: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_WATCHLIST_REQUEST:
			return {
				loading: true,
				watchlistMovies: [],
			};
		case actionTypes.GET_WATCHLIST_SUCCESS:
			return {
				watchlistMovies: action.payload,
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

export const getUserWatchlistReducer = (
	state = { userWatchlist: [] },
	action
) => {
	switch (action.type) {
		case actionTypes.GET_USER_WATCHLIST_REQUEST:
			return {
				loading: true,
				userWatchlist: [],
			};
		case actionTypes.GET_USER_WATCHLIST_SUCCESS:
			return { loading: false, userWatchlist: action.payload };
		case actionTypes.GET_USER_WATCHLIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const addToWatchlist = (
	state = { addMovieToWatchlistState: {} },
	action
) => {
	switch (action.type) {
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_REQUEST:
			return { loading: true };
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_SUCCESS:
			return { loading: false, addMovieToWatchlistState: action.payload };
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const removeFromWatchlist = (
	state = { removeMovieFromWatchlistState: {} },
	action
) => {
	switch (action.type) {
		case actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_REQUEST:
			return { loading: true };
		case actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_SUCCESS:
			return { loading: false, removeMovieFromWatchlistState: action.payload };
		case actionTypes.REMOVE_MOVIE_FROM_WATCHLIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
