import React from "react";
import ShowingMovies from "../components/adminShowingMovie/ShowingMovies";
import SideBar from "../components/adminShowingMovie/SideBar";

const AdminShowPage = () => {
	return (
		<div className="w-full h-[100vh] bg-zinc-100 text-white flex">
			<SideBar />
			<ShowingMovies />
		</div>
	);
};

export default AdminShowPage;
