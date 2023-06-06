import React from "react";

const SearchOptions = ({ mouseLeave, click }) => {
	return (
		mouseLeave && (
			<div
				onMouseLeave={mouseLeave}
				className="font-normal w-[170px] bg-zinc-800 absolute top-10 left-0 z-50 flex flex-col justify-start items-start py-3 rounded"
			>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					title="All"
					onClick={click}
				>
					All
				</div>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					onClick={click}
					title="Title"
				>
					Title
				</div>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					onClick={click}
					title="Movie"
				>
					Movie
				</div>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					onClick={click}
					title="Series"
				>
					Series
				</div>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					onClick={click}
					title="Name"
				>
					Name
				</div>
				<div
					className=" hover:bg-zinc-500/50 w-full px-8 text-left py-2 cursor-pointer"
					onClick={click}
					title="Episode"
				>
					Episode
				</div>
			</div>
		)
	);
};

export default SearchOptions;
