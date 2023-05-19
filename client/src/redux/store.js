import { composeWithDevTools } from "@redux-devtools/extension";
import {
	applyMiddleware,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {
	getMovieDetailsReducer,
	getMoviesReducer,
	getMovieTrailerReducer,
} from "./reducers/moviesReducers";
import { getMovieSearchReducer } from "./reducers/searchReducers";
import { getUserDataReducer } from "./reducers/userSettingReducers";
import {
	addToWatchlist,
	removeFromWatchlist,
	watchlistReducer,
} from "./reducers/watchlistReducers";

let reducers = combineReducers({
	//MOVIE REDUCERS
	getMovies: getMoviesReducer,
	getMovieDetails: getMovieDetailsReducer,
	getMovieTrailer: getMovieTrailerReducer,

	//WATCHLIST REDUCERS
	getWatchlist: watchlistReducer,
	removeFromWatchlist: removeFromWatchlist,
	addToWatchlist: addToWatchlist,

	//SEARCH REDUCERS
	moviesSearch: getMovieSearchReducer,

	//USER SETTINGS REDUCERS
	userData: getUserDataReducer,
});
const middleware = [thunk];

const store = configureStore(
	{ reducer: reducers },
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
