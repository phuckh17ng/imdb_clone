import React, { useState } from "react";

const Seat = ({ name, number, status, ticket }) => {
	const [mouseOverState, setMouseOverState] = useState(false);
	const [onClickState, setOnClickState] = useState(false);
	const handleOnClick = () => {
		setOnClickState(!onClickState);
		ticket(name, number);
	};
	return (
		<div className="flex items-center justify-center flex-col">
			<div className="font-bold text-black/70">
				{name}
				{number}
			</div>
			<img
				id="seat-img"
				src={
					status === "booked"
						? require("../../images/icons8-armchair-60 (1).png")
						: mouseOverState
						? require("../../images/icons8-armchair-60 (2).png")
						: onClickState
						? require("../../images/icons8-armchair-60 (2).png")
						: require("../../images/icons8-armchair-60.png")
				}
				alt={number}
				onMouseOver={() => {
					setMouseOverState(true);
				}}
				onMouseLeave={() => {
					setMouseOverState(false);
				}}
				onClick={handleOnClick}
			/>
		</div>
	);
};

export default Seat;
