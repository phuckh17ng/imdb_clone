import * as actionTypes from "../constants/searchConstants";

export const getMovieSearchReducer = (state = { moviesSearch: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_SEARCH_MOVIES_REQUEST:
			return {
				loading: true,
				moviesSearch: [],
			};
		case actionTypes.GET_SEARCH_MOVIES_SUCCESS:
			return {
				moviesSearch: action.payload,
				loading: false,
			};
		case actionTypes.GET_SEARCH_MOVIES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
