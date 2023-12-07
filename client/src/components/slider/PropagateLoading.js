import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const PropagateLoading = (loading) => {
	return (
		<PropagateLoader
			loading={loading}
			aria-label="Loading Spinner"
			data-testid="loader"
			size="15"
			color="#f5c518"
			className="m-auto"
		/>
	);
};

export default PropagateLoading;
