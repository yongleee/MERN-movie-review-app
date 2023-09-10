import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRefreshToken } from "../hooks/useRefreshToken";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuthContext();
	// console.log(auth);

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// console.log(`isLoading: ${isLoading}`);
		// console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
		// eslint-disable-next-line
	}, [isLoading]);

	return (
		<>
			{isLoading ? (
				<p className="text-neutral-300">
					Loading... This may take up to 30 seconds.
				</p>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
