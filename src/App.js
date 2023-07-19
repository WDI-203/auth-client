import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser } from "./Api/api";
import "./App.css";
import NavBar from "./Components/NavBar";
// context > useContext
// redux

//useOutletContext
function App() {
	const [userToken, setUserToken] = useState(null);
	const [user, setUser] = useState(null);
	const [isVerified, setIsVerified] = useState(false);
	const [shouldRefresh, setShouldRefresh] = useState(false);
	//When user logs in, token is placed in localstorage,
	//we get the token, set it in state
	//we make a api call to the backend with our token to see if we are verified.

	useEffect(() => {
		const token = getUserToken();
		setUserToken(token);
	}, [shouldRefresh]);

	useEffect(() => {
		const verifyUser = async () => {
			if (userToken) {
				const verifyResult = await validateUser(userToken);
				if (verifyResult.success) {
					setUser(verifyResult.email);
					setIsVerified(true);
				} else {
					setShouldRefresh(true);
					const resultLogout = await removeUserToken();
					if (resultLogout) {
						setIsVerified(false);
						setUser(null);
						setShouldRefresh(false);
					}
				}
			}
		};
		verifyUser();
	}, [userToken]);

	return (
		<div className="App">
			<NavBar
				isVerified={isVerified}
				user={user}
				setShouldRefresh={setShouldRefresh}
				setIsVerified={setIsVerified}
				setUser={setUser}
			/>
			<Outlet context={{ setShouldRefresh, user, isVerified }} />
		</div>
	);
}

export default App;
