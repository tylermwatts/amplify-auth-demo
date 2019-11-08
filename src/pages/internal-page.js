import React, { useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import Header from '../components/Header';
import awsConfig from '../aws-exports';

const InternalPage = () => {
	const context = useContext(UserContext);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('cognitoUser'));
		context.setUser(user);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			{context.user &&
			context.user.pool.clientId === awsConfig.aws_user_pools_web_client_id ? (
				<div>Success!</div>
			) : (
				<div>Not authorized.</div>
			)}
		</>
	);
};

export default InternalPage;
