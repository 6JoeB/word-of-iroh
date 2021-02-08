import axios from "axios";

export const forgotPassword = (email) => (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email });
	try {
		axios.post("api/users/password-reset-email", body, config);
	} catch (err) {
		console.log(err);
	}
};

export const updatePassword = async (user_id, password) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify({ password });

	try {
		const res = await axios.put(`api/auth/update-password/${user_id}`, body, config);
	} catch (err) {
		console.log(err);
	}
};

export const getPasswordResetToken = async (user_id) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.get(`api/auth/password-reset-token/${user_id}`, config);
	} catch (err) {
		console.log(err);
	}
};

const apis = {
	forgotPassword,
	updatePassword,
	getPasswordResetToken,
};

export default apis;
