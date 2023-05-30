import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";
import {
	updateUserImage,
	updateUserName,
} from "../../firebase/firebaseFunctions";

export const getUserData = createAsyncThunk(
	"user/get",
	async (uid, thunkAPI) => {
		try {
			let data = {};
			let userImageURL = "";
			console.log(uid);
			const userRef = collection(db, "users");
			const q = query(userRef, where("uid", "==", uid));
			const docs = await getDocs(q);
			docs.forEach((doc) => {
				console.log(doc.data());
				data = doc.data();
			});
			const storage = getStorage();
			try {
				const storageRef = ref(storage, `userImages/${uid}`);
				await getDownloadURL(storageRef).then((url) => {
					userImageURL = url;
				});
			} catch (error) {
				console.log(error);
			}
			if (userImageURL === "") {
				userImageURL = data?.profileImage;
			}
			return { data, userImageURL: userImageURL };
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

export const setUserName = createAsyncThunk(
	"user/setName",
	async ({ uid, name }, thunkAPI) => {
		try {
			updateUserName(uid, name);
			return name;
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

export const setUserImage = createAsyncThunk(
	"user/setImage",
	async ({ uid, selectedImage }, thunkAPI) => {
		try {
			let userImageURL = "";
			console.log(selectedImage);
			await updateUserImage(uid, selectedImage);
			const storage = getStorage();
			const storageRef = ref(storage, `userImages/${uid}`);
			await getDownloadURL(storageRef).then((url) => {
				console.log(url);
				userImageURL = url;
			});
			return userImageURL;
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
