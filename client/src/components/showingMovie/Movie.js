import React from "react";
import { Link } from "react-router-dom";
const Movie = ({
	movieId,
	dayCreate,
	banner,
	actor,
	cinema,
	day,
	director,
	gerne,
	name,
	time,
	trailer,
	type,
}) => {
	console.log(movieId);
	return (
		<div className="py-3 px-3 h-full flex hover:-translate-x-[6px] hover:-translate-y-[6px] transition-all duration-300 linear shadow-xl">
			<img src={banner} alt={name} className="w-1/2" loading="lazy" />
			<div className="w-full ml-3 flex flex-col justify-between">
				<div className="text-zinc-800">
					<p className="block w-full text-3xl font-semibold text-zinc-800 border-b border-zinc-400 pb-3">
						{name}
					</p>
					<div className="mt-3">
						<div className="text-xl font-light">Director: {director}</div>
						{/* <div className="text-xl mt-2">Actor: {actor}</div> */}
						<div className="text-xl font-light mt-2">Gerne: {gerne}</div>
						<span className="mt-3 font-bold text-xl inline-block border-3 rounded border-zinc-800 p-2">
							{type}
						</span>
					</div>
				</div>

				<div className="flex justify-between bg-zinc-900/80 rounded-full">
					<Link
						to={trailer}
						className="font-bold text-white text-md flex items-center pl-3 pr-2"
					>
						<img
							src={require("../../images/icons8-youtube-50.png")}
							alt="youtube"
							className="w-[45px]"
						></img>
						<p>TRAILER</p>
					</Link>
					<Link
						to={`/nowshowing/${name}/${movieId}/ticket`}
						className="w-[55%] text-white font-bold text-md text-center bg-zinc-900 h-full rounded-full py-3 px-3"
					>
						BUY TICKET
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Movie;
