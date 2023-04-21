import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, db, removeFromWatchlist } from "../firebaseConfig";
import {
	getMovieDetails,
	getMovieTrailer,
} from "../redux/actions/moviesActions";
import { starStyle } from "../styles/styles";

const WatchlistMovie = ({
	movieId,
	image,
	title,
	watchlistId,
	year,
	description,
	imDbRating,
	imDbRatingCount,
}) => {
	const [user] = useAuthState(auth);
	const [data, getData] = useState();

	return (
		<div className="mx-auto px-3 text-white bg-zinc-800/50 h-36 my-2 rounded flex py-2 items-center justify-between">
			<Link
				to={`/details/${movieId}`}
				className="flex items-center justify-center h-full"
			>
				<img src={image} alt={title} className="h-full mt-auto" />
			</Link>
			<div className="w-2/5 flex flex-col justify-start items-start pt-2 h-full ml-3">
				<Link
					to={`/details/${movieId}`}
					className="text-blue-500 cursor-pointer"
				>
					{title}
				</Link>
				<div className="text-sm mb-3 font-thin">
					{year} <span>| Movie</span>
				</div>
				<div className="text-sm font-thin">{description}</div>
			</div>

			<div className="flex items-center mx-3">
				<span
					style={starStyle}
					className="w-5 h-5 bg-[#f5c518] inline-block mx-2"
				></span>
				<span className="font-thin">
					{imDbRating}{" "}
					<span className="text-zinc-200/50">({imDbRatingCount})</span>
				</span>
			</div>

			<div className="flex items-center mr-6 font-thin hover:bg-zinc-700/50 p-2 rounded hover:text-[#f5c518] ">
				<span
					style={starStyle}
					className="w-5 h-5 bg-sky-500/20 inline-block mr-2 "
				></span>
				<span>Rate</span>
			</div>
			{/* <span>{id}</span> */}
			<div className="px-4">
				<img
					src={require("../images/icons8-trash-32.png")}
					alt="delete"
					className="w-7 h-7 cursor-pointer"
					onClick={() => {
						removeFromWatchlist(watchlistId);
					}}
				/>
			</div>
		</div>
	);
};

export default WatchlistMovie;
