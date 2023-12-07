import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";
import { updateUserName } from "../../firebase/firebaseFunctions";
import { updateUserImage } from "../../firebase/firestoreFunctions";

export const getUserData = createAsyncThunk(
	"user/get",
	async (uid, thunkAPI) => {
		try {
			let data = {};
			let userImageURL = "";
			const userRef = collection(db, "users");
			const q = query(userRef, where("uid", "==", uid));
			const docs = await getDocs(q);
			docs.forEach((doc) => {
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
	async ({ uid, img }, thunkAPI) => {
		try {
			let userImageURL = "";
			await updateUserImage(uid, img);
			const storage = getStorage();
			const storageRef = ref(storage, `userImages/${uid}`);
			await getDownloadURL(storageRef).then((url) => {
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
