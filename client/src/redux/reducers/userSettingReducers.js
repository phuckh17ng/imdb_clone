import * as actionTypes from "../constants/userSettingConstants";

export const getUserDataReducer = (state = { userData: {} }, action) => {
	switch (action.type) {
		case actionTypes.GET_USER_DATA_REQUEST:
			return { loading: true };
		case actionTypes.GET_USER_DATA_SUCCESS:
			return { loading: false, userData: action.payload };
		case actionTypes.GET_USER_DATA_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
