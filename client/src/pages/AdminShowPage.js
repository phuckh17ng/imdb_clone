import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddMovie from "../components/adminShowingMovie/AddMovie";
import SideBar from "../components/adminShowingMovie/SideBar";
import UpdateMovie from "../components/adminShowingMovie/UpdateMovie";
import AllMovie from "../components/adminShowingMovie/allMovie/AllMovie";
import { adminGetAllMovie } from "../features/admin/adminService";

const AdminShowPage = () => {
	const [sideBarActive, setSideBarActive] = useState("show");
	const getSideBarActive = (active) => {
		setSideBarActive(active);
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(adminGetAllMovie());
	}, []);
	return (
		<div className="w-full h-full bg-zinc-100 text-white flex">
			<SideBar click={getSideBarActive} />
			<AllMovie show={sideBarActive} />
			<AddMovie show={sideBarActive} />
			<UpdateMovie show={sideBarActive} />
			<ToastContainer />
		</div>
	);
};

export default AdminShowPage;
