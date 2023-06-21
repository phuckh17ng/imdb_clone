import React from "react";
import { ToastContainer } from "react-toastify";
import ShowingMovies from "../components/adminShowingMovie/ShowingMovies";
import SideBar from "../components/adminShowingMovie/SideBar";

const AdminShowPage = () => {
	return (
		<div className="w-full h-[100vh] bg-zinc-100 text-white flex">
			<SideBar />
			<ShowingMovies />
			<ToastContainer/>
		</div>
	);
};

export default AdminShowPage;
