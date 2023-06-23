import React from "react";
import { useSelector } from "react-redux";
import {
	DeleteIcon,
	DotsIcon,
	FileEdit,
	FileEditIcon,
	FilterIcon,
	SearchIcon,
} from "../flowbiteIcon";
import "./AllMovie.css";
import MovieItem from "./MovieItem";
const AllMovie = ({ show }) => {
	const showState = useSelector((state) => state.show);
	const { showingMovie, isLoading } = showState;
	console.log(showingMovie);
	return (
		show === "show" && (
			<div className="text-zinc-700 min-h-screen w-full h-full flex items-center justify-center py-9">
				<div className="relative w-[90%] min-h-screen bg-white rounded-2xl p-6">
					<div className="flex items-center justify-between">
						<p className="text-3xl font-bold ml-2">Showing Movie</p>

						<div className="flex items-center">
							<div className="border-zinc-700 border-2 flex items-center bg-white rounded-full pl-6 pr-9">
								{SearchIcon}
								<input
									placeholder="Search movie"
									className=" placeholder:text-zinc-500 ml-3 focus:outline-none bg-white h-9"
									type="text"
								/>
							</div>

							<div className="flex">
								<div className="ml-6 hover:bg-zinc-100 rounded-full w-full h-full p-2">
									{FilterIcon}
								</div>
								<div className="ml-6 hover:bg-zinc-100 rounded-full w-full h-full p-2">
									{DotsIcon}
								</div>
							</div>
						</div>
					</div>

					<div className="w-full h-full bg-zinc-200 mt-3">
						<div className="content-table w-full items-center bg-zinc-200 py-1 px-2">
							<div>Movie ID</div>
							<div>Name</div>
							<div className="text-end">Date created</div>
							<div className="text-end">Last modified</div>
							<div className="text-end">Edit</div>
							<div className="text-end">Remove</div>
						</div>
					</div>
					<div className="w-full h-full bg-zinc-200">
						<div className="content-table w-full items-center bg-zinc-200 py-1 px-2">
							{showingMovie.map((item) => {
								<MovieItem key={item.movieId} name/>;
							})}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AllMovie;
