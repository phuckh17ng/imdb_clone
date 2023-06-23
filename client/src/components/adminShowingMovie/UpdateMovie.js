import React from "react";

const UpdateMovie = ({ show }) => {
	return (
		show === "update" && (
			<div className="text-black w-full h-full flex items-center justify-center py-9">
				<div className="relative w-[90%] h-full bg-white rounded-2xl p-6">
                    update
                </div>
			</div>
		)
	);
};

export default UpdateMovie;
