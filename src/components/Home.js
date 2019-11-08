import React from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import config from '../aws-exports';
import Header from './Header';

Amplify.configure(config);

const Home = props => {
	const [user, setUser] = props.state;
	React.useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					localStorage.setItem('cognitoUser', JSON.stringify(data));
					setUser(data);
					break;
				case 'signOut':
					localStorage.setItem('cognitoUser', JSON.stringify(data));
					setUser(null);
					break;
				default:
					return;
			}
		});
		const getAuthUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				localStorage.setItem('cognitoUser', JSON.stringify(user));
				setUser(user);
			} catch (err) {
				console.log(err);
				if (err === 'not authenticated') {
					localStorage.setItem('cognitoUser', null);
				}
			}
		};
		getAuthUser();
		return () => Hub.remove('auth');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkUser = () => {
		console.log(user);
	};

	const userSignIn = async () => {
		try {
			await Auth.federatedSignIn({ provider: 'Google' });
		} catch (err) {
			console.log(err);
		}
	};

	const signOut = () => {
		localStorage.setItem('cognitoUser', null);
		Auth.signOut();
	};

	return (
		<div>
			<Header />
			<p>This is the home page</p>
			{!user && <button onClick={userSignIn}>Sign In</button>}
			<button onClick={checkUser}>Check User</button>
			{user && <button onClick={signOut}>Sign Out</button>}
		</div>
	);
};

export default Home;
