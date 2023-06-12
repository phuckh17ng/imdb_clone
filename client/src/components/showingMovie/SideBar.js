import React, { useState } from "react";
import "./Sidebar.css";

const SideBar = () => {
	const [current, setCurrent] = useState("add");
	const navLi = document.querySelectorAll(".sidebar li");
	if (navLi) {
		navLi.forEach((li) => {
			li.classList.remove("active");
			if (li.classList.contains(current)) {
				console.log(li.classList.contains(current));
				li.classList.add("active");
			}
		});
	}
	return (
		<div className="w-[260px] h-full bg-black py-9">
			<ul className="bg-zinc-900 sidebar">
				<li
					className="cursor-pointer w-full p-3 show relative"
					onClick={() => setCurrent("show")}
				>
					<div className="hidden w-4 h-4 absolute right-0 top-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-black rounded-br-full"></div>
					</div>
					Showing Movies
					<div className="hidden w-4 h-4 absolute right-0 bottom-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-zinc-900 rounded-tr-full"></div>
					</div>
				</li>
				<li
					className="cursor-pointer w-full p-3 border-y-2 border-black add relative active"
					onClick={() => setCurrent("add")}
				>
					<div className="hidden w-4 h-4 absolute right-0 top-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-zinc-900 rounded-br-full"></div>
					</div>
					Add Movie
					<div className="hidden w-4 h-4 absolute right-0 bottom-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-zinc-900 rounded-tr-full"></div>
					</div>
				</li>
				<li
					className="cursor-pointer w-full p-3 update relative"
					onClick={() => setCurrent("update")}
				>
					<div className="hidden w-4 h-4 absolute right-0 top-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-zinc-900 rounded-br-full"></div>
					</div>
					Update Movie
					<div className="hidden w-4 h-4 absolute right-0 bottom-[-16px] bg-zinc-100">
						<div className="w-full h-full bg-black rounded-tr-full"></div>
					</div>
				</li>
			</ul>
		</div>
	);
};
export default SideBar;
