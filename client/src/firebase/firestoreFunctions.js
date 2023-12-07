import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const updateBannerMovie = async (movieId, selectedImage) => {
	console.log(selectedImage);
	const storage = getStorage();
	const storageRef = ref(storage, `banner/${movieId}`);
	let bannerImg;
	await uploadBytes(storageRef, selectedImage);
	await getDownloadURL(storageRef).then((url) => {
		bannerImg = url;
	});
	return bannerImg;
};

const updateUserImage = async (uid, selectedImage) => {
	const storage = getStorage();
	const storageRef = ref(storage, `userImages/${uid}`);
	await uploadBytes(storageRef, selectedImage);
};

export { updateBannerMovie, updateUserImage };
