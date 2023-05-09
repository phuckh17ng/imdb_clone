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

		case actionTypes.ADD_MOVIE_TO_WATCHLIST:
			return {
				loading: true,
				isAdded: false,
			};
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_SUCCESS:
			return {
				loading: false,
				isAdded: true,
			};
		case actionTypes.ADD_MOVIE_TO_WATCHLIST_FAIL:
			return {
				loading: false,
				isAdded: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
