import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getSearchData } from "../../features/search/searchService";
import { auth } from "../../firebase/firebaseConfig";
import { bookmarkStyle } from "../../styles/styles";
import SearchOptions from "./SearchOptions";
import UserMenu from "./UserMenu";

const Navbar = () => {
	const [user, userAuthLoading] = useAuthState(auth);
	const dispatch = useDispatch();
	const userDataReq = useSelector((state) => state.user);
	const { userData, isLoading } = userDataReq;
	const [userMenuState, setUserMenuState] = useState(false);
	const [searchOptionsState, setSearchOptionsState] = useState(false);

	const [searchOption, setSearchOption] = useState("All");
	const [searchValue, setSearchValue] = useState();

	const navigate = useNavigate();
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		navigate(`/search/${searchOption}/${searchValue}`);
		dispatch(getSearchData({ searchOption, searchValue }));
		setSearchValue("");
	};
	const location = useLocation();
	return (
		<div className="bg-black z-50">	
			{location.pathname === "/signin/imdb" ||
			location.pathname === "/signin/register" ||
			location.pathname === "/signin/imdb/resetpassword" ? null : (
				<div className=" bg-black h-14 text-white w-full max-w-[1280px] m-auto px-3 max-[1280px]:max-w-[1024px]">
					<div className="flex items-center h-full">
						<Link
							to="/"
							className="bg-zinc-800/70 mr-3 rounded flex items-center justify-center text-white font-black text-lg w-16 px-4 h-8 no-underline max-[960px]:mr-3"
						>
							IMDb
						</Link>

						<form
							className="flex items-center h-8 bg-white rounded pr-3 w-[70%] mr-3"
							onSubmit={handleSearchSubmit}
						>
							<div
								className="flex items-center border-r border-r-zinc-400 h-full px-2 justify-between relative"
								onClick={() => setSearchOptionsState(!searchOptionsState)}
							>
								<div className="cursor-pointer flex items-center">
									<div className="text-black font-semibold text-[13px] mr-1 cursor-pointer">
										{searchOption}
									</div>
									<img
										src={require("../../images/icons8-sort-down-30.png")}
										alt="down-arrow"
										className="w-[10px] h-[10px] mt-1 max-md:mr-1 cursor-pointer"
									/>
								</div>

								{searchOptionsState && (
									<SearchOptions
										mouseLeave={() => {
											setSearchOptionsState(false);
										}}
										click={(e) => {
											const value = e.target.title;
											setSearchOption(value);
										}}
									/>
								)}
							</div>

							<div className="flex w-full">
								<input
									placeholder="Search IMDb"
									className="text-black outline-none ml-2 w-full"
									value={searchValue}
									onChange={(e) => {
										setSearchValue(e.target.value);
									}}
								/>
								<img
									src={require("../../images/icons8-search-50.png")}
									alt="search-icon"
									className="w-5 h-5 cursor-pointer"
									onClick={handleSearchSubmit}
								/>
							</div>
						</form>

						<div className="flex items-center">
							<Link
								to="/nowshowing"
								className="cursor-pointer pr-3 font-semibold tracking-[-1.25px] w-28 h-9 flex items-center justify-center border-r-2 border-r-zinc-700 mr-2 max-[960px]:hidden"
							>
								Now &nbsp;<p className=" text-[#5699ef]"> Showing</p>
							</Link>
							<div className="flex items-center">
								<Link
									to="/watchlist"
									className="flex items-center min-[960px]:mx-2 max-sm:hidden max-[960px]:ml-3 max-[960px]:mr-2"
								>
									<div
										style={bookmarkStyle}
										className="flex justify-center mr-2 hover:!bg-[#f5c518] w-[14px] h-[18px] bg-white"
									>
										<img
											src={require("../../images/icons8-plus-math-15.png")}
											alt="bookmark"
											className="mt-[2px] w-[10px] h-[10px]"
										/>
									</div>
									<label className="font-semibold cursor-pointer">
										Watchlist
									</label>
								</Link>
								<div className="font-semibold w-full text-center text-white max-sm:text-end">
									{isLoading ? (
										<ClipLoader color="#f5c518" />
									) : !userAuthLoading && user && userData?.userImageURL ? (
										<div
											className="p-[1.5px] w-9 rounded-full relative bg-white flex items-center cursor-pointer justify-center max-sm:mx-0 max-sm:ml-3 max-sm:mr-0 sm:mx-auto"
											onClick={() => setUserMenuState(!userMenuState)}
										>
											<img
												src={userData?.userImageURL}
												alt="avatar"
												className="w-8 h-8 rounded-full object-scale-down hover:brightness-75"
											/>
											{userMenuState && (
												<UserMenu
													mouseLeave={() => setUserMenuState(false)}
													uid={user?.uid}
												/>
											)}
										</div>
									) : (
										<Link
											to="/signin"
											className="text-center pr-1 max-sm:pr-0 max-sm:!text-end w-16 inline-block"
										>
											Sign in
										</Link>
									)}
								</div>
								<div className="flex items-center justify-evenly ml-3 max-[960px]:hidden cursor-pointer">
									<label className="font-semibold mr-1">EN</label>
									<img
										src={require("../../images/icons8-sort-down-30 (1).png")}
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
