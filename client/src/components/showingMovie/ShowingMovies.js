import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { addShowingMovie } from "../../features/show/showService";
import { auth } from "../../firebase/firebaseConfig";
import ShowModal from "./ShowModal";

const ShowingMovies = () => {
	const [user] = useAuthState(auth);
	const [name, setName] = useState("");
	const [gerne, setGerne] = useState("");
	const [actor, setActor] = useState("");
	const [director, setDirector] = useState("");
	const [type, setType] = useState("");
	const [trailer, setTrailer] = useState("");
	const [banner, setBanner] = useState("");
	const [cinema, setCinema] = useState([]);
	const [day, setDay] = useState([]);
	const [time, setTime] = useState([]);

	const [modalState, setModalState] = useState(false);
	const [form, setForm] = useState({
		movieId: "",
		userAdd: "",
		dayCreate: "",
		_name: "",
		_gerne: "",
		_actor: "",
		_director: "",
		_type: "",
		_trailer: "",
		_banner: "",
		_cinema: [],
		_day: [],
		_time: [],
	});
	const handleRemoveDay = (index) => {
		setDay(
			day.filter((day) => {
				return day !== index;
			})
		);
	};

	const handleRemoveTime = (index) => {
		setTime(
			time.filter((time) => {
				return time !== index;
			})
		);
	};

	const handleRemoveCinema = (index) => {
		setCinema(
			cinema.filter((cinema) => {
				return cinema !== index;
			})
		);
	};

	const dispatch = useDispatch();
	const handleFormSubmit = async () => {
		setForm({
			movieId: "",
			userAdd: user?.uid,
			dayCreate: "",
			_name: name,
			_gerne: gerne,
			_actor: actor,
			_director: director,
			_type: type,
			_trailer: trailer,
			_banner: banner,
			_cinema: cinema,
			_day: day,
			_time: time,
		});
		console.log(user?.uid);
		console.log(form);
		dispatch(addShowingMovie(form));
		setModalState(true);
		console.log(modalState);
	};
	return (
		<div className="text-black w-full h-full flex items-center justify-center">
			<div className="relative w-[90%] h-[90%] bg-white rounded-2xl p-6">
				<form className="flex relative">
					<div className="w-1/2">
						<div className="">
							<label for="name" className="block pb-1">
								Movie name: &nbsp; {name}
							</label>
							<input
								autocomplete="off"
								type="text"
								id="name"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setName(e.target.value)}
							></input>
						</div>

						<div className="mt-3">
							<label for="genre" className="block pb-1">
								Genre:
							</label>
							<input
								autocomplete="off"
								type="text"
								id="genre"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setGerne(e.target.value)}
							></input>
						</div>

						<div className="mt-3">
							<label for="actor" className="block pb-1">
								Actor/Actress:
							</label>
							<input
								autocomplete="off"
								type="text"
								id="actor"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setActor(e.target.value)}
							></input>
						</div>

						<div className="mt-3">
							<label for="director" className="block pb-1">
								Director:
							</label>
							<input
								autocomplete="off"
								type="text"
								id="director"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setDirector(e.target.value)}
							></input>
						</div>

						<div className="mt-3">
							<label for="type" className="block pb-1">
								Type:
							</label>
							<input
								autocomplete="off"
								type="text"
								id="type"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setType(e.target.value)}
							></input>
						</div>

						<div className="mt-3">
							<label for="trailer" className="block pb-1">
								Trailer:
							</label>
							<input
								autocomplete="off"
								type="text"
								id="trailer"
								className="border border-zinc-500 rounded p-2 w-[90%]"
								onChange={(e) => setTrailer(e.target.value)}
							></input>
						</div>
					</div>
					<div className="w-1/2">
						<div className="">
							<label for="banner" className="block pb-1">
								Banner:
							</label>
							<input
								autocomplete="off"
								type="file"
								id="banner"
								className="border border-zinc-500 rounded p-2"
								onChange={(e) => setBanner(e.target.files[0])}
							></input>
						</div>
						<div className="mt-3">
							<label for="cinema" className="block pb-1">
								Cinema:
								<div className=" grid grid-cols-4 gap-2 max-h-[100px] overflow-auto">
									{cinema?.map((cinema) => {
										return (
											<span className="border-2 rounded-3xl border-sky-600 p-1 flex item-center justify-evenly">
												<span>{cinema}</span>
												<span
													className="text-red-500 font-semibold"
													onClick={() => handleRemoveCinema(cinema)}
												>
													X
												</span>
											</span>
										);
									})}
								</div>
							</label>
							<select
								id="cinema"
								className="border border-zinc-500 rounded p-2"
								onChange={(e) => {
									setCinema([...cinema, e.target.value]);
								}}
							>
								<option value="HN">IMDb Hà Nội</option>
								<option value="HCM">IMDb Tp. Hồ Chí Minh</option>
								<option value="HP">IMDb Hải Phòng</option>
								<option value="DN">IMDb Đà Nẵng</option>
								<option value="QB">IMDb Quảng Bình</option>
							</select>
						</div>
						<div className="mt-3">
							<label for="day" className="block pb-1">
								Day show:
								<div className=" grid grid-cols-4 gap-2 max-h-[100px] overflow-auto">
									{day?.map((day) => {
										return (
											<span className="border-2 rounded-3xl border-sky-600 p-1 flex item-center justify-evenly">
												<span>{day}</span>
												<span
													className="text-red-500 font-semibold"
													onClick={() => handleRemoveDay(day)}
												>
													X
												</span>
											</span>
										);
									})}
								</div>
							</label>
							<input
								autocomplete="off"
								type="date"
								id="day"
								className="border border-zinc-500 rounded p-2"
								onChange={(e) => setDay([...day, e.target.value])}
							></input>
						</div>

						<div className="mt-3">
							<label for="time" className="block pb-1">
								Time:
								<div className=" grid grid-cols-5 gap-2 max-h-[100px] overflow-auto">
									{time?.map((time) => {
										return (
											<span className="border-2 rounded-3xl border-sky-600 p-1 flex item-center justify-evenly">
												<span>{time}</span>
												<span
													className="text-red-500 font-semibold"
													onClick={() => handleRemoveTime(time)}
												>
													X
												</span>
											</span>
										);
									})}
								</div>
							</label>
							<input
								autocomplete="off"
								type="text"
								id="time"
								className="border border-zinc-500 rounded p-2"
								onKeyDown={(e) => {
									if (window.event.key === "Enter")
										setTime([...time, e.target.value]);
								}}
							></input>
						</div>
					</div>
				</form>{" "}
				<div
					onClick={handleFormSubmit}
					className="absolute mr-9 mb-6 bottom-0 right-0 py-2 px-4 bg-sky-500 rounded-lg drop-shadow-md font-semibold"
				>
					Submit
				</div>
			</div>
			{/* <ShowModal
				show={modalState}
				click={() => setModalState(false)}
				form={form}
			/> */}
		</div>
	);
};

export default ShowingMovies;
