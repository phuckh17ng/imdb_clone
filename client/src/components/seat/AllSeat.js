import React from "react";
import { useSelector } from "react-redux";

const AllSeat = () => {
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	console.log(seat);
	return (
		<div className="z-10 relative mt-24">
			<div className="w-full py-2 bg-white flex items-center justify-center text-3xl font-bold rounded-t-3xl">
				Screen
			</div>
			<div className="grid grid-cols-10">
				{seat._A.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._B.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._C.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._D.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._E.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._F.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._G.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
			<div className="grid grid-cols-10">
				{seat._H.map((item) => {
					return (
						<div>
							<div>{item.seat}</div>{" "}
							<img
								src={require("../../images/icons8-armchair-60.png")}
								alt={item.seat}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllSeat;
