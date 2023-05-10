import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { doc } from "firebase/firestore";
// import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	auth,
	db,
	sendPasswordReset,
	updateUserImage,
	updateUserName,
} from "../firebaseConfig";
import "./UserSettingsPage.css";

const UserSettingsPage = () => {
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState();
	const [disable, setDisable] = useState(true);
	const [name, setName] = useState("");
	const handleChangeName = (e) => {
		e.preventDefault();
		updateUserName(user?.uid, name);
		setDisable(!disable);
		console.log(name);
		if (name !== "") {
			console.log(1);
			toast("User name has been changed!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const handleChangePassword = () => {
		sendPasswordReset(userData?.email);
		toast("An email has been sent!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const handleChangeUserImage = (event) => {
		console.log(event.target.files[0]);
		setSelectedImage(event.target.files[0]);
		window.location.reload();
		// toast("User image has been changed!", {
		// 	position: "top-right",
		// 	autoClose: 5000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: "light",
		// });
		// setTimeout(() => {}, 2000);
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const fetchUserData = async () => {
			if (loading) return;
			if (user !== null) {
				const q = query(collection(db, "users"), where("uid", "==", user?.uid));
				console.log(q);
				const docs = await getDocs(q);
				console.log(docs);
				docs.forEach((docc) => {
					setUserData(docc.data());
					console.log(docc.ref.id);
				});
			}
		};
		fetchUserData();
	}, [user?.uid, loading, user]);

	console.log(userData);
	console.log(user);
	const storage = getStorage();
	const storageRef = ref(storage, `userImages/${userData?.uid}`);
	const [selectedImage, setSelectedImage] = useState(null);
	if (selectedImage !== null && selectedImage !== undefined) {
		uploadBytes(storageRef, selectedImage).then((snapshot) => {
			console.log("Uploaded a blob or file!");
			console.log(snapshot);
		});
	}
	const [loadingUserImage, setLoadingUserImage] = useState(true);
	const [userImageURL, setUserImageURL] = useState(null);
	getDownloadURL(storageRef)
		.then((url) => {
			// const xhr = new XMLHttpRequest();
			// xhr.responseType = "blob";
			// xhr.onload = (event) => {
			// 	// const blob = xhr.response;
			// };
			// xhr.open("GET", url);
			// xhr.send();
			setUserImageURL(url);
			setLoadingUserImage(false);
			// Or inserted into an <img> element
			// const img = document.getElementById("myimg");
			// img.setAttribute("src", url);
		})
		.catch((error) => {
			// Handle any errors
		});
	// Find all the prefixes and items.
	console.log(updateUserImage);
	console.log(loadingUserImage);
	console.log(userImageURL);

	return (
		<div className="h-[400px] bg-zinc-100 text-black px-3 py-12">
			<div className="w-2/3 h-full bg-white m-auto flex items-center justify-between rounded-xl max-lg:w-4/5 max-md:w-full">
				<div className="w-full mx-auto flex items-center justify-start h-full">
					<div className="w-1/3 flex items-center justify-center border-r-[1px] border-zinc-200 h-3/4 px-3 min-w-[120px]">
						<div className="user--img border-zinc-800 border rounded-full h-fit bg-zinc-100/50 p-2 hover:brightness-[.85] relative flex justify-center items-center">
							<img
								src={
									userImageURL !== null ? userImageURL : userData?.profileImage
								}
								alt="profile"
								className="rounded-full w-[120px] max-md:min-w-0"
							/>

							<div className="edit w-full h-full absolute flex justify-center items-center">
								<label
									for="files"
									class="btn edit--btn w-full h-full flex justify-center items-center rounded-full"
								>
									<img
										src={require("../images/icons8-edit-24 (1).png")}
										alt="edit"
										className="w-[20px] h-[20px] ml-2"
									/>
								</label>

								<input
									id="files"
									style={{ visibility: "hidden" }}
									type="file"
									className="absolute"
									onChange={handleChangeUserImage}
								/>
							</div>
						</div>
					</div>

					<div className="w-3/5 mx-auto flex justify-around">
						<div className="px-3 w-full">
							<div className="my-2">
								<span className="text-lg text-zinc-900 mr-2 font-light">
									Email:
								</span>
								<span className="text-zinc-800/70 font-light">
									{userData?.email}
								</span>
							</div>
							<div className="my-2">
								<span className="text-lg text-zinc-900 mr-2 font-light">
									User name:
								</span>
								<input
									className={
										disable
											? ` bg-white font-light disabled:text-zinc-800/70 pl-1`
											: "text-black pl-1 font-normal bg-white focus:border-black focus:border placeholder:text-black "
									}
									placeholder={userData?.name}
									disabled={disable}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
								<img
									src={require("../images/icons8-edit-24 (1).png")}
									alt="edit"
									className={
										disable
											? `w-[20px] h-[20px] inline ml-3 mb-1 cursor-pointer`
											: "hidden"
									}
									onClick={() => setDisable(!disable)}
								/>
								<img
									src={require("../images/icons8-save-30.png")}
									alt="edit"
									className={
										disable === false
											? `w-[20px] h-[20px] inline ml-3 mb-1 cursor-pointer`
											: "hidden"
									}
									onClick={handleChangeName}
								/>
							</div>
							<div
								className="my-2 cursor-pointer hover:underline"
								onClick={handleChangePassword}
							>
								Change password
							</div>
							<ToastContainer
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="light"
							/>
							<div className="font-semibold flex ">
								<span className="font-normal ">Your&nbsp;</span>
								<span className="tracking-[-1.25px]">IMDb</span>
								<span className=" text-[#5699ef] tracking-[-1.25px]">Pro</span>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserSettingsPage;
