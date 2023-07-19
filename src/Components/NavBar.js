import React from "react";
import { Link } from "react-router-dom";
import { removeUserToken } from "../Auth/authLocalStorage";

const NavBar = ({
	isVerified,
	user,
	setShouldRefresh,
	setUser,
	setIsVerified,
}) => {
	const handleLogout = async () => {
		setShouldRefresh(true);
		const resultLogout = await removeUserToken();
		if (resultLogout) {
			setIsVerified(false);
			setUser(null);
			setShouldRefresh(false);
		}
	};
	return (
		<div>
			<Link to="/">Home</Link>{" "}
			{!isVerified ? (
				<span>
					<Link to="/login">Login</Link> <Link to="/register">Register</Link>
				</span>
			) : (
				<span>
					<Link onClick={handleLogout}>Logout</Link> <Link>{user}</Link>
				</span>
			)}
		</div>
	);
};

export default NavBar;
