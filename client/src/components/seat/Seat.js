import React, { useState } from "react";
import { useSelector } from "react-redux";

const Seat = ({ form, seat, status, seatSelect }) => {
	const [mouseOverState, setMouseOverState] = useState(false);
	const [onClickState, setOnClickState] = useState(false);
	const paymentState = useSelector((state) => state.payment);
	const handleOnClick = () => {
		setOnClickState(!onClickState);
		if (status === "selected") {
			return;
		}
		seatSelect(seat);
	};
	// ||
	// (form.movieName === paymentState.seatSelect.movieName &&
	// 	form.movieCinema === paymentState.seatSelect.movieCinema &&
	// 	form.movieTime === paymentState.seatSelect.movieTime &&
	// 	form.movieDay === paymentState.seatSelect.movieDay &&
	// 	paymentState?.seatSelect?.seat?.find((item) => item === seat) !==
	// 		undefined)
	return (
		<div
			className={`flex items-center justify-center flex-col relative ${
				status === "selected" ? "" : "cursor-pointer"
			} `}
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
