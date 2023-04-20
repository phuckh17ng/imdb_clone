import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { auth, db, logout } from "../firebaseConfig";
import { bookmarkStyle } from "../styles/styles";

const Navbar = () => {
	// const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const fetchUserData = async () => {
			if (loading) return;
			if (user !== null) {
				const q = query(collection(db, "users"), where("uid", "==", user?.uid));
				const docs = await getDocs(q);
				docs.forEach((doc) => {
					setUserData(doc.data());
				});
			}
		};
		fetchUserData();
	}, [user?.uid, loading, user]);
	// useEffect(() => {
	// 	logout();
	// 	if (loading) return;
	// 	if (user === null) {
	// 		navigate("/");
	// 	}
	// }, [loading, user, navigate]);

	const [userMenuState, setUserMenuState] = useState(false);
	// console.log(user);
	const location = useLocation();

	const userMenu = (
		<div
			onMouseLeave={() => setUserMenuState(false)}
			className="font-normal w-[170px] bg-zinc-800 absolute top-10 right-0 z-50 flex flex-col justify-start items-start py-3 rounded"
		>
			<Link
				to={`account/${userData?.uid}/${userData?.name}`}
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
			>
				Settings
			</Link>
			<Link
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={logout}
				to="/"
			>
				Logout
			</Link>
		</div>
	);

	return (
		<div className="bg-black z-50">
			{location.pathname === "/signin/imdb" ||
			location.pathname === "/signin/register" ? null : (
				<div className=" bg-black h-14 text-white w-full max-w-[1280px] m-auto px-3">
					<div className="flex items-center h-full">
						<Link
							to="/"
							className="bg-[#f5c518] rounded flex items-center justify-center text-black font-black text-lg w-16 px-4 h-8 no-underline"
						>
							IMDb
						</Link>
						<div className="flex items-center mx-5">
							<div className="h-[13px] flex flex-col justify-between mr-2">
								<div className="w-4 h-[1.5px] bg-white"></div>
								<div className="w-4 h-[1.5px] bg-white"></div>
								<div className="w-4 h-[1.5px] bg-white"></div>
							</div>
							<label className="font-semibold">Menu</label>
						</div>

						<form className="flex items-center h-8 bg-white rounded pr-3 w-full">
							<div className="flex items-center border-r border-r-zinc-400 h-full w-12 justify-evenly">
								<div className="text-black font-semibold text-[13px]">All</div>
								<img
									src={require("../images/icons8-sort-down-30.png")}
									alt="down-arrow"
									className="w-[10px] h-[10px] mt-1"
								/>
							</div>
							<div className="flex w-full">
								<input
									placeholder="Search IMDb"
									className="text-black outline-none ml-2 w-full"
								/>
								<img
									src={require("../images/icons8-search-50.png")}
									alt="search-icon"
									className="w-5 h-5"
								/>
							</div>
						</form>

						<div className="flex items-center">
							<div className="font-semibold tracking-[-1.25px] w-24 h-9 flex items-center justify-center border-r-2 border-r-zinc-700 mr-2">
								IMDb<span className=" text-[#5699ef]">Pro</span>
							</div>
							<div className="flex items-center">
								<Link to="/watchlist" className="flex items-center mx-3">
									<div
										style={bookmarkStyle}
										className="flex justify-center mr-2 hover:!bg-[#f5c518] w-[14px] h-[18px] bg-white"
									>
										<img
											src={require("../images/icons8-plus-math-15.png")}
											alt="bookmark"
											className="mt-[2px] w-[10px] h-[10px]"
										/>
									</div>
									<label className="font-semibold">Watchlist</label>
								</Link>
								<div className="font-semibold w-16 text-center text-white">
									{user ? (
										user.photoURL ? (
											<div
												className="p-[1.5px] w-fit h-fit rounded-full relative bg-[#5699ef] flex items-center justify-center mx-auto"
												onClick={() => setUserMenuState(!userMenuState)}
											>
												<img
													src={user.photoURL}
													alt="avatar"
													className="w-8 h-8 rounded-full hover:brightness-75"
												/>
												{userMenuState ? userMenu : ""}
											</div>
										) : (
											<div
												className="rounded-full w-8 h-8 bg-zinc-700/50 relative flex items-center justify-center mx-auto "
												onClick={() => setUserMenuState(!userMenuState)}
											>
												<img
													src={require("../images/icons8-customer-40.png")}
													alt="blank-avatar"
													className="w-6 h-6 hover:brightness-75"
												/>
												{userMenuState ? userMenu : ""}
											</div>
										)
									) : (
										<Link to="/signin" className="text-center pr-1">
											Sign in
										</Link>
									)}
								</div>
								<div className="flex items-center justify-evenly ml-3">
									<label className="font-semibold mr-1">EN</label>
									<img
										src={require("../images/icons8-sort-down-30 (1).png")}
										className="w-[10px] h-[10px] mt-1"
										alt="down-arrow"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
