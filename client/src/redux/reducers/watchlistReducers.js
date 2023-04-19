import * as actionTypes from "../constants/watchlistConstants";

export const watchlistReducer = (state = { watchlistItems: [] }, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_WATCHLIST:
			const movie = action.payload;
			const existMovies = state.watchlistItems.find((x) => x?.id === movie?.id);

			if (existMovies) {
				return {
					...state,
					watchlistItems: state.watchlistItems.map((x) =>
						x.id === existMovies?.id ? movie : x
					),
				};
			} else {
				return {
					...state,
					watchlistItems: [...state.watchlistItems, movie],
				};
			}
		case actionTypes.REMOVE_FROM_WATCHLIST:
			return {
				...state,
				watchlistItems: state.watchlistItems.filter(
					(x) => x.id !== action.payload
				),
			};
		case actionTypes.CLEAR_WATCHLIST:
			return { ...state, watchlistItems: [] };

		default:
			return state;
	}
};
