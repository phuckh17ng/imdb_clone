import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AllSeat.css";
import SeatRow from "./SeatRow";

const AllSeat = () => {
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	const [onSelect, setOnSelect] = useState([]);
	const [form, setForm] = useState({
		seat: onselect,
		name: "",
		email: "",
		phone: "",
	});
	console.log(form);
	const handleBuyTicket = (seatRow, seatNo) => {
		if (
			onSelect.some(
				(item) => item.seatRow === seatRow && item.seatNo === seatNo
			)
		) {
			setOnSelect(() =>
				onSelect.filter((item) => {
					return item.seatRow + item.seatNo !== seatRow + seatNo;
				})
			);
			return;
		}
		setOnSelect((item) => [...item, { seatRow: seatRow, seatNo: seatNo }]);
	};
	console.log(seat);
	console.log(onSelect);
	return (
		<div className="z-10 relative mt-24">
			<div className="w-full text-black/50 py-2 bg-white/90 flex items-center justify-center text-3xl font-bold rounded-t-3xl mb-6">
				Screen
			</div>
			<div className="pb-9">
				<SeatRow row={seat._A} name="A" ticket={handleBuyTicket} />
				<SeatRow row={seat._B} name="B" ticket={handleBuyTicket} />
				<SeatRow row={seat._C} name="C" ticket={handleBuyTicket} />
				<SeatRow row={seat._D} name="D" ticket={handleBuyTicket} />
				<SeatRow row={seat._E} name="E" ticket={handleBuyTicket} />
				<SeatRow row={seat._F} name="F" ticket={handleBuyTicket} />
				<SeatRow row={seat._G} name="G" ticket={handleBuyTicket} />
				<SeatRow row={seat._H} name="H" ticket={handleBuyTicket} />
			</div>

			<div className="flex items-center justify-between border-t-2 pt-9">
				<form className="flex w-[75%] justify-between">
					<div className="flex items-center border rounded-full h-14 pr-6">
						<img
							className="ml-3 w-10"
							src={require("../../images/icons8-user-50.png")}
							alt="user"
						/>
						<input
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
							className=" font-light text-lg ml-2 mr-6 h-full border-none focus:outline-none"
							type="text"
							name="phone"
							placeholder="Phone number (*)"
							onChange={(e) => {
								setForm({ ...form, phone: e.target.value });
							}}
						/>
					</div>
				</form>
				<div
					onClick={(e) => {
						setForm({ ...form, seat: onSelect });
					}}
					style={{
						background:
							"linear-gradient(to left, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
						opacity: "0.9",
					}}
					className="text-2xl font-light text-white w-[20%] rounded-full h-14 flex items-center justify-center"
				>
					Payment
				</div>
			</div>
		</div>
	);
};

export default AllSeat;
