import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seatPayment } from "../../features/payment/paymentService";
import "./AllSeat.css";
import Seat from "./Seat";

const AllSeat = () => {
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	const movieName = seat.name;
	const movieCinema = seat.cinema;
	const movieDay = seat.day;
	const movieTime = seat.time;
	const [form, setForm] = useState({
		seat: null,
		name: "",
		email: "",
		phoneNumber: "",
	});
	const [seatSelect, setSeatSelect] = useState([]);

	const handleBuyTicket = (seatSelected) => {
		console.log(seatSelected);
		if (seatSelect.some((item) => item === seatSelected)) {
			setSeatSelect(() => seatSelect.filter((item) => item !== seatSelected));
			return;
		}
		setSeatSelect((item) => [...item, seatSelected]);
	};
	console.log(seatSelect);
	useEffect(() => {
		setForm({ ...form, seat: seatSelect });
	}, [seatSelect]);
	const dispatch = useDispatch();
	const handlePayment = () => {
		console.log(form);
		console.log(movieName, movieCinema, movieDay, movieTime);
		dispatch(
			seatPayment({ form, movieName, movieCinema, movieDay, movieTime })
		);
	};

	return (
		<div className="z-10 relative mt-24">
			<div className="w-full text-black/50 py-2 bg-white/90 flex items-center justify-center text-3xl font-bold rounded-t-3xl mb-6">
				Screen
			</div>

			<div className="flex justify-between">
				<div className="grid grid-cols-10 gap-2 w-[100%]">
					{seat.allSeat.map((item) => {
						return (
							<Seat
								key={item.seat}
								seat={item.seat}
								ticket={handleBuyTicket}
								status={item.status}
							/>
						);
					})}
				</div>
			</div>

			<div className="flex justify-evenly text-zinc-700 pb-2">
				<div className="flex items-center">
					<img
						src={require("../../images/icons8-armchair-60 (3).png")}
						alt="Casual seat"
					/>
					<span className="pl-3 font-semibold">Casual seat</span>
				</div>
				<div className="flex items-center">
					<img
						src={require("../../images/icons8-armchair-60 (2).png")}
						alt="selecting seat"
					/>
					<span className="pl-3 font-semibold">Seat selecting</span>
				</div>
				<div className="flex items-center">
					<img
						src={require("../../images/icons8-armchair-60 (1).png")}
						alt="Casual seat"
					/>
					<span className="pl-3 font-semibold">Seat have been selected</span>
				</div>
			</div>
			<div className="flex items-center justify-between border-t-2 pt-9">
				<form className="flex w-[75%] justify-between" autoComplete="off">
					<div className="flex items-center border rounded-full h-14 pr-6">
						<img
							className="ml-3 w-10"
							src={require("../../images/icons8-user-50.png")}
							alt="user"
						/>
						<input
							autoComplete="false"
							className=" font-light text-lg ml-2 mr-4 h-full border-none focus:outline-none"
							type="text"
							name="name"
							placeholder="Enter your name (*)"
							onChange={(e) => {
								setForm({ ...form, name: e.target.value });
							}}
						/>
					</div>
					<div className="flex items-center border rounded-full h-14 pr-6 ">
						<img
							className="ml-3 w-9"
							src={require("../../images/icons8-email-50.png")}
							alt="email"
						/>
						<input
							autoComplete="false"
							className=" font-light text-lg ml-2 mr-4 h-full border-none focus:outline-none"
							type="text"
							name="email"
							placeholder="Your email (*)"
							onChange={(e) => {
								setForm({ ...form, email: e.target.value });
							}}
						/>
					</div>
					<div className="flex items-center border rounded-full h-14 pr-6">
						<img
							className="ml-3 w-8"
							src={require("../../images/icons8-phone-50.png")}
							alt="phone"
						/>
						<input
							autoComplete="false"
							className=" font-light text-lg ml-2 mr-6 h-full border-none focus:outline-none"
							type="text"
							name="phone"
							placeholder="Phone number (*)"
							onChange={(e) => {
								setForm({ ...form, phoneNumber: e.target.value });
							}}
						/>
					</div>
				</form>
				<div
					style={{
						background:
							"linear-gradient(to left, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
						opacity: "0.9",
					}}
					className="text-2xl font-light text-white w-[20%] rounded-full h-14 flex items-center justify-center"
					onClick={handlePayment}
				>
					Payment
				</div>
			</div>
		</div>
	);
};

export default AllSeat;
