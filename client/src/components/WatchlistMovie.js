// import {
// 	collection,
// 	doc,
// 	getDoc,
// 	getDocs,
// 	query,
// 	where,
// } from "firebase/firestore";
import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWatchlist } from "../firebaseConfig";
// import {
// 	getMovieDetails,
// 	getMovieTrailer,
// } from "../redux/actions/moviesActions";
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
	isAdded,
}) => {
	// const [user] = useAuthState(auth);
	// const [data, getData] = useState();

	const handleRemove = () => {
		// if (window.confirm("Are you sure you want to remove")) {
		removeFromWatchlist(watchlistId);
		// } else return false;
	};
	return !isAdded ? (
		""
	) : (
		<div className="mx-auto px-3 text-white h-36 my-2 rounded flex py-2 items-center justify-between  transition-all translate-y-0 hover:-translate-y-1  hover:shadow-lg hover:bg-zinc-700/30 hover:shadow-yellow-600 ">
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

			<div className="flex items-center mr-6 font-thin hover:bg-zinc-700/50 p-2 rounded cursor-pointer">
				<img
					src={require("../images/icons8-star-35.png")}
					alt="rating"
					className="w-6 h-6 mr-2"
				/>
				<span className="w-[40px] inline-block">Rate</span>
			</div>
			{/* <span>{id}</span> */}
			<div className="p-2 hover:bg-zinc-700/50 rounded-full">
				<img
					src={require("../images/icons8-trash-32.png")}
					alt="delete"
					className="w-7 h-7 cursor-pointer"
					onClick={handleRemove}
				/>
			</div>
		</div>
	);
};

export default WatchlistMovie;
