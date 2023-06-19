import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllSeat from "../components/seat/AllSeat";
import { getShowingMovieSeat } from "../features/ticket/ticketService";
import "./BuyTicketPage.css";

const BuyTicketPage = () => {
	const showingMovies = useSelector((state) => state.show);
	const [searchBtnState, setSearchBtnState] = useState(false);
	const [searchState, setSearchState] = useState(false);
	const { showingMovie } = showingMovies;
	const { movieId } = useParams();

	const movie = showingMovie.filter((movie) => {
		return movie.movieId === movieId;
	});
	console.log(movie);
	const ticket = useSelector((state) => state.ticket);
	const { seat, isLoading } = ticket;
	console.log(isLoading);
	const [cinema, setCinema] = useState("");
	const [day, setDay] = useState("");
	const [time, setTime] = useState("");
	console.log(cinema, day, time);
	const dispatch = useDispatch();
	useEffect(() => {
		if (cinema === "" || day === "" || time === "") {
			setSearchBtnState(false);
		} else {
			setSearchBtnState(true);
		}
	}, [cinema, day, time]);
	const [showAllSeats, setShowAllSeats] = useState(false);
	const handleBuyTicket = () => {
		const name = movie[0]._name;
		if (cinema === "" || day === "" || time === "") {
			return;
		}
		if (!searchState) return;
		dispatch(getShowingMovieSeat({ name, cinema, day, time }));
		setSearchState(false);
		setShowAllSeats(true);
	};

	return (
		<div className="py-9 w-full h-full max-w-[1280px] mx-auto px-3">
			<ToastContainer />
			{movie.map((item) => {
				return (
					<div className="text-zinc-800 flex relative" key={item.movieId}>
						<div
							style={{
								backgroundPosition: "",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								backgroundBlendMode: "normal",
								filter: "blur(120px)",
								backgroundImage: `url(${item._banner})`,
							}}
							className="w-full m-auto h-[600px] relative top-[120px]"
						></div>
						<div className="absolute flex backdrop-blur-xl bg-white/50">
							<img src={item._banner} alt={item._name} className="w-1/3" />
							<div className="w-2/3 px-6 mt-6 flex justify-between flex-col">
								<div>
									<p
										style={{
											background:
												"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
											webkitBackgroundClip: "text",
											webkitTextFillColor: "transparent",
										}}
										className="block w-full text-5xl font-bold text-zinc-800 border-b border-zinc-400 pb-3"
									>
										{item._name}
									</p>
									<div className="mt-3">
										<div className="text-2xl">
											<span className="font-bold">Director: </span>
											<span className="font-light">{item._director}</span>
										</div>
										<div className="text-2xl mt-2">
											<span className="font-bold">Actor: </span>
											<span className="font-light">{item._actor}</span>
										</div>
										<div className="text-2xl mt-2">
											<span className="font-bold">Gerne: </span>
											<span className="font-light">{item._gerne}</span>
										</div>
										<span
											style={{
												background:
													"linear-gradient(to top right, #C850C0 0%, #FFCC70 100%)",
											}}
											className=" drop-shadow mt-3 font-extrabold text-white/90 text-2xl inline-block rounded py-2 px-[10px]"
										>
											{item._type}
										</span>
									</div>
								</div>
								<form className="mt-6 mb-6">
									<div className="grid grid-cols-3 gap-2">
										<select
											className="cursor-pointer focus:outline-none py-3 px-3 text-bold rounded-tl-2xl text-xl select font-light"
											onChange={(e) => {
												setCinema(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Cinema
											</option>
											{item._cinema.map((cinema) => {
												return (
													<option value={cinema} key={cinema}>
														{cinema === "HN"
															? "IMDb Hà Nội"
															: cinema === "HCM"
															? "IMDb Hồ Chí Minh"
															: cinema === "DN"
															? "IMDb Đà Nẵng"
															: cinema === "HP"
															? "IMDb Hải Phòng"
															: "IMDb Quảng Bình"}
													</option>
												);
											})}
										</select>
										<select
											className="cursor-pointer focus:outline-none py-2 text-xl select font-light"
											onChange={(e) => {
												setDay(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Day
											</option>
											{item._day.map((day) => {
												return (
													<option value={day} key={day}>
														{day}
													</option>
												);
											})}
										</select>
										<select
											className="cursor-pointer focus:outline-none py-2 text-xl select rounded-tr-2xl font-light"
											onChange={(e) => {
												setTime(e.target.value);
												setSearchState(true);
											}}
										>
											<option value="" disabled selected hidden>
												Select Time
											</option>
											{item._time.map((time) => {
												return (
													<option value={time} key={time}>
														{time}
													</option>
												);
											})}
										</select>
									</div>
									<div
										style={{
											background:
												"linear-gradient(to right, #4158D0 0%, #C850C0 50%, #FFCC70 100%)",
										}}
										className={`transition-all duration-700 ease-linear w-full text-white/90 cursor-default py-2 rounded-b-2xl text-center font-bold text-5xl mt-2 opacity-50 ${
											searchBtnState && "opacity-100 !cursor-pointer"
										}`}
										onClick={handleBuyTicket}
									>
										Search
									</div>
								</form>
							</div>
						</div>
					</div>
				);
			})}
			{showAllSeats && cinema && day && time && !isLoading && <AllSeat />}
		</div>
	);
};

export default BuyTicketPage;
