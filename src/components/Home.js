import React from 'react';
import Header from './Header';

const Home = props => {
	const [user, signIn, signOut, checkUser] = props.state;

	return (
		<div>
			<Header />
			<p>This is the home page</p>
			{!user && <button onClick={signIn}>Sign In</button>}
			<button onClick={checkUser}>Check User</button>
			{user && <button onClick={signOut}>Sign Out</button>}
		</div>
	);
};

export default Home;
