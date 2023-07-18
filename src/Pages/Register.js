import React, { useState } from "react";
import { registerUser } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		const registerResult = await registerUser(data);
		if (registerResult.success) {
			setError({});
			setEmail("");
			setPassword("");
			navigate("/login");
		}
		if (!registerResult.success) {
			setError(registerResult.error);
		}
	};
	return (
		<div>
			<h3>Register Page</h3>
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
				<button>Register</button>
			</form>
			{error.email && <p>{error.email}</p>}
			{error.password && <p>{error.password}</p>}
		</div>
	);
};

export default Register;
