import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import UserContext from '../context/UserContext';

const HomeWithoutSSR = dynamic(import('../components/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>,
});

const Index = props => {
	const { user, signIn, signOut, checkUser } = useContext(UserContext);
	return (
		<>
			<HomeWithoutSSR state={[user, signIn, signOut, checkUser]} />
		</>
	);
};

export default Index;
