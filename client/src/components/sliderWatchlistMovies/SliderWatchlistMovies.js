import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { auth, db } from "../../firebaseConfig";
import * as style from "../../styles/styles";
import * as styles from "../../styles/styles";
import MovieSlide from "./MovieSlide";

const SliderWatchlistMovies = () => {
	const [user, loading] = useAuthState(auth);
	const [data, getData] = useState([]);

	useEffect(() => {
		const fetchUserData = async () => {
			if (loading) return;
			if (user !== null) {
				const q = query(
					collection(db, "watchlist"),
					where("uid", "==", user?.uid),
					where("isAdded", "==", true)
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
	function SampleNextArrow(props) {
		const { className, onClick } = props;
		return <div className={`${className} mr-4`} onClick={onClick}></div>;
	}

	function SamplePrevArrow(props) {
		const { className, onClick } = props;
		return <div className={`${className} ml-5 z-50`} onClick={onClick} />;
	}
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 5,
		lazyLoad: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	};
	return (
		<div className="bg-black m-auto max-w-[1280px] px-3 pt-12">
			<div className="flex items-center">
				<div className="w-[3px] h-[29px] bg-[#f5c518] rounded mr-2"></div>
				<label className="text-[24px] text-white font-semibold">
					From your watchlist
				</label>
				<div
					style={style.forwardStyle}
					className="hover:!bg-[#f5c518] transition-all duration-300"
				></div>
			</div>
			{/* <div className="text-zinc-400 pt-3 pb-4">
				This week's top TV and movies
			</div> */}
			{!user?.uid ? (
				<div className="text-white flex justify-center flex-col items-center">
					<div
						style={styles.bookmarkStyle}
						className=" w-[32px] h-[42px] bg-zinc-800/70 flex items-center justify-center pb-3 z-10 drop-shadow-xl"
					>
						<img
							src={require("../../images/icons8-plus-20.png")}
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
				<Slider {...settings} className="mt-6">
					{data.map((movie) => (
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
