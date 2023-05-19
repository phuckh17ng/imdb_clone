import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchlistMovie from "../components/WatchlistMovie";
import { auth, db } from "../firebaseConfig";
import { getWatchlist } from "../redux/actions/watchlistActions";
import * as styles from "../styles/styles";

const WatchlistPage = () => {
	const [user, userLoading] = useAuthState(auth);
	console.log(userLoading);
	const [data, getData] = useState([]);
	console.log(data?.watchlist);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!userLoading) {
			dispatch(getWatchlist(user?.uid));
		}

		// const fetchUserData = async () => {
		// 	if (loading) return;
		// 	if (user !== null) {
		// 		const q = query(
		// 			collection(db, "watchlist"),
		// 			where("uid", "==", user?.uid)
		// 		);
		// 		const docs = await getDocs(q);
		// 		docs.forEach((doc) => {
		// 			getData((data) => [...data, doc.data()]);
		// 		});
		// 	}
		// };
		// fetchUserData();
	}, [user?.uid, dispatch]);

	const watchlistItems = useSelector((state) => state.getWatchlist);
	const { watchlistMovies, loading } = watchlistItems;
	console.log(watchlistMovies);

	console.log(data);
	return (
		<div className="bg-black w-full h-full py-6 flex px-3">
			<div className="bg-zinc-800/50 w-full py-6 max-w-[1250px] mx-auto flex justify-between rounded-3xl flex-col px-9 max-md:px-3">
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
					theme="dark"
				/>
				<span className="text-white text-3xl border-l-[3.5px] border-[#f5c518] pl-3 max-md:ml-3">
					My Watchlist
				</span>
				<div className="h-full py-3 flex w-full">
					{loading ? (
						<div className="w-full h-12 flex items-center justify-center">
							<PropagateLoader
								loading={loading}
								// cssOverride={override}
								aria-label="Loading Spinner"
								data-testid="loader"
								size="15"
								color="#f5c518"
								className="m-auto"
							/>
						</div>
					) : (
						<div className="w-full flex justify-between">
							<div
								className={`w-[70%] max-[960px]:w-full ${
									!user ? "flex items-center justify-center" : ""
								}`}
							>
								{!user && !loading && !userLoading ? (
									<div className="text-white flex justify-center flex-col items-center">
										<div
											style={styles.bookmarkStyle}
											className=" w-[32px] h-[42px] bg-zinc-800/70 flex items-center justify-center pb-3 z-10 drop-shadow-xl"
										>
											<img
												src={require("../images/icons8-plus-20.png")}
												alt="bookmark"
												style={{ opacity: "1!important" }}
												className="z-10"
											/>
										</div>
										<div className="mt-4 font-semibold">
											Sign in to access your Watchlist
										</div>
										<div>
											Save shows and movies to keep track of what you want to
											watch.
										</div>
										<Link
											to="/signin"
											className=" bg-zinc-700/50 rounded h-[36px] flex items-center justify-center mt-4 w-[160px]"
										>
											<div className="text-[#5699ef] font-semibold ml-2 text-sm">
												Sign in to IMDb
											</div>
										</Link>
									</div>
								) : (
									<div className="mt-4">
										{watchlistMovies?.map((item) => {
											return (
												<WatchlistMovie
													key={item.watchlistId}
													movieId={item.movieId}
													description={item.description}
													fullTitle={item.fullTitle}
													imDbRating={item.imDbRating}
													imDbRatingCount={item.imDbRatingCount}
													image={item.image}
													title={item.title}
													year={item.year}
													watchlistId={item.watchlistId}
													isAdded={item.isAdded}
												/>
											);
										})}
									</div>
								)}
							</div>
							<div className="w-[26%] mt-4 mx-2 h-[400px] bg-zinc-800/50 rounded flex flex-col justify-between items-center py-6 max-[960px]:hidden">
								<input
									placeholder="Search your movies..."
									className="w-[90%] bg-zinc-800/50 h-10 rounded px-3 placeholder:text-white text-white hover:bg-zinc-700/50"
								/>

								<div className="text-white h-[330px] flex flex-col items-center justify-center bg-zinc-800/50 rounded w-[90%] mt-3 text-5xl font-thin hover:bg-zinc-700/50">
									<div>+</div>
									<div className="text-center text-2xl">
										Create new Watchlist
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WatchlistPage;
