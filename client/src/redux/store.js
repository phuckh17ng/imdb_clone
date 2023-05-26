import { composeWithDevTools } from "@redux-devtools/extension";
import {
	applyMiddleware,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import moviesReducers from "../features/movie/movieSlice";
import watchlistReducers from "../features/watchlist/watchlistSlice";

import {
	getMovieDetailsReducer,
	getMoviesReducer,
	getMovieTrailerReducer,
} from "./reducers/moviesReducers";
import { getMovieSearchReducer } from "./reducers/searchReducers";
import { getUserDataReducer } from "./reducers/userSettingReducers";
import {
	addToWatchlist,
	getUserWatchlistReducer,
	removeFromWatchlist,
} from "./reducers/watchlistReducers";

let reducers = combineReducers({
	//MOVIE REDUCERS
	getMovies: getMoviesReducer,
	getMovieDetails: getMovieDetailsReducer,
	getMovieTrailer: getMovieTrailerReducer,

	//WATCHLIST REDUCERS
	// getWatchlist: watchlistReducer,
	removeFromWatchlist: removeFromWatchlist,
	addToWatchlist: addToWatchlist,
	getUserWatchlist: getUserWatchlistReducer,

	//SEARCH REDUCERS
	moviesSearch: getMovieSearchReducer,

	//USER SETTINGS REDUCERS
	userData: getUserDataReducer,

	//RTK
	movies: moviesReducers,
	watchlist: watchlistReducers,
});
const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
