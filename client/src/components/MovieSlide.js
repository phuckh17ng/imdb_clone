import axios from "axios";
import React, { useEffect, useState } from "react";
require("dotenv").config();

const MovieSlide = ({ id }) => {
	const [mydata, setMyData] = useState({});
	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://imdb8.p.rapidapi.com/title/get-details",
			params: { tconst: id },
			headers: {
				"X-RapidAPI-Key": "",
				"X-RapidAPI-Host": "",
			},
		};
		axios
			.request(options)
			.then(function (response) {
				// console.log(response.data);
				setMyData(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});

		// You can return a cleanup function that will be executed when the component is unmounted
		return () => {
			// Cleanup code here
		};
	}, []);
	// console.log(mydata);
	return <div className=""></div>;
};

export default MovieSlide;
