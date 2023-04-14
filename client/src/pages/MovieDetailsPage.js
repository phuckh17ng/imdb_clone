import React, { useEffect, useState } from "react";
import * as styles from "../styles/styles";

const MovieDetailsPage = () => {
	const [mydata, setMyData] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			"https://imdb-api.com/en/API/Title/k_pos0y1z2/tt0190332",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => {
				console.log(result);
				const data = JSON.parse(result);
				setMyData(data);
				setLoading(true);
			})
			.catch((error) => console.log("error", error));
		return () => {};
	}, []);

	console.log(mydata.image);
	return (
		<div className="w-full relative bg-zinc-900">
			<div className=" w-4/5 m-auto h-[700px] relative">
				<div
					style={{
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundBlendMode: "normal",
						filter: "blur(120px)",
						backgroundImage:
							"url(https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SL200_QL1.jpg)",
					}}
					className="w-full m-auto h-[500px] relative top-[120px]"
				>
					MovieDetailsPage
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsPage;
