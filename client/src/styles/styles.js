//max-width: 1280px;
//px-3
//backgroundColor: "#f5c518" yellow
//backgroundColor: "#5699ef" blue
//hover:rounded border-solid rounded hover:bg-zinc-700/50
const bookmarkStyle = {
	clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)",
};
const starStyle = {
	clipPath:
		"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
};
const triangleStyle = {
	clipPath: "polygon(25% 0, 25% 100%, 100% 50%)",
	width: 40,
	height: 40,
	backgroundColor: "#f5c518",
};

const playButton = {
	clipPath: "polygon(25% 0, 25% 100%, 100% 50%)",
};

const forwardStyle = {
	clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 65% 100%, 90% 50%, 65% 0)",
	backgroundColor: "white",
	width: 30,
	height: 20,
};

const movieBackgroundStyle = {
	backgroundImage:
		"url(https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SL200_QL1.jpg)",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundBlendMode: "normal",
	filter: "blur(120px)",
};
const pagingImages = [
	{ url: "../images/paging/page-0.jpg", alt: "0" },
	{ url: "../images/paging/page-1.jpg", alt: "1" },
	{ url: "../images/paging/page-2.jpg", alt: "2" },
	{ url: "../images/paging/page-3.jpg", alt: "3" },
	{ url: "../images/paging/page-4.jpg", alt: "4" },
	{ url: "../images/paging/page-5.jpg", alt: "5" },
	{ url: "../images/paging/page-6.jpg", alt: "6" },
	{ url: "../images/paging/page-7.jpg", alt: "7" },
	{ url: "../images/paging/page-8.jpg", alt: "8" },
	{ url: "../images/paging/page-9.jpg", alt: "9" },
	{ url: "../images/paging/page-10.jpg", alt: "10" },
	{ url: "../images/paging/page-11.jpg", alt: "11" },
];
const mainColor = { backgroundColor: "#f5c518" };

export {
	bookmarkStyle,
	triangleStyle,
	mainColor,
	forwardStyle,
	starStyle,
	movieBackgroundStyle,
	playButton,
	pagingImages,
};
