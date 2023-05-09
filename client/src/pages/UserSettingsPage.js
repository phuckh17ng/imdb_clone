import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { doc } from "firebase/firestore";
// import { useSelector } from "react-redux";
import { auth, db, updateUserName } from "../firebaseConfig";

const UserSettingsPage = () => {
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState();
	const [disable, setDisable] = useState(true);
	const [name, setName] = useState();
	const handleChangeName = (e) => {
		e.preventDefault();
		updateUserName(user?.uid, name);
		setDisable(!disable);
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

	// useEffect(() => {
	// 	const docRef = doc(db, "users", "pYgZLSKSXXbxFxDdRGQC");
	// 	getDoc(docRef).then((doc) => {
	// 		console.log(doc.data());
	// 		getData(() => doc.data());
	// 	});
	// }, []);

	console.log(userData);
	console.log(user);
	return (
		<div className="h-[400px] bg-zinc-100 text-black px-3 py-12">
			<div className="w-2/3 h-full bg-white m-auto flex items-center justify-between rounded-xl max-lg:w-4/5 max-md:w-full">
				<div className="w-full mx-auto flex items-center justify-start h-full">
					<div className="w-1/3 flex items-center justify-center border-r-[1px] border-zinc-200 h-3/4 px-3 min-w-[120px]">
						<div className="border-zinc-800 border rounded-full h-fit bg-zinc-100/50 p-3">
							<img
								src={userData?.profileImage}
								alt="profile"
								className="rounded-full"
							/>
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
								</span>{" "}
								{/* <img
									src={require("../images/icons8-edit-24 (1).png")}
									alt="edit"
									className="w-[20px] h-[20px] inline ml-3 mb-1"
								/> */}
							</div>
							<div className="my-2">
								<span className="text-lg text-zinc-900 mr-2 font-light">
									User name:
								</span>
								<input
									className={
										disable
											? ` bg-white font-light disabled:text-zinc-800/70`
											: "text-black font-normal bg-white focus:border-black focus:border placeholder:text-black "
									}
									placeholder={userData?.name}
									disabled={disable}
									onChange={(e) => setName(e.target.value)}
								/>
								<img
									src={require("../images/icons8-edit-24 (1).png")}
									alt="edit"
									className={
										disable ? `w-[20px] h-[20px] inline ml-3 mb-1` : "hidden"
									}
									onClick={() => setDisable(!disable)}
								/>
								<img
									src={require("../images/icons8-save-30.png")}
									alt="edit"
									className={
										disable === false
											? `w-[20px] h-[20px] inline ml-3 mb-1`
											: "hidden"
									}
									onClick={handleChangeName}
								/>
							</div>
							<div className="my-2">Change password</div>
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
