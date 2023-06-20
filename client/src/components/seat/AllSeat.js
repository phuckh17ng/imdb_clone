import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { seatPayment } from "../../features/payment/paymentService";
import PaymentModal from "../payment/PaymentModal";
import "./AllSeat.css";
import Seat from "./Seat";

const AllSeat = () => {
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	const allSeat = Object.values(seat.allSeat);
	const [form, setForm] = useState({
		seat: null,
		name: undefined,
		email: undefined,
		phoneNumber: undefined,
		movieName: seat.name,
		movieCinema: seat.cinema,
		movieDay: seat.day,
		movieTime: seat.time,
	});
	const [seatSelect, setSeatSelect] = useState([]);
	const [seatValidation, setSeatValidation] = useState(false);
	const [nameValidation, setNameValidation] = useState(true);
	const [emailValidation, setEmailValidation] = useState(true);
	const [phoneNumberValidation, setPhoneNumberValidation] = useState(true);
	const handleSeatSelect = (seatSelected) => {
		if (seatSelect.some((item) => item === seatSelected)) {
			setSeatSelect(() => seatSelect.filter((item) => item !== seatSelected));
			return;
		}
		setSeatSelect((item) => [...item, seatSelected]);
	};

	const handleInputNameChange = (e) => {
		setForm({ ...form, name: e.target.value });
		setNameValidation(true);
		if (e.target.value === "" || e.target.value === undefined) {
			setNameValidation(false);
		}
	};
	const handleInputEmailChange = (e) => {
		setForm({ ...form, email: e.target.value });
		setEmailValidation(true);
		if (e.target.value === "" || e.target.value === undefined) {
			setEmailValidation(false);
		}
	};
	const handleInputPhoneNumberChange = (e) => {
		setForm({ ...form, phoneNumber: e.target.value });
		setPhoneNumberValidation(true);
		if (
			e.target.value === "" ||
			e.target.value === undefined ||
			isNaN(e.target.value)
		) {
			setPhoneNumberValidation(false);
		}
	};
	const [paymentState, setPaymentState] = useState(false);
	useEffect(() => {
		console.log(seatValidation);
		if (seatSelect.length === 0) {
			setSeatValidation(false);
		} else {
			setSeatValidation(true);
		}
		setForm({ ...form, seat: seatSelect });
		if (
			form.name !== undefined &&
			form.name !== "" &&
			form.email !== undefined &&
			form.email !== "" &&
			form.phoneNumber !== undefined &&
			form.phoneNumber !== "" &&
			seatValidation
		) {
			setPaymentState(true);
		} else {
			setPaymentState(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.name, form.email, form.phoneNumber, seatSelect, seatValidation]);
	const dispatch = useDispatch();
	const handlePayment = () => {
		if (form.name === undefined || !nameValidation) {
			setNameValidation(false);
			toast.warn("Please enter your name!");
			return;
		}
		if (form.email === undefined || !emailValidation) {
			setEmailValidation(false);
			toast.warn("Please enter your email!");
			return;
		}
		if (form.phoneNumber === undefined || !phoneNumberValidation) {
			setPhoneNumberValidation(false);
			toast.warn("Please enter your phone number!");
			return;
		}
		if (!seatValidation) {
			toast.warn("Please select your seat!");
			return;
		}
		setPaymentModalState(true);
	};

	const [paymentModalState, setPaymentModalState] = useState(false);
	const root = document.getElementById("root");
	if (!paymentModalState) {
		root.style.overflow = "auto";
	}

	const setInitialForm = () => {
		setForm({
			seat: null,
			name: undefined,
			email: undefined,
			phoneNumber: undefined,
			movieName: seat.name,
			movieCinema: seat.cinema,
			movieDay: seat.day,
			movieTime: seat.time,
		});
	};
	console.log(paymentModalState);
	return (
		<div className="z-10 relative mt-24">
			<div className="w-full text-black/50 py-2 bg-white/90 flex items-center justify-center text-3xl font-bold rounded-t-3xl mb-6">
				Screen
			</div>

			<div className="flex justify-between">
				<div className="grid grid-cols-10 gap-2 w-[100%]">
					{allSeat
						.sort((a, b) => a.seat.localeCompare(b.seat))
						.map((item) => {
							return (
								<Seat
									key={item.seat}
									seat={item.seat}
									seatSelect={handleSeatSelect}
									status={item.status}
								/>
							);
						})}
				</div>
			</div>

			<div className="flex justify-evenly text-zinc-700 pb-2 mt-12">
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
					<div
						className={`flex items-center border rounded-full h-14 pr-6 ${
							nameValidation ? "" : "!border-red-500"
						}`}
					>
						<img
							className="ml-3 w-10"
							src={require("../../images/icons8-user-50.png")}
							alt="user"
						/>
						<input
							inputMode="text"
							autoComplete="off"
							className="font-light text-lg ml-2 mr-4 h-full border-none focus:outline-none"
							type="text"
							name="name"
							placeholder="Enter your name (*)"
							onChange={handleInputNameChange}
						/>
					</div>
					<div
						className={`flex items-center border rounded-full h-14 pr-6 ${
							emailValidation ? "" : "!border-red-500"
						}`}
					>
						<img
							className="ml-3 w-9"
							src={require("../../images/icons8-email-50.png")}
							alt="email"
						/>
						<input
							inputMode="email"
							className=" font-light text-lg ml-2 mr-4 h-full border-none focus:outline-none"
							type="email"
							name="email"
							placeholder="Your email (*)"
							onChange={handleInputEmailChange}
						/>
					</div>
					<div
						className={`flex items-center border rounded-full h-14 pr-6 ${
							phoneNumberValidation ? "" : "!border-red-500"
						}`}
					>
						<img
							className="ml-3 w-8"
							src={require("../../images/icons8-phone-50.png")}
							alt="phone"
						/>
						<input
							inputMode="tel"
							autoComplete="off"
							className=" font-light text-lg ml-2 mr-6 h-full border-none focus:outline-none"
							type="tel"
							name="phone"
							placeholder="Phone number (*)"
							maxLength="11"
							onChange={handleInputPhoneNumberChange}
						/>
					</div>
				</form>
				<div
					style={{
						background:
							"linear-gradient(to left, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
					}}
					className={`text-2xl font-light text-white w-[20%] rounded-full h-14 flex items-center cursor-default transition-all ease-in-out duration-700 justify-center ${
						paymentState && "opacity-100 !cursor-pointer"
					} opacity-50`}
					onClick={handlePayment}
				>
					Payment
				</div>
			</div>

			<PaymentModal
				ticketInfo={form}
				show={paymentModalState}
				click={() => setPaymentModalState(false)}
				clearForm={setInitialForm}
			/>
		</div>
	);
};

export default AllSeat;
