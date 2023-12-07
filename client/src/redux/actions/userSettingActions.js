import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";
import * as actionTypes from "../constants/userSettingConstants";

export const getUserData = (uid) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_USER_DATA_REQUEST });
		let data;
		const q = query(collection(db, "users"), where("uid", "==", uid));
		const docs = await getDocs(q);
		docs.forEach((doc) => {
			data = doc.data();
		});

		let userImageURL = "";
		const storage = getStorage();
		const storageRef = ref(storage, `userImages/${uid}`);
		try {
			await getDownloadURL(storageRef).then((url) => {
				userImageURL = url;
			});
		} catch (error) {
			console.log(error);
		}

		if (userImageURL === "") {
			userImageURL = data?.profileImage;
		}
		dispatch({
			type: actionTypes.GET_USER_DATA_SUCCESS,
			payload: { data, userImageURL: userImageURL },
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_USER_DATA_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
