import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	logInWithEmailAndPassword,
	signInWithGoogle,
} from "../../firebase/firebaseFunctions";
export const authSignIn = createAsyncThunk(
	"auth/signin",
	async (email = false, password = false, thunkAPI) => {
		try {
			if (email && password) {
				logInWithEmailAndPassword(email, password);
			}
			signInWithGoogle();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
