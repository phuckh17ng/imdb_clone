import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "./userService";

const initialState = {
	userData: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userData = action.payload;
			})
			.addCase(getUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default userSlice.reducer;
