import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useSelector } from "react-redux";
import WatchlistMovie from "../components/WatchlistMovie";
import { auth, db } from "../firebaseConfig";
const WatchlistPage = () => {
	const [user, loading] = useAuthState(auth);
	const [data, getData] = useState([]);
	console.log(data?.watchlist);
	useEffect(() => {
		const fetchUserData = async () => {
			if (loading) return;
			if (user !== null) {
				const q = query(
					collection(db, "watchlist"),
					where("uid", "==", user?.uid)
				);
				const docs = await getDocs(q);
				docs.forEach((doc) => {
					getData((data) => [...data, doc.data()]);
				});
			}
		};
		fetchUserData();
	}, [user?.uid, loading, user]);

	console.log(data);
	return (
		<div className="bg-black w-full h-full py-6 flex ">
			<div className="bg-zinc-800/50 w-full py-6 max-w-[1250px] mx-auto flex justify-between rounded-3xl flex-col px-9">
				<span className="text-white text-3xl border-l-[3.5px] border-[#f5c518] pl-3">
					My Watchlist
				</span>
				<div className="h-full py-3 flex w-full">
					<div className="w-full flex justify-between">
						<div className="w-[70%]">
							<div className="mt-4">
								{data.map((item) => {
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
										/>
									);
								})}
							</div>
						</div>

						<div className="w-[26%] mt-4 mx-2 h-[400px] bg-zinc-800/50 rounded flex flex-col justify-between items-center py-6">
							<input
								placeholder="Search your movies..."
								className="w-[90%] bg-zinc-800/50 h-10 rounded px-3 placeholder:text-white text-white hover:bg-zinc-700/50"
							/>

							<div className="text-white h-[330px] flex flex-col items-center justify-center bg-zinc-800/50 rounded w-[90%] mt-3 text-5xl font-thin hover:bg-zinc-700/50">
								<div>+</div>
								<div className="text-center text-2xl">Create new Watchlist</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WatchlistPage;
