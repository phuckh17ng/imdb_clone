import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchlistMovie from "../components/watchlistMovie/WatchlistMovie";
import WatchlistUnSign from "../components/watchlistMovie/WatchlistUnSign";
import { auth } from "../firebase/firebaseConfig";

const WatchlistPage = () => {
	const [user, userLoading] = useAuthState(auth);
	const watchlistItems = useSelector((state) => state.watchlist);
	const { watchlist } = watchlistItems;

	const [watchlistSearchData, setWatchlistSearchData] = useState(watchlist);
	const handleSearchWatchlist = (e) => {
		setWatchlistSearchData(
			watchlist.filter((item) => {
				return (
					item.title.toLowerCase().includes(e.target.value) ||
					item.description.toLowerCase().includes(e.target.value) ||
					item.year.toLowerCase().includes(e.target.value)
				);
			})
		);
	};
	return (
		<div className="bg-black w-full h-full min-h-[100vh] py-6 flex px-3">
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
				<div className="h-full py-3 flex w-full justify-center">
					{!user && !userLoading ? (
						<WatchlistUnSign />
					) : (
						<div className="w-full flex justify-between">
							<div
								className={`w-[70%] max-[960px]:w-full ${
									!user ? "flex items-center justify-center" : ""
								}`}
							>
								<div className="mt-4">
									{watchlistSearchData?.map((item) => {
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
							</div>

							<div className="w-[26%] mt-4 mx-2 h-[400px] bg-zinc-800/50 rounded flex flex-col justify-between items-center py-6 max-[960px]:hidden">
								<input
									placeholder="Search your movies..."
									className="w-[90%] bg-zinc-800/50 h-10 rounded px-3 placeholder:text-white text-white hover:bg-zinc-700/50"
									onChange={handleSearchWatchlist}
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
