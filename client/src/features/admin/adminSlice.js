import { createSlice } from "@reduxjs/toolkit";
import {
	adminAddMovieBanner,
	adminAddShowingMovie,
	adminGetAllMovie,
	adminRemoveMovie,
	adminUndoRemoveMovie,
} from "./adminService";

const initialState = {
	all: [],
	movie: {},
	isDeleted: [],
	banner: "",
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(adminGetAllMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(adminGetAllMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.all = action.payload;
			})
			.addCase(adminGetAllMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(adminAddMovieBanner.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(adminAddMovieBanner.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.banner = action.payload;
			})
			.addCase(adminAddMovieBanner.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(adminAddShowingMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(adminAddShowingMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.movie = action.payload;
			})
			.addCase(adminAddShowingMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(adminRemoveMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(adminRemoveMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isDeleted = [...state.isDeleted, action.payload];
			})
			.addCase(adminRemoveMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(adminUndoRemoveMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(adminUndoRemoveMovie.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isDeleted = state.isDeleted.filter(
					(item) => item !== action.payload
				);
			})
			.addCase(adminUndoRemoveMovie.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default adminSlice.reducer;
