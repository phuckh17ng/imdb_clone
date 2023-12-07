import { createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserImage, setUserName } from "./userService";

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
			})
			.addCase(setUserName.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(setUserName.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userData.data.name = action.payload;
			})
			.addCase(setUserName.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(setUserImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(setUserImage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userData.userImageURL = action.payload;
			})
			.addCase(setUserImage.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default userSlice.reducer;
