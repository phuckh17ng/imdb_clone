import { createSlice } from "@reduxjs/toolkit";
import { getUserWatchlist } from "./watchlistService";

const initialState = {
	watchlist: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const watchlistSlice = createSlice({
	name: "watchlist",
	initialState,
	reducers: {
		addToWatchlist: async (state, action) => {
			// const q = query(
			// 	collection(db, "watchlist"),
			// 	where("watchlistId", "==", uid + movie.id)
			// );
			// const docs = await getDocs(q);
			// if (docs.docs.length === 0) {
			// 	addDoc(collection(db, "watchlist"), {
			// 		watchlistId: uid + movie.id,
			// 		uid: uid,
			// 		movieId: movie.id,
			// 		image: movie.image,
			// 		title: movie.title,
			// 		fullTitle: movie.fullTitle,
			// 		year: movie.year,
			// 		imDbRating: movie.imDbRating,
			// 		imDbRatingCount: movie.imDbRatingCount,
			// 		description: movie.description,
			// 		isAdded: true,
			// 	});
			// } else {
			// 	docs.forEach((document) => {
			// 		updateDoc(doc(db, "watchlist", document.ref.id), {
			// 			isAdded: true,
			// 		});
			// 	});
			// }
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserWatchlist.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserWatchlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.watchlist = action.payload;
			})
			.addCase(getUserWatchlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default watchlistSlice.reducer;
