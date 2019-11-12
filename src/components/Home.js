import Amplify, { Auth, Hub } from 'aws-amplify';
import { parseCookies } from 'nookies';
import React from 'react';
import config from '../aws-exports';
import Header from './Header';

Amplify.configure(config);

const Home = ({ userId, setUserId }) => {
	React.useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					if (userId === undefined) {
						setUserId(data.username);
					}
					break;
				case 'signOut':
					setUserId(null);
					break;
				default:
					return;
			}
		});
		return () => Hub.remove('auth');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkUser = () => {
		console.log(userId);
	};

	const logCookie = () => {
		const myCookies = parseCookies();
		console.log(myCookies);
	};

	const userSignIn = async () => {
		try {
			await Auth.federatedSignIn({ provider: 'Google' });
		} catch (err) {
			console.log(err);
		}
	};

	const userSignOut = () => {
		Auth.signOut();
	};

	return (
		<div>
			<Header userId={userId} />
			<p>This is the home page</p>
			{!userId && <button onClick={userSignIn}>Sign In</button>}
			<button onClick={checkUser}>Check User</button>
			{userId && <button onClick={userSignOut}>Sign Out</button>}
			<button onClick={logCookie}>Log Cookie</button>
		</div>
	);
};

export default Home;
