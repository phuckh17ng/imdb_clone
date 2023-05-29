import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";

export const getUserData = createAsyncThunk(
	"user/get",
	async (uid, thunkAPI) => {
		try {
			let data = {};
			console.log(uid);
			const q = query(collection(db, "users"), where("uid", "==", uid));
			const docs = await getDocs(q);
			docs.forEach((doc) => {
				console.log(doc.data());
				data = doc.data();
			});

			let userImageURL = "";
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
			return { data };
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
