import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/firebaseFunctions";
import { getUserData } from "../../redux/actions/userSettingActions";

const UserMenu = ({ uid, mouseLeave }) => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		logout();
		dispatch(getUserData(uid));
	};
	// useEffect(() => {
	// 	dispatch(getUserData(uid));
	// }, [dispatch, uid]);
	return (
		mouseLeave && (
			<div
				onMouseLeave={mouseLeave}
				className="font-normal w-[170px] bg-zinc-800 absolute top-10 right-0 z-50 flex flex-col justify-start items-start py-3 rounded"
			>
				<Link
					to={`/watchlist`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 sm:hidden"
				>
					Watchlist
				</Link>
				<Link
					to={`account/${uid}`}
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
				>
					Settings
				</Link>
				<Link
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2"
					onClick={handleLogout}
					to="/"
				>
					Logout
				</Link>
			</div>
		)
	);
};

export default UserMenu;
