import React from "react";
import ShowingMovies from "../components/showingMovie/ShowingMovies";
import SideBar from "../components/showingMovie/SideBar";
import { data } from "../redux/data";

const NowShowingPage = () => {
	return (
		<div className="w-full h-[100vh] bg-zinc-100 text-white flex">
			<SideBar />
			<ShowingMovies />
		</div>
	);
};

export default NowShowingPage;
