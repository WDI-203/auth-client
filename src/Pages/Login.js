import React, { useState } from "react";
import { loginUser } from "../Api/api";
import { setUserToken } from "../Auth/authLocalStorage";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});

	const navigate = useNavigate();
	const { setShouldRefresh } = useOutletContext();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setShouldRefresh(true);
		const data = {
			email,
			password,
		};
		const loginResult = await loginUser(data);
		if (loginResult.success) {
			setUserToken(loginResult.token);
			setEmail("");
			setPassword("");
			setError({});
			navigate("/");
		}
		if (!loginResult.success) {
			setError(loginResult.error);
		}
		setShouldRefresh(false);
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
			{error.email && <p>{error.email}</p>}
			{error.password && <p>{error.password}</p>}
		</div>
	);
};

export default Login;
