import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserName } from "../features/user/userService";
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordReset } from "../firebase/firebaseFunctions";
import "./UserSettingsPage.css";

import CropImage from "../components/CropImage";

const UserSettingsPage = () => {
	const [user] = useAuthState(auth);
	const uid = user?.uid;
	const userDataReq = useSelector((state) => state.user);
	const { userData } = userDataReq;
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const handleChangeName = (e) => {
		e.preventDefault();
		dispatch(setUserName({ uid, name }));
		setDisable(!disable);
		if (name !== "") {
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
		sendPasswordReset(userData?.data?.email).then(() => {
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
		});
	};

	const [src, setSrc] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const inputRef = useRef(null);
	const handleChangeUserImage = (e) => {
		setSrc(URL.createObjectURL(e.target.files[0]));
		setModalOpen(true);
		inputRef.current.click();
	};

	return (
		<div className="h-[100vh] bg-zinc-100 flex items-center">
			<div className="h-[400px] w-full text-black px-3 py-12 max-sm:h-full">
				<div className="w-2/3 h-full max-sm:pb-6 bg-white m-auto flex items-center justify-between rounded-xl max-lg:w-4/5 max-md:w-full">
					<div className="w-full h-full mx-auto flex items-center justify-start max-sm:flex-col">
						<div className="w-1/3 max-sm:h-fit max-sm:w-2/3 flex items-center justify-center border-r-[1px] max-sm:border-r-0 border-zinc-200 h-3/4 px-3 min-w-[120px] max-sm:border-b-[1px] py-3">
							<div className="user--img  max-h-[136px] border-zinc-800 border rounded-full h-fit bg-zinc-100/50 p-2 hover:brightness-[.85] relative flex justify-center items-center">
								<img
									src={userData?.userImageURL}
									alt="profile"
									className="w-[120px] h-[120px] rounded-full  bg-center max-md:min-w-0"
								/>

								<div
									className="edit w-full h-full absolute flex justify-center items-center"
									// onClick={handleInputClick}
								>
									<label
										htmlFor="files"
										className="btn edit--btn w-full h-full flex justify-center items-center rounded-full"
									>
										<img
											src={require("../images/icons8-edit-24 (1).png")}
											alt="edit"
											className="w-[20px] h-[20px] ml-2"
										/>
									</label>

									<input
										accept="image/*"
										ref={inputRef}
										id="files"
										style={{ visibility: "hidden" }}
										type="file"
										className="absolute"
										onChange={handleChangeUserImage}
									/>
								</div>
							</div>
						</div>
						<div className="w-3/5 mx-auto flex justify-around max-sm:w-full max-sm:mt-3">
							<div className="px-3 w-full max-sm:!px-6">
								<div className="my-2">
									<span className="text-lg text-zinc-900 mr-2 font-light">
										Email:
									</span>
									<span className="text-zinc-800/70 font-light inline-block">
										{userData?.data?.email}
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
										placeholder={userData?.data?.name}
										disabled={disable}
										onChange={(e) => setName(e.target.value)}
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

								<div className="font-semibold flex ">
									<span className="font-normal ">Your&nbsp;</span>
									<span className="tracking-[-1.25px]">IMDb</span>
									<span className=" text-[#5699ef] tracking-[-1.25px]">
										Pro
									</span>
								</div>
							</div>
							<div></div>
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
					</div>
				</div>
				<CropImage
					modalOpen={modalOpen}
					src={src}
					setModalOpen={setModalOpen}
					uid={uid}
				/>
			</div>
		</div>
	);
};

export default UserSettingsPage;
