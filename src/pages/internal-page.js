import React, { useEffect, useContext } from 'react';
import UserContext from '../components/UserContext';
import Header from '../components/Header';

const Index = () => {
	const context = useContext(UserContext);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('cognitoUser'));
		console.log('internal page', user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			{context.user ? <div>Success!</div> : <div>Not authorized.</div>}
		</>
	);
};

export default Index;
