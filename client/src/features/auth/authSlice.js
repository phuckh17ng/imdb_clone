import { createSlice } from "@reduxjs/toolkit";
import { authSignIn } from "./authService";

const initialState = {
	isSiginIn: false,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const authSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authSignIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authSignIn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isSiginIn = true;
			})
			.addCase(authSignIn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default authSlice.reducer;
