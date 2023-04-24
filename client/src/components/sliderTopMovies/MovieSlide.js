// import axios from "axios";
// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist, auth, db } from "../../firebaseConfig";
import { addToWatchlist } from "../../redux/actions/watchlistActions";
import * as styles from "../../styles/styles";
import WatchlistMovie from "../WatchlistMovie";
import "./MovieSlide.css";

const MovieSlide = ({
	id,
	image,
	title,
	fullTitle,
	year,
	imDbRating,
	imDbRatingCount,
	description,
}) => {
	const [user] = useAuthState(auth);
	const movie = {
		id: id,
		image: image,
		title: title,
		fullTitle: fullTitle,
		year: year,
		imDbRating: imDbRating,
		imDbRatingCount: imDbRatingCount,
		description: description,
	};

	const [data, getData] = useState();
	useEffect(() => {
		const fetchUserData = async () => {
			const q = query(collection(db, "watchlist"), where("movieId", "==", id));
			const docs = await getDocs(q);
			docs.forEach((doc) => {
				getData(doc.data());
			});
		};
		fetchUserData();
	}, []);

	useEffect(() => {
		if (data?.isAdded) {
		}
	}, [data]);
	return (
		<div className="text-white">
			<div className="relative h-[275px] w-[185px] cursor-pointer transition-all duration-500 hover:brightness-75 ">
				<Link to={`details/${id}`}>
					<img src={image} alt={title} className="z-0 h-[275px] w-[185px]" />
				</Link>

				<div
					style={styles.bookmarkStyle}
					className={
						data?.isAdded
							? `bg-[#f5c518] absolute top-0 left-0 w-[32px] h-[42px] flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:bg-yellow-600`
							: `bg-zinc-800/50 absolute top-0 left-0 w-[32px] h-[42px] flex items-center justify-center pb-3 z-10 drop-shadow-xl hover:bg-zinc-500/80`
					}
				>
					<img
						src={require("../../images/icons8-plus-20.png")}
						alt="bookmark"
						style={{ opacity: "1!important" }}
						className="z-10"
					/>
				</div>
			</div>
			<div className="bg-zinc-800/70 w-[185px]">
				<div className="m-auto w-[170px] pb-2">
					<div className="flex items-center pt-3">
						<div
							style={styles.starStyle}
							className="bg-[#f5c518] w-4 h-4 rounded-lg"
						></div>
						<span className="ml-2">{imDbRating}</span>
					</div>
					<div className="h-[50px] cursor-pointer hover:decoration-solid hover:underline ">
						{title}
					</div>
					<div
						className=" bg-zinc-700/50 rounded h-[36px] flex items-center justify-center mt-4 cursor-pointer hover:bg-blue-400/10"
						onClick={() => {
							// addMovieToWatchlist(user?.uid, movie);
							console.log(addMovieToWatchlist(user?.uid, movie));
						}}
					>
						<img
							src={require("../../images/icons8-plus-24.png")}
							alt="bookmark"
							className="w-[17px] h-[17px]"
						/>
						<div className="text-[#5699ef] font-semibold ml-2">Watchlist</div>
					</div>
					<div className=" text-center mt-2 hover:text-[#f5c518] h-[36px] hover:border-slate-400 border-solid rounded hover:bg-zinc-700/50 flex items-center justify-center w-[70px] m-auto cursor-pointer">
						Trailer
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieSlide;
