import React, { useState } from "react";

const Seat = ({ seat, status, ticket }) => {
	const [mouseOverState, setMouseOverState] = useState(false);
	const [onClickState, setOnClickState] = useState(false);
	const handleOnClick = () => {
		setOnClickState(!onClickState);
		ticket(seat);
	};
	return (
		<div
			className="flex items-center justify-center flex-col relative cursor-pointer"
			onMouseOver={() => {
				setMouseOverState(true);
			}}
			onMouseLeave={() => {
				setMouseOverState(false);
			}}
			onClick={handleOnClick}
		>
			<div className="font-bold text-white/90 absolute top-[6px]">{seat}</div>
			<img
				id="seat-img"
				src={
					status === "selected"
						? require("../../images/icons8-armchair-60 (1).png")
						: mouseOverState
						? require("../../images/icons8-armchair-60 (2).png")
						: onClickState
						? require("../../images/icons8-armchair-60 (2).png")
						: require("../../images/icons8-armchair-60 (3).png")
				}
				alt={seat}
			/>
		</div>
	);
};

export default Seat;
