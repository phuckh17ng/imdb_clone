import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebaseConfig";
import { getSearchMovies } from "../redux/actions/searchActions";
import { bookmarkStyle } from "../styles/styles";

const Navbar = () => {
	const navigate = useNavigate();
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

	const [userMenuState, setUserMenuState] = useState(false);
	const [searchOptionsState, setSearchOptionsState] = useState(false);
	const options = {
		all: "All",
		title: "Title",
		movie: "Movie",
		series: "Series",
		name: "Name",
		episode: "Episode",
	};
	const [searchOption, setSearchOption] = useState("All");
	const [searchValue, setSearchValue] = useState();

	const location = useLocation();
	console.log(searchOption);

	const dispatch = useDispatch();
	// const getMoviesSearch = useSelector((state) => state.moviesSearch);
	// const { moviesSearch } = getMoviesSearch;
	// const { searchValue } = useParams();

	// console.log(searchOption);
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		navigate(`/search/${searchOption}/${searchValue}`);
		dispatch(getSearchMovies(searchOption, searchValue));
		setSearchValue("");
	};

	const [userImageURL, setUserImageURL] = useState(null);
	useEffect(() => {
		const storage = getStorage();
		const storageRef = ref(storage, `userImages/${userData?.uid}`);

		getDownloadURL(storageRef)
			.then((url) => {
				// const xhr = new XMLHttpRequest();
				// xhr.responseType = "blob";
				// xhr.onload = (event) => {
				// 	const blob = xhr.response;
				// };
				// xhr.open("GET", url);
				// xhr.send();
				setUserImageURL(url);
				// Or inserted into an <img> element
				// const img = document.getElementById("myimg");
				// img.setAttribute("src", url);
			})
			.catch((error) => {
				// Handle any errors
			});
	}, [userData?.uid]);

	// console.log(getMoviesSearch);
	// console.log(userImageURL);
	// console.log(moviesSearch?.results);
	const userMenu = (
		<div
			onMouseLeave={() => setUserMenuState(false)}
			className="font-normal w-[170px] bg-zinc-800 absolute top-10 right-0 z-50 flex flex-col justify-start items-start py-3 rounded"
		>
			<Link
				to={`/watchlist`}
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 sm:hidden"
			>
				Watchlist
			</Link>
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
	const searchOptions = (
		<div
			onMouseLeave={() => setSearchOptionsState(false)}
			className="font-normal w-[170px] bg-zinc-800 absolute top-10 left-0 z-50 flex flex-col justify-start items-start py-3 rounded"
		>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.all)}
			>
				All
			</div>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.title)}
			>
				Title
			</div>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.movie)}
			>
				Movie
			</div>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.series)}
			>
				Series
			</div>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.name)}
			>
				Name
			</div>
			<div
				className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				onClick={() => setSearchOption(options.episode)}
			>
				Episode
			</div>
		</div>
	);

	return (
		<div className="bg-black z-50">
			{location.pathname === "/signin/imdb" ||
			location.pathname === "/signin/register" ||
			location.pathname === "/signin/imdb/resetpassword" ? null : (
				<div className=" bg-black h-14 text-white w-full max-w-[1280px] m-auto px-3 max-[1280px]:max-w-[1024px]">
					<div className="flex items-center h-full">
						<Link
							to="/"
							className="bg-[#f5c518] rounded flex items-center justify-center text-black font-black text-lg w-16 px-4 h-8 no-underline max-[960px]:mr-3"
						>
							IMDb
						</Link>
						<div className="flex items-center mx-4 max-[960px]:hidden">
							<div className="h-[13px] flex flex-col justify-between mr-2">
								<div className="w-4 h-[1.5px] bg-white"></div>
								<div className="w-4 h-[1.5px] bg-white"></div>
								<div className="w-4 h-[1.5px] bg-white"></div>
							</div>
							<label className="font-semibold">Menu</label>
						</div>

						<form
							className="flex items-center h-8 bg-white rounded pr-3 w-full"
							onSubmit={handleSearchSubmit}
						>
							<div
								className="flex items-center border-r border-r-zinc-400 h-full px-2 justify-between relative"
								onClick={() => setSearchOptionsState(!searchOptionsState)}
							>
								<div className="text-black font-semibold text-[13px] mr-1">
									{searchOption}
								</div>
								<img
									src={require("../images/icons8-sort-down-30.png")}
									alt="down-arrow"
									className="w-[10px] h-[10px] mt-1 max-md:mr-1"
								/>
								{searchOptionsState ? searchOptions : ""}
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
									src={require("../images/icons8-search-50.png")}
									alt="search-icon"
									className="w-5 h-5 cursor-pointer"
									onClick={handleSearchSubmit}
								/>
							</div>
						</form>

						<div className="flex items-center">
							<div className="font-semibold tracking-[-1.25px] w-24 h-9 flex items-center justify-center border-r-2 border-r-zinc-700 mr-2 max-[960px]:hidden">
								IMDb<span className=" text-[#5699ef]">Pro</span>
							</div>
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
											src={require("../images/icons8-plus-math-15.png")}
											alt="bookmark"
											className="mt-[2px] w-[10px] h-[10px]"
										/>
									</div>
									<label className="font-semibold">Watchlist</label>
								</Link>
								<div className="font-semibold w-full text-center text-white max-sm:text-end">
									{user ? (
										user.photoURL || userImageURL ? (
											<div
												className="p-[1.5px] w-9 rounded-full relative bg-[#5699ef] flex items-center justify-center max-sm:mx-0 max-sm:ml-3 max-sm:mr-0 sm:mx-auto"
												onClick={() => setUserMenuState(!userMenuState)}
											>
												<img
													src={
														userImageURL !== null ? userImageURL : user.photoURL
													}
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
										<Link
											to="/signin"
											className="text-center pr-1 max-sm:pr-0 max-sm:!text-end w-16 inline-block"
										>
											Sign in
										</Link>
									)}
								</div>
								<div className="flex items-center justify-evenly ml-3 max-[960px]:hidden">
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
