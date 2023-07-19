import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/users/register`, userData);
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};

const loginUser = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/users/login`, userData);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

const validateUser = async (userToken) => {
	try {
		const response = await axios.get(`${baseUrl}/users/validate`, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export { registerUser, loginUser, validateUser };
