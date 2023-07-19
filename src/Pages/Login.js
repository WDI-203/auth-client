import React, { useState } from "react";
import { loginUser } from "../Api/api";
import { setUserToken } from "../Auth/authLocalStorage";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		const loginResult = await loginUser(data);
		if (loginResult.success) {
			setUserToken(loginResult.token);
		}
		if (!loginResult.success) {
			setError(loginResult.message);
		}
	};
	return (
		<div>
			<h3>Login</h3>
			<form onSubmit={handleOnSubmit}>
				<label>Email:</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Login;
