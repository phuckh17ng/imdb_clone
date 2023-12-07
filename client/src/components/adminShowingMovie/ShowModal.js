import React, { useState } from "react";

const ShowModal = ({ show, click, form }) => {
	console.log(form);
	return (
		show && (
			<div
				onClick={click}
				className="top-0 left-0 fixed w-[100vw] h-[100vh] bg-zinc-800/50 flex items-center justify-center"
			>
				<div className="relative w-[80%] h-[80%] bg-white rounded-3xl p-6 grid grid-cols-2 gap-2">
					<span className="absolute top-0 right-0 mt-3 mr-6 text-3xl">X</span>
					<span className="block font-semibold w-fit text-xl">
						Name: <div className="font-normal">{form.name}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Gerne: <div className="font-normal">{form.gerne}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Actor/Actress: <div className="font-normal">{form.actor}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Director: <div className="font-normal">{form.director}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Type: <div className="font-normal">{form.type}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Trailer: <div className="font-normal">{form.trailer}</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Banner: <div className="font-normal">form.banner</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Cinema:{" "}
						<div className="font-normal grid grid-cols-4 gap-2 max-h-[100px] overflow-auto">
							{form.cinema.map((cinema) => {
								return (
									<div className="border border-zinc-500 p-2 flex items-end justify-center">
										{cinema}
									</div>
								);
							})}
						</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Day show:
						<div className="font-normal grid grid-cols-4 gap-2 max-h-[100px] overflow-auto">
							{form.day.map((day) => {
								return (
									<div className="border border-zinc-500 p-2 flex items-end justify-center">
										{day}
									</div>
								);
							})}
						</div>
					</span>
					<span className="block font-semibold w-fit text-xl">
						Time:{" "}
						<div className="font-normal grid grid-cols-6 gap-2 max-h-[100px] overflow-auto">
							{form.time.map((time) => {
								return (
									<div className="border border-zinc-500 p-2 flex items-end justify-center">
										{time}
									</div>
								);
							})}
						</div>
					</span>
				</div>
			</div>
		)
	);
};

export default ShowModal;
