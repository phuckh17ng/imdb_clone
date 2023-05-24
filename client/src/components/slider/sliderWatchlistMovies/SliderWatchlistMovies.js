import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { auth } from "../../../firebase/firebaseConfig";
import { getWatchlist } from "../../../redux/actions/watchlistActions";
import * as styles from "../../../styles/styles";
import MovieSlide from "../MovieSlide";
import PropagateLoading from "../PropagateLoading";
import { slickSliderSettings } from "../slickSliderSettings";

const SliderWatchlistMovies = () => {
	const [user, userLoading] = useAuthState(auth);

	const dispatch = useDispatch();
	const watchlistItems = useSelector((state) => state.getWatchlist);
	const { watchlistMovies, loading } = watchlistItems;
	useEffect(() => {
		dispatch(getWatchlist(user?.uid));
	}, [user?.uid, dispatch]);

	return (
		<div className="bg-black m-auto max-w-[1280px] px-3 pt-12">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					From your watchlist
				</label>
				<div
					style={styles.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			{/* <div className="text-zinc-400 pt-3 pb-4">
				This week's top TV and movies
			</div> */}
			{loading ? (
				<div className="w-full h-12 flex items-center justify-center">
					<PropagateLoading loading={loading} />
				</div>
			) : !user?.uid && !userLoading & !loading ? (
				<div className="text-white flex justify-center flex-col items-center">
					<div
						style={styles.bookmarkStyle}
						className=" w-[32px] h-[42px] bg-zinc-800/70 flex items-center justify-center pb-3 z-10 drop-shadow-xl"
					>
						<img
							src={require("../../../images/icons8-plus-20.png")}
							alt="bookmark"
							style={{ opacity: "1!important" }}
							className="z-10"
						/>
					</div>
					<div className="mt-4 font-semibold">
						Sign in to access your Watchlist
					</div>
					<div>
						Save shows and movies to keep track of what you want to watch.
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
				<Slider {...slickSliderSettings} className="mt-6">
					{watchlistMovies?.map((movie) => (
						<MovieSlide
							key={movie.movieId}
							id={movie?.movieId}
							title={movie.title}
							fullTitle={movie.fullTitle}
							imDbRating={movie.imDbRating}
							imDbRatingCount={movie.imDbRatingCount}
							image={movie.image}
							year={movie.year}
							description={movie.description}
						/>
					))}
				</Slider>
			)}
		</div>
	);
};

export default SliderWatchlistMovies;
